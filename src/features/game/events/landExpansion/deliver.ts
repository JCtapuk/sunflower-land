import Decimal from "decimal.js-light";
import { trackActivity } from "features/game/types/bumpkinActivity";
import { CAKES, getKeys } from "features/game/types/craftables";
import {
  Bumpkin,
  GameState,
  Inventory,
  NPCData,
  Order,
} from "features/game/types/game";
import { getSeasonalTicket } from "features/game/types/seasons";
import { hasFeatureAccess } from "lib/flags";
import { NPCName } from "lib/npcs";
import cloneDeep from "lodash.clonedeep";

export type DeliverOrderAction = {
  type: "order.delivered";
  id: string;
};

type Options = {
  state: Readonly<GameState>;
  action: DeliverOrderAction;
};

export function getTotalSlots(inventory: Inventory) {
  // If feature access then return the total number of slots from both delivery and quest
  // else just delivery

  if (hasFeatureAccess(inventory, "NEW_DELIVERIES")) {
    return getDeliverySlots(inventory) + getQuestSlots(inventory);
  }

  return getDeliverySlots(inventory);
}

export function getDeliverySlots(inventory: Inventory) {
  if (inventory["Basic Land"]?.gte(12)) {
    return 6;
  }

  if (inventory["Basic Land"]?.gte(8)) {
    return 5;
  }

  if (inventory["Basic Land"]?.gte(5)) {
    return 4;
  }

  return 3;
}

export function getQuestSlots(inventory: Inventory) {
  if (inventory["Basic Land"]?.gte(14)) {
    return 5;
  }

  if (inventory["Basic Land"]?.gte(12)) {
    return 4;
  }

  if (inventory["Basic Land"]?.gte(8)) {
    return 3;
  }

  if (inventory["Basic Land"]?.gte(5)) {
    return 2;
  }

  return 1;
}

export type QuestNPCName =
  | "pumpkin' pete"
  | "bert"
  | "raven"
  | "timmy"
  | "tywin"
  | "cornwell";

const QUEST_NPC_NAMES = ["pumpkin' pete", "raven", "bert", "timmy", "tywin"];

export function isOfQuestNPCType(value: string): value is QuestNPCName {
  return (QUEST_NPC_NAMES as string[]).includes(value);
}

export function populateOrders(
  game: GameState,
  createdAt: number = Date.now()
) {
  const orders = game.delivery.orders;
  const slots = getTotalSlots(game.inventory);

  while (orders.length < slots) {
    const upcomingOrderTimes = game.delivery.orders.map(
      (order) => order.readyAt
    );
    const baseTime = Math.max(...upcomingOrderTimes, createdAt);

    // Orders are generated on backend - use this just to show the next readyAt
    const fakeOrder: Order = {
      createdAt: Date.now(),
      readyAt:
        baseTime + (24 / getDeliverySlots(game.inventory)) * 60 * 60 * 1000,
      from: "betty",
      id: Date.now().toString(),
      items: {},
      reward: {},
    };

    orders.push(fakeOrder);
  }

  return orders;
}

const clone = (state: GameState): GameState => {
  return cloneDeep(state);
};

export function getOrderSellPrice(bumpkin: Bumpkin, order: Order) {
  const { skills } = bumpkin;

  let mul = 1;

  if (skills["Michelin Stars"]) {
    mul += 0.05;
  }

  const items = getKeys(order.items);
  if (
    items.some((name) => name in CAKES()) &&
    bumpkin.equipped.coat == "Chef Apron"
  ) {
    mul += 0.2;
  }

  return new Decimal(order.reward.sfl ?? 0).mul(mul);
}

export function deliverOrder({ state, action }: Options): GameState {
  const game = clone(state);
  const bumpkin = game.bumpkin;

  if (!bumpkin) {
    throw new Error("You do not have a Bumpkin");
  }

  const order = game.delivery.orders.find((order) => order.id === action.id);

  if (!order) {
    throw new Error("Order does not exist");
  }

  if (order.readyAt > Date.now()) {
    throw new Error("Order has not started");
  }

  getKeys(order.items).forEach((name) => {
    if (name === "sfl") {
      const balance = game.balance;
      const amount = order.items[name] || new Decimal(0);

      if (balance.lessThan(amount)) {
        throw new Error(`Insufficient ingredient: ${name}`);
      }

      game.balance = balance.sub(amount);
    } else {
      const count = game.inventory[name] || new Decimal(0);
      const amount = order.items[name] || new Decimal(0);

      if (count.lessThan(amount)) {
        throw new Error(`Insufficient ingredient: ${name}`);
      }

      game.inventory[name] = count.sub(amount);
    }
  });

  if (order.reward.sfl) {
    const sfl = getOrderSellPrice(bumpkin, order);
    game.balance = game.balance.add(sfl);

    bumpkin.activity = trackActivity("SFL Earned", bumpkin.activity, sfl);
  }

  if (order.reward.tickets) {
    const seasonalTicket = getSeasonalTicket();

    const count = game.inventory[seasonalTicket] || new Decimal(0);
    const amount = order.reward.tickets || new Decimal(0);

    game.inventory[seasonalTicket] = count.add(amount);
  }

  // Always give a seasonal ticket
  const rewardItems = {
    ...(order.reward.items ?? {}),
    [getSeasonalTicket()]: 5,
  };

  if (rewardItems) {
    getKeys(rewardItems).forEach((name) => {
      const previousAmount = game.inventory[name] || new Decimal(0);

      game.inventory[name] = previousAmount.add(rewardItems[name] || 0);
    });
  }

  game.delivery.orders = game.delivery.orders.filter(
    (order) => order.id !== action.id
  );

  game.delivery.fulfilledCount += 1;

  // TODO: REPLACE WITH SEASON START DATE WHEN BETA IS OVER
  if (hasFeatureAccess(game.inventory, "NEW_DELIVERIES")) {
    const npcs = game.npcs ?? ({} as Partial<Record<NPCName, NPCData>>);
    const npc = npcs[order.from] ?? ({} as NPCData);
    const completedDeliveries = npcs[order.from]?.deliveryCount ?? 0;

    npc.deliveryCount = completedDeliveries + 1;

    game.npcs = {
      ...npcs,
      [order.from]: npc,
    };
  }

  // bumpkin.activity = trackActivity(`${order.from} Delivered`, 1);

  game.delivery.orders = populateOrders(game);

  return game;
}

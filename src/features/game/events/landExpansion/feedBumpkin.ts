import Decimal from "decimal.js-light";
import { trackActivity } from "features/game/types/bumpkinActivity";
import { ConsumableName, CONSUMABLES } from "features/game/types/consumables";
import { GameState } from "features/game/types/game";
import cloneDeep from "lodash.clonedeep";
import { getFoodExpBoost } from "features/game/expansion/lib/boosts";

export type FeedBumpkinAction = {
  type: "bumpkin.feed";
  food: ConsumableName;
};

type Options = {
  state: Readonly<GameState>;
  action: FeedBumpkinAction;
};

export function feedBumpkin({ state, action }: Options): GameState {
  const stateCopy = cloneDeep(state);

  console.log({ action });

  const bumpkin = stateCopy.bumpkin;
  const collectibles = stateCopy.collectibles;
  const inventory = stateCopy.inventory;
  const quantity = inventory[action.food] ?? new Decimal(0);

  if (bumpkin === undefined) {
    throw new Error("You do not have a Bumpkin");
  }

  if (quantity.lte(0)) {
    throw new Error("You have none of this food type");
  }
  inventory[action.food] = quantity.sub(1);

  bumpkin.experience += getFoodExpBoost(
    CONSUMABLES[action.food],
    bumpkin,
    collectibles
  );

  bumpkin.activity = trackActivity(`${action.food} Fed`, bumpkin.activity);

  return stateCopy;
}

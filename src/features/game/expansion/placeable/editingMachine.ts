import { v4 as uuidv4 } from "uuid";
import { GameEventName, PlacementEvent } from "features/game/events";
import { BuildingName } from "features/game/types/buildings";
import { CollectibleName } from "features/game/types/craftables";
import { assign, createMachine, Interpreter, sendParent } from "xstate";
import { Coordinates } from "../components/MapPlacement";
import { PlaceBumpkinAction } from "features/game/events/landExpansion/placeBumpkin";
import { Bumpkin } from "features/game/types/game";

export interface Context {
  bumpkin?: Bumpkin;
  placeable: BuildingName | CollectibleName | "Bumpkin";
  action: GameEventName<PlacementEvent>;
  coordinates: Coordinates;
  collisionDetected: boolean;
}

type UpdateEvent = {
  type: "UPDATE";
  coordinates: Coordinates;
  collisionDetected: boolean;
};

type PlaceEvent = {
  type: "PLACE";
};

type PlaceBumpkinEvent = {
  type: "PLACE_BUMPKIN";
};

type ConstructEvent = {
  type: "CONSTRUCT";
  actionName: PlacementEvent;
};

export type BlockchainEvent =
  | { type: "DRAG" }
  | { type: "DROP" }
  | ConstructEvent
  | PlaceEvent
  | PlaceBumpkinEvent
  | UpdateEvent
  | { type: "CANCEL" };

export type BlockchainState = {
  value: "idle" | "dragging" | "placed" | "close";
  context: Context;
};

export type MachineInterpreter = Interpreter<
  Context,
  any,
  BlockchainEvent,
  BlockchainState
>;

export const editingMachine = createMachine<
  Context,
  BlockchainEvent,
  BlockchainState
>({
  id: "placeableMachine",
  initial: "idle",
  on: {
    CANCEL: {
      target: "close",
    },
  },
  states: {
    idle: {
      on: {
        UPDATE: {
          actions: assign({
            coordinates: (_, event) => event.coordinates,
            collisionDetected: (_, event) => event.collisionDetected,
          }),
        },
        DRAG: {
          target: "dragging",
        },
        PLACE: {
          target: "placed",
          actions: sendParent(
            ({ placeable, action, coordinates: { x, y } }) =>
              ({
                type: action,
                name: placeable,
                coordinates: { x, y },
                id: uuidv4(),
              } as PlacementEvent)
          ),
        },
        PLACE_BUMPKIN: {
          target: "placed",
          actions: sendParent(
            ({ action, placeable, bumpkin, coordinates: { x, y } }) =>
              ({
                type: action,
                name: placeable,
                coordinates: { x, y },
                id: bumpkin?.id,
              } as PlaceBumpkinAction)
          ),
        },
      },
    },
    dragging: {
      on: {
        UPDATE: {
          actions: assign({
            coordinates: (_, event) => event.coordinates,
            collisionDetected: (_, event) => event.collisionDetected,
          }),
        },
        DROP: {
          target: "idle",
        },
      },
    },
    placed: {
      after: {
        // 300ms allows time for the .bulge animation
        300: {
          target: "close",
        },
      },
    },
    close: {
      type: "final",
    },
  },
});

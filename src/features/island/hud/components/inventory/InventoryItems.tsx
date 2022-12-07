import React, { useState } from "react";
import { GameState, InventoryItemName } from "features/game/types/game";

import basket from "assets/icons/basket.png";
import chest from "assets/icons/chest.png";
import close from "assets/icons/close.png";

import { Panel } from "components/ui/Panel";
import { Tab } from "components/ui/Tab";

import Decimal from "decimal.js-light";
import { Basket } from "./Basket";
import { Chest } from "./Chest";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { GoblinState } from "features/game/lib/goblinMachine";

type Tab = "basket" | "chest";

interface Props {
  state: GameState | GoblinState;
  onClose: () => void;
  showPlaceButton?: boolean;
  onPlace?: (selected: InventoryItemName) => void;
  shortcutItem: (item: InventoryItemName) => void;
  selectedItem?: InventoryItemName | undefined;
}

export type TabItems = Record<string, { items: object }>;

export type Inventory = Partial<Record<InventoryItemName, Decimal>>;

export const InventoryItems: React.FC<Props> = ({
  state,
  onClose,
  onPlace,
  shortcutItem,
  showPlaceButton,
  selectedItem,
}) => {
  const [currentTab, setCurrentTab] = useState<Tab>("basket");

  const handleTabClick = (tab: Tab) => {
    setCurrentTab(tab);
  };

  return (
    <Panel className="relative" hasTabs>
      <div
        className="absolute flex"
        style={{
          top: `${PIXEL_SCALE * 1}px`,
          left: `${PIXEL_SCALE * 1}px`,
          right: `${PIXEL_SCALE * 1}px`,
        }}
      >
        <Tab
          className="flex items-center"
          isActive={currentTab === "basket"}
          onClick={() => handleTabClick("basket")}
        >
          <img src={basket} className="h-4 sm:h-5 mr-2" />
          <span className="text-xs sm:text-sm overflow-hidden text-ellipsis">
            Basket
          </span>
        </Tab>
        <Tab
          className="flex items-center"
          isActive={currentTab === "chest"}
          onClick={() => handleTabClick("chest")}
        >
          <img src={chest} className="h-4 sm:h-5 mr-2" />
          <span className="text-xs sm:text-sm overflow-hidden text-ellipsis">
            Chest
          </span>
        </Tab>
        <img
          src={close}
          className="absolute cursor-pointer z-20"
          onClick={onClose}
          style={{
            top: `${PIXEL_SCALE * 1}px`,
            right: `${PIXEL_SCALE * 1}px`,
            width: `${PIXEL_SCALE * 11}px`,
          }}
        />
      </div>

      {currentTab === "basket" && (
        <Basket
          state={state}
          shortcutItem={shortcutItem}
          selectedItem={selectedItem}
        />
      )}
      {currentTab === "chest" && (
        <Chest
          state={state}
          closeModal={onClose}
          onPlace={onPlace}
          showPlaceButton={showPlaceButton}
        />
      )}
    </Panel>
  );
};

import React from "react";
import { InnerPanel } from "components/ui/Panel";
import { DynamicNFT } from "features/bumpkins/components/DynamicNFT";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { FeedbackIcons } from "./lib/types";
import { Button } from "components/ui/Button";

interface IntroProps {
  onClose: () => void;
}

export const IntroPage: React.FC<IntroProps> = ({ onClose }) => {
  return (
    <>
      <div className="p-2 pt-0 flex flex-col h-full">
        <div className="text-[18px] leading-5 space-y-2 mb-3 -mt-2">
          <div className="relative mt-2 float-left w-1/3">
            <DynamicNFT
              bumpkinParts={{
                body: "Beige Farmer Potion",
                hair: "Blacksmith Hair",
                pants: "Farmer Overalls",
                shirt: "Yellow Farmer Shirt",
                tool: "Hammer",
                background: "Farm Background",
                shoes: "Black Farmer Boots",
              }}
            />
          </div>
          <p>{`Welcome to the Potion Room, my curious apprentice!`}</p>
          <p>
            {`I am Mad Scientist Bumpkin, here to assist you on this magical quest into the world of botanic sorcery. Get ready to uncover the secrets of Sunflower Land!`}
          </p>
          <p>
            {`Your mission: decipher the right combination of potions within the enchanted grid.`}
          </p>
          <p>
            {`Remember, the more correct potions you select, the happier the plant will be, increasing your chances of rare drops!`}
          </p>
        </div>
        <InnerPanel className="text-xxs space-y-1 p-1 mt-1">
          <p className="mb-2">{`Pay attention to the feedback icons:`}</p>
          <div className="flex items-center space-x-1">
            <img
              src={FeedbackIcons["correct"]}
              style={{
                width: `${PIXEL_SCALE * 7}px`,
                height: `${PIXEL_SCALE * 8}px`,
              }}
            />
            <span>A perfect potion in the perfect position</span>
          </div>
          <div className="flex items-center space-x-1">
            <img
              src={FeedbackIcons["almost"]}
              style={{
                width: `${PIXEL_SCALE * 7}px`,
                height: `${PIXEL_SCALE * 8}px`,
              }}
            />
            <span>Correct potion but wrong position</span>
          </div>
          <div className="flex items-center space-x-1">
            <img
              src={FeedbackIcons["incorrect"]}
              style={{
                width: `${PIXEL_SCALE * 7}px`,
                height: `${PIXEL_SCALE * 8}px`,
              }}
            />
            <span>Oops, wrong potion</span>
          </div>
          <div className="flex items-center space-x-1">
            <img
              src={FeedbackIcons["bomb"]}
              style={{
                width: `${PIXEL_SCALE * 7}px`,
                height: `${PIXEL_SCALE * 8}px`,
              }}
            />
            <span>{`Beware the "chaos" potion, it shakes things up!`}</span>
          </div>
        </InnerPanel>
      </div>
      <Button onClick={onClose}>{`Let's play`}</Button>
    </>
  );
};

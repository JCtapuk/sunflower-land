import React, { useContext, useEffect, useState } from "react";

import { GRID_WIDTH_PX, PIXEL_SCALE } from "features/game/lib/constants";

import { Modal } from "react-bootstrap";
import { NPC } from "features/island/bumpkin/components/NPC";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { SUNNYSIDE } from "assets/sunnyside";
import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";
import { isTaskComplete } from "./lib/HayseedHankTask";
import { Chore } from "./components/Chore";
import { NPC_WEARABLES } from "lib/npcs";

export const HayseedHank: React.FC = () => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const [isSkipping, setIsSkipping] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    // Trigger an autosave in case they have changes so user can sync right away
    // gameService.send("SAVE");

    setIsOpen(true);
  };

  const isSaving = gameState.matches("autosaving");

  const skip = () => {
    setIsSkipping(true);
    gameService.send("chore.skipped");
    gameService.send("SAVE");
    setIsDialogOpen(false);
    setCanSkip(false);
  };

  const close = () => {
    setIsOpen(false);
    setIsSkipping(false);
    setIsDialogOpen(false);
  };

  const getTimeToChore = () => {
    const twentyFourHrsInMilliseconds = 86400000;
    const startedAt = gameState.context.state.hayseedHank.progress?.startedAt;
    if (!startedAt) return;

    // if startedAt is more than 24hrs ago, can skip
    if (new Date().getTime() > startedAt + twentyFourHrsInMilliseconds) {
      setCanSkip(true);
      return;
    }

    const now = new Date().getTime();
    const timeToChore = new Date(startedAt + twentyFourHrsInMilliseconds - now);

    return `${timeToChore.getUTCHours()}hrs ${timeToChore.getUTCMinutes()}min`;
  };

  const Content = () => {
    return (
      <div className="px-2">
        <p
          className="underline text-xxs pb-1 pt-0.5 cursor-pointer hover:text-blue-500"
          onClick={() => setIsDialogOpen(!isDialogOpen)}
        >
          Cannot complete this chore?
        </p>
        {isDialogOpen && canSkip && (
          <p
            className="underline text-xxs pb-1 pt-0.5 cursor-pointer hover:text-blue-500"
            onClick={skip}
          >
            Skip chore
          </p>
        )}
        {isDialogOpen && !canSkip && (
          <p className="text-xxs pb-1 pt-0.5">
            You can skip this chore in {getTimeToChore()}
          </p>
        )}
      </div>
    );
  };

  useEffect(() => {
    // First ever chore
    if (
      isOpen &&
      !gameState.context.state.hayseedHank.progress &&
      gameState.context.state.hayseedHank.choresCompleted === 0
    ) {
      gameService.send("chore.started");
      gameService.send("SAVE");
    }
  }, [isOpen, gameState.context.state.hayseedHank.progress]);

  return (
    <>
      <div
        id="hank"
        className="absolute z-10"
        style={{
          width: `${PIXEL_SCALE * 16}px`,
          right: `${GRID_WIDTH_PX * 20}px`,
          bottom: `${GRID_WIDTH_PX * 10}px`,
          transform: "scaleX(-1)",
        }}
      >
        <NPC
          parts={{
            body: "Light Brown Farmer Potion",
            shirt: "Red Farmer Shirt",
            pants: "Brown Suspenders",
            hair: "Sun Spots",
          }}
          onClick={handleClick}
        />
        {isTaskComplete(gameState.context.state) && (
          <img
            src={SUNNYSIDE.icons.confirm}
            className="absolute img-highlight-heavy pointer-events-none z-10"
            style={{
              width: `${PIXEL_SCALE * 12}px`,
              bottom: `${PIXEL_SCALE * -5}px`,
              left: `${PIXEL_SCALE * 2}px`,
              transform: "scaleX(-1)",
            }}
          />
        )}
      </div>
      <Modal centered show={isOpen} onHide={close}>
        <CloseButtonPanel
          title={
            isTaskComplete(gameState.context.state) ? (
              <div className="flex justify-center">
                <p>Well done</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <p>Lend a hand?</p>
              </div>
            )
          }
          bumpkinParts={NPC_WEARABLES.hank}
          onClose={close}
        >
          <Chore skipping={isSaving && isSkipping} />

          {!(isSaving && isSkipping) && Content()}
        </CloseButtonPanel>
      </Modal>
    </>
  );
};

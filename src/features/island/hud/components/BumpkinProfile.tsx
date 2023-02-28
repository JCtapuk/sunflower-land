import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useActor } from "@xstate/react";

import progressBarSprite from "assets/ui/profile/progress_bar_sprite.png";
import whiteBg from "assets/ui/profile/bg.png";

import {
  BumpkinPanel,
  TabView,
} from "features/bumpkins/components/BumpkinPanel";
import { DynamicNFT } from "features/bumpkins/components/DynamicNFT";
import { Context } from "features/game/GameProvider";
import {
  getBumpkinLevel,
  getExperienceToNextLevel,
  isMaxLevel,
} from "features/game/lib/level";
import { hasUnacknowledgedSkillPoints } from "features/island/bumpkin/lib/skillPointStorage";
import Spritesheet, {
  SpriteSheetInstance,
} from "components/animation/SpriteAnimator";
import { Bumpkin } from "features/game/types/game";
import classNames from "classnames";
import { SUNNYSIDE } from "assets/sunnyside";
import { hasUnacknowledgedAchievements } from "features/island/bumpkin/lib/achievementStorage";

const DIMENSIONS = {
  original: 80,
  scaled: 160,
  bumpkinContainer: {
    width: 130,
    height: 125,
    radiusBottomLeft: 85,
    radiusBottomRight: 45,
  },
  bumpkin: {
    width: 200,
    marginLeft: -10,
  },
  noBumpkin: {
    marginLeft: 48,
    marginTop: 20,
  },
  level: {
    width: 24,
    height: 12,
    marginLeft: 108,
    marginTop: 84,
  },
  skillsMark: {
    width: 10,
    marginLeft: 116,
    marginTop: 45,
  },
};

const SPRITE_STEPS = 51;

interface AvatarProps {
  bumpkin?: Bumpkin;
  showAlert?: boolean;
  onClick?: () => void;
}

export const BumpkinAvatar: React.FC<AvatarProps> = ({
  bumpkin,
  showAlert,
  onClick,
}) => {
  const progressBarEl = useRef<SpriteSheetInstance>();

  const experience = bumpkin?.experience ?? 0;
  const level = getBumpkinLevel(experience);

  useEffect(() => {
    goToProgress();
  }, [level, experience]);

  const goToProgress = () => {
    if (progressBarEl.current) {
      const experience = bumpkin?.experience ?? 0;
      const { currentExperienceProgress, experienceToNextLevel } =
        getExperienceToNextLevel(experience);

      let percent = currentExperienceProgress / experienceToNextLevel;
      // Progress bar cant go further than 100%
      if (isMaxLevel(experience)) {
        percent = 1;
      }

      const scaledToProgress = percent * (SPRITE_STEPS - 1);
      progressBarEl.current.goToAndPause(Math.floor(scaledToProgress));
    }
  };

  if (!bumpkin) return null;

  return (
    <>
      {/* Bumpkin profile */}
      <div
        className={classNames(`grid fixed -left-4 z-50 top-0`, {
          "cursor-pointer hover:img-highlight": !!onClick,
        })}
        onClick={onClick}
      >
        <img
          src={whiteBg}
          className="col-start-1 row-start-1 opacity-40"
          style={{
            width: `${DIMENSIONS.scaled}px`,
            height: `${DIMENSIONS.scaled}px`,
          }}
        />
        <div
          className="col-start-1 row-start-1 overflow-hidden z-0"
          style={{
            width: `${DIMENSIONS.bumpkinContainer.width}px`,
            height: `${DIMENSIONS.bumpkinContainer.height}px`,
            borderBottomLeftRadius: `${DIMENSIONS.bumpkinContainer.radiusBottomLeft}px`,
            borderBottomRightRadius: `${DIMENSIONS.bumpkinContainer.radiusBottomRight}px`,
          }}
        >
          {bumpkin && (
            <div
              style={{
                width: `${DIMENSIONS.bumpkin.width}px`,
                marginLeft: `${DIMENSIONS.bumpkin.marginLeft}px`,
              }}
            >
              <DynamicNFT bumpkinParts={bumpkin.equipped} showTools={false} />
            </div>
          )}
        </div>
        <Spritesheet
          className="col-start-1 row-start-1 z-10"
          style={{
            width: `${DIMENSIONS.scaled}px`,
            imageRendering: "pixelated",
          }}
          image={progressBarSprite}
          widthFrame={DIMENSIONS.original}
          heightFrame={DIMENSIONS.original}
          fps={10}
          steps={SPRITE_STEPS}
          autoplay={false}
          getInstance={(spritesheet) => {
            progressBarEl.current = spritesheet;
            goToProgress();
          }}
        />
        <div
          className={`col-start-1 row-start-1 flex justify-center text-white text-xxs z-20`}
          style={{
            width: `${DIMENSIONS.level.width}px`,
            height: `${DIMENSIONS.level.height}px`,
            marginLeft: `${DIMENSIONS.level.marginLeft}px`,
            marginTop: `${DIMENSIONS.level.marginTop}px`,
          }}
        >
          {level}
        </div>
        {showAlert && (
          <img
            src={SUNNYSIDE.icons.expression_alerted}
            className="col-start-1 row-start-1 animate-float z-30"
            style={{
              width: `${DIMENSIONS.skillsMark.width}px`,
              marginLeft: `${DIMENSIONS.skillsMark.marginLeft}px`,
              marginTop: `${DIMENSIONS.skillsMark.marginTop}px`,
            }}
          />
        )}
      </div>
    </>
  );
};

export const BumpkinProfile: React.FC = () => {
  const progressBarEl = useRef<SpriteSheetInstance>();
  const [initialView, setInitialView] = useState<TabView>("home");
  const [showModal, setShowModal] = useState(false);

  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const {
    context: { state },
  } = gameState;

  const bumpkin = state.bumpkins?.wallet[state.bumpkins.farming.primary.id];

  const experience = bumpkin?.experience ?? 0;
  const level = getBumpkinLevel(experience);
  const showSkillPointAlert = hasUnacknowledgedSkillPoints(state);
  const showAchievementAlert = hasUnacknowledgedAchievements(state);

  useEffect(() => {
    goToProgress();
  }, [level, experience]);

  const handleShowHomeModal = () => {
    if (showAchievementAlert) {
      setInitialView("achievements");
    } else if (showSkillPointAlert) {
      setInitialView("skills");
    } else {
      setInitialView("home");
    }

    setShowModal(true);
  };

  const goToProgress = () => {
    if (progressBarEl.current) {
      const experience = bumpkin?.experience ?? 0;
      const { currentExperienceProgress, experienceToNextLevel } =
        getExperienceToNextLevel(experience);

      let percent = currentExperienceProgress / experienceToNextLevel;
      // Progress bar cant go further than 100%
      if (percent > 1) {
        percent = 1;
      }

      const scaledToProgress = percent * (SPRITE_STEPS - 1);
      progressBarEl.current.goToAndPause(Math.round(scaledToProgress));
    }
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  if (!bumpkin) return null;

  return (
    <>
      {/* Bumpkin modal */}
      <Modal show={showModal} centered onHide={handleHideModal}>
        <BumpkinPanel
          bumpkinId={bumpkin.id}
          initialView={initialView}
          onClose={handleHideModal}
        />
      </Modal>

      {/* Bumpkin profile */}
      <BumpkinAvatar
        bumpkin={bumpkin}
        onClick={handleShowHomeModal}
        showAlert={
          (showSkillPointAlert || showAchievementAlert) &&
          !gameState.matches("visiting")
        }
      />
    </>
  );
};

import React, { useContext, useState } from "react";
import {
  BumpkinSkill,
  BumpkinSkillTree,
  getSkills,
} from "features/game/types/bumpkinSkills";

import { getAvailableBumpkinSkillPoints } from "features/game/events/landExpansion/pickSkill";
import { Context } from "features/game/GameProvider";
import { useActor } from "@xstate/react";
import { SkillCategoryList } from "./SkillCategoryList";

import { SkillPathDetails } from "./SkillPathDetails";
import { Label } from "components/ui/Label";
import { findLevelRequiredForNextSkillPoint } from "features/game/lib/level";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { SUNNYSIDE } from "assets/sunnyside";

interface Props {
  bumpkinId: number;
  onBack: () => void;
  readonly: boolean;
}

export const Skills: React.FC<Props> = ({ bumpkinId, onBack, readonly }) => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const {
    context: { state },
  } = gameState;

  const bumpkin = state.bumpkins?.wallet[bumpkinId];

  const [selectedSkillPath, setSelectedSkillPath] =
    useState<BumpkinSkillTree | null>(null);
  const [skillsInPath, setSkillsInTree] = useState<BumpkinSkill[]>([]);

  const onSkillCategoryClickHandler = (category: BumpkinSkillTree) => {
    setSelectedSkillPath(category);

    const skillsInCategory: BumpkinSkill[] = getSkills(category);

    setSkillsInTree(skillsInCategory);
  };

  const handleBackToSkillList = () => {
    setSelectedSkillPath(null);
  };

  const handleBack = () => {
    if (selectedSkillPath) {
      handleBackToSkillList();
      return;
    }

    onBack();
  };

  const experience = bumpkin?.experience || 0;

  const availableSkillPoints = getAvailableBumpkinSkillPoints(bumpkin);

  const skillPointsInfo = () => {
    const nextLevelWithSkillPoint =
      findLevelRequiredForNextSkillPoint(experience);
    const hasUnclaimedSkillPoints = availableSkillPoints > 0;

    return (
      <div className="flex flex-wrap gap-x-2 gap-y-2 items-center justify-start">
        {hasUnclaimedSkillPoints && (
          <Label type="success">
            {`Skill Points: ${availableSkillPoints}`}
          </Label>
        )}
        {nextLevelWithSkillPoint && (
          <Label type="default">
            {`${
              hasUnclaimedSkillPoints ? "Next" : "Next Skill Point"
            }: Level ${findLevelRequiredForNextSkillPoint(experience)}`}
          </Label>
        )}
      </div>
    );
  };

  const backNavigationView = () => (
    <div
      className="flex flex-wrap space-x-2 space-y-2 items-center justify-start"
      style={{
        margin: `${PIXEL_SCALE * 2}px`,
        marginTop: "0px",
        marginRight: "0px",
      }}
    >
      <img
        src={SUNNYSIDE.icons.arrow_left}
        className="cursor-pointer"
        alt="back"
        style={{
          width: `${PIXEL_SCALE * 11}px`,
          marginTop: `${PIXEL_SCALE * 2.5}px`,
        }}
        onClick={handleBack}
      />
      {!readonly && skillPointsInfo()}
    </div>
  );

  return (
    <div
      style={{
        minHeight: "200px",
      }}
    >
      {!selectedSkillPath && (
        <SkillCategoryList
          onClick={(category) => onSkillCategoryClickHandler(category)}
          backNavigationView={!readonly ? skillPointsInfo() : undefined}
        />
      )}
      {selectedSkillPath && (
        <SkillPathDetails
          selectedSkillPath={selectedSkillPath}
          skillsInPath={skillsInPath}
          backNavigationView={backNavigationView()}
          readonly={readonly}
        />
      )}
    </div>
  );
};

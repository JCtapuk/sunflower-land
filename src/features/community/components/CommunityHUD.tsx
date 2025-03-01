import React, { useContext } from "react";
import { useActor } from "@xstate/react";

import { Balance } from "components/Balance";
import { BackButton } from "./BackButton";
import { Context } from "../lib/CommunityProvider";
import { createPortal } from "react-dom";

export const CommunityHud: React.FC = () => {
  const { communityService } = useContext(Context);
  const [state] = useActor(communityService);
  const { balance } = state.context;

  return createPortal(
    <div aria-label="Hud">
      <Balance balance={balance} />
      <BackButton />
    </div>,
    document.body
  );
};

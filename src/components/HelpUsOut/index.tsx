import { Box, Callout } from "bumbag";
import { User } from "firebase/auth";
import React from "react";

import { CrowdfundModal } from "./Actions/Crowdfund/Modal";
import { InviteModal } from "./Actions/Invite/Modal";
import { SocialMediaShareModal } from "./Actions/SocialMediaShare/Modal";

interface HelpUsOutProps {
  user: User | null;
}

export const HelpUsOut = ({ user }: HelpUsOutProps): React.ReactElement => {
  return (
    <Box
      box-sizing="border-box"
      display="flex"
      id="help-us-out-footer"
      justifyContent="center"
      paddingTop="major-6"
      width="100%"
    >
      <Callout
        iconProps={{ icon: "solid-hands-helping" }}
        title="Want to help us out?"
        minWidth="360px"
        maxWidth="768px"
        width="100%"
      >
        Flight Penguin is a free browser extension. Unlike other flight search sites, we don't serve ads, accept
        kickbacks, or manipulate flight results. If you like our product and appreciate this business model, lend us a
        hand.
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          id="content-tile-wrapper"
          paddingTop="major-3"
          width="100%"
        >
          <SocialMediaShareModal />
          <CrowdfundModal />
          <InviteModal user={user} />
        </Box>
      </Callout>
    </Box>
  );
};

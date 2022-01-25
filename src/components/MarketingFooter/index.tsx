import { Box, Stack, Text } from "bumbag";
import React from "react";

import { ContentTile } from "./ContentTile";

export const MarketingFooter = (): React.ReactElement => {
  return (
    <Box
      background="linear-gradient( 5deg, transparent 1%, #f2ebfd 20%, #f2ebfd 60%, transparent 60%)"
      box-sizing="border-box"
      display="flex"
      id="marketing-footer"
      justifyContent="center"
      paddingTop="major-6"
      paddingBottom="major-6"
      width="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        width="100%"
        maxWidth="1024px"
      >
        <Box display="flex" flexDirection="row" justifyContent="center" id="marketing-footer-title">
          <Text fontSize="clamp(1.5rem, 3vw, 3rem)" fontWeight="700">
            Take the pain out of flight search.
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          id="content-tile-wrapper"
          paddingTop="major-3"
          width="100%"
        >
          <ContentTile
            title="Visualize flights"
            body="Do your eyes glaze over staring at virtual flight tickets that are intentionally made to be difficult to compare?  Our time-bar layout makes it easy to see flight takeoff, landing, and layover times."
            image={{ path: "/images/TimelineView.png", altText: "Example of timeline view" }}
          />
          <ContentTile
            title="Fly pain free"
            body="Sick of seeing 'best' flight being a redeye on a discount carrier with a long layover?  Our top choice finds the best combination of comfort and value - usually an affordable, nonstop, daytime flight."
            image={{ path: "/images/PainView.png", altText: "Example of flights sorted by the pain algorithm" }}
          />
          <ContentTile
            title="One search"
            body="Hate having to visit multiple travel sites?  Our extension searches across airlines, including the ones that do not play nicely with others."
            image={{ path: "/images/Airlines.webp", altText: "Example of searched airlines" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

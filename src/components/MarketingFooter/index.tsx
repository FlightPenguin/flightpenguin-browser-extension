import { Box, Stack, Text } from "bumbag";
import React from "react";

import { ContentTile } from "./ContentTile";

export const MarketingFooter = (): React.ReactElement => {
  return (
    <Box display="flex" id="marketing-footer" paddingTop="major-8" width="100%">
      <Box display="flex" flexDirection="column" justifyContent="start" alignItems="center" width="100%">
        <Box display="flex" flexDirection="row" justifyContent="center" id="marketing-footer-title">
          <Text fontSize="clamp(2rem, 3vw, 4rem)" fontWeight="700">
            Take the pain out of flight search.
          </Text>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="center" id="content-tile-wrapper" paddingTop="major-3">
          <Stack orientation="horizontal" verticalBelow="tablet">
            <ContentTile
              title="Visualize flights"
              body="Do your eyes glaze over staring at virtual flight tickets that are intentionally made to be difficult to compare?  Our time-bar layout makes it easy to see flight takeoff, landing, and layover times."
              image={{ path: "/images/TimelineView.png", altText: "Example of timeline view" }}
            />
            <ContentTile
              title="Find better flights"
              body="Sick of seeing 'best' flights on a discount carrier with a long layover?  Our pain score finds the best combination of comfort and value."
              image={{ path: "woof", altText: "dog" }}
            />
            <ContentTile
              title="One search"
              body="Hate having to visit multiple travel sites?  Our extension searches across airlines, including the uncooperative ones like Southwest and Ryanair."
              image={{ path: "/images/AirlinesView.png", altText: "Example of searched airlines" }}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

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
              body="Our time-bar layout makes it easy to see flight takeoff, landing, and layover times.  You can compare apples to apples, instead of looking at virtual airline tickets designed to confuse you."
              image={{ path: "woof", altText: "dog" }}
            />
            <ContentTile
              title="Find better flights"
              body="Sick of seeing 'best' flights on a discount carrier with a long layover?  Our pain score finds the best combination of comfort and value."
              image={{ path: "woof", altText: "dog" }}
            />
            <ContentTile
              title="One search"
              body="Our extension searches across many airlines, allowing us to show you all the results.  No need to go to each airline's site."
              image={{ path: "woof", altText: "dog" }}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

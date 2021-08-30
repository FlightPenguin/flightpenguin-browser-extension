import { Box, Text } from "bumbag";
import capitalize from "lodash.capitalize";
import pluralize from "pluralize";
import React from "react";

interface TimelineTitleProps {
  flightType: "DEPARTURE" | "RETURN";
  itinerariesCount: number;
  legendWidth: number;
  headerWidth: number;
}

export const TimelineTitle = ({
  flightType,
  itinerariesCount,
  legendWidth,
  headerWidth,
}: TimelineTitleProps): React.ReactElement => {
  return (
    <Box data-name={`${flightType.toLowerCase()}-container`} display="flex" position="relative" justifyContent="center">
      <Text alignX="left" width={`${legendWidth}px`} fontWeight="700" fontSize="500">
        {pluralize(capitalize(flightType), itinerariesCount)}
      </Text>
      <Text position="relative" width={`${headerWidth}px`}>
        &nbsp;
      </Text>
    </Box>
  );
};

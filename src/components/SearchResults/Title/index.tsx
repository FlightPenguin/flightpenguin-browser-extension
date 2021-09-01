import { Box, Text } from "bumbag";
import capitalize from "lodash.capitalize";
import pluralize from "pluralize";
import React from "react";

interface TimelineTitleProps {
  flightType: "DEPARTURE" | "RETURN";
  flightCount: number;
  legendWidth: number;
  headerWidth: number;
}

export const TimelineTitle = ({
  flightType,
  flightCount,
  legendWidth,
  headerWidth,
}: TimelineTitleProps): React.ReactElement => {
  return (
    <Box data-name={`${flightType.toLowerCase()}-container`} display="flex" position="relative" justifyContent="center">
      <Text alignX="left" width={`${legendWidth}px`} fontWeight="700" fontSize="500">
        {pluralize(capitalize(flightType), flightCount)}
      </Text>
      <Text position="relative" width={`${headerWidth}px`}>
        &nbsp;
      </Text>
    </Box>
  );
};

import { Box, Spinner, Text, Tooltip } from "bumbag";
import capitalize from "lodash.capitalize";
import pluralize from "pluralize";
import React from "react";

interface TimelineTitleProps {
  flightType: "DEPARTURE" | "RETURN";
  flightCount: number;
  legendWidth: number;
  headerWidth: number;
  loading: boolean;
}

export const TimelineTitle = ({
  flightType,
  flightCount,
  legendWidth,
  headerWidth,
  loading,
}: TimelineTitleProps): React.ReactElement => {
  return (
    <Box data-name={`${flightType.toLowerCase()}-container`} display="flex" position="relative" justifyContent="center">
      <Box alignX="left" width={`${legendWidth}px`} flexDirection="row">
        <Text alignX="left" fontWeight="700" fontSize="500">
          {pluralize(capitalize(flightType), flightCount)}
        </Text>
        {loading && (
          <Tooltip
            hasArrow
            content="More flights are loading.  You don't need to wait for all the results to come in before selecting one."
            placement="top"
          >
            <Spinner paddingLeft="major-2" marginTop="major-2" color="warning" duration="1.2s" />
          </Tooltip>
        )}
      </Box>

      <Text position="relative" width={`${headerWidth}px`}>
        &nbsp;
      </Text>
    </Box>
  );
};

import { Box, Spinner, Text, Tooltip } from "bumbag";
import capitalize from "lodash.capitalize";
import isEqual from "lodash.isequal";
import React from "react";

import { legendWidth } from "../../constants";

interface TimelineTitleProps {
  flightType: "DEPARTURE" | "RETURN";
  loading: boolean;
}

const TimelineTitle = ({ flightType, loading }: TimelineTitleProps): React.ReactElement => {
  return (
    <Box
      className={`${flightType.toLowerCase()}-header-title`}
      display="flex"
      justifyContent="flex-end"
      flexDirection="column"
      border="1px solid transparent"
    >
      <Box alignX="left" width={`${legendWidth}px`} flexDirection="row">
        <Text alignX="left" fontWeight="700" fontSize="500">
          {capitalize(flightType)}s
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
    </Box>
  );
};

export default React.memo(TimelineTitle, (previous, next) => {
  return isEqual(previous, next);
});

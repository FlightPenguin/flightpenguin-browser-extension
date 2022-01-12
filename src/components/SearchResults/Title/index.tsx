import { Box, Text } from "bumbag";
import capitalize from "lodash.capitalize";
import isEqual from "lodash.isequal";
import React from "react";

import { SearchLegMeta } from "../../../shared/types/SearchMeta";
import { AirlineFilterMenu } from "./Filters/AirlineFilterMenu";
import { LayoverCountFilterMenu } from "./Filters/LayoverCountFilterMenu";
import { getFlightCountText } from "./utilities/getFlightCountText";

interface TimelineTitleProps {
  flightType: "DEPARTURE" | "RETURN";
  loading: boolean;
  legendContainerWidth: number;
  meta: SearchLegMeta;
  flightCount: number;
}

const TimelineTitle = ({
  flightType,
  loading,
  legendContainerWidth,
  meta,
  flightCount,
}: TimelineTitleProps): React.ReactElement => {
  const flightCountText = getFlightCountText({ loading, flightCount });

  return (
    <Box
      className={`${flightType.toLowerCase()}-header-title`}
      display="flex"
      flexDirection="column"
      border="1px solid transparent"
    >
      <Box width={`${legendContainerWidth}px`}>
        <Text alignX="left" fontWeight="700" fontSize="clamp(1rem, 1.5vw, 1.5rem)">
          {/*TODO: Make a sorting hat!*/}
          {capitalize(flightType)}s
        </Text>
        <Box display="flex" flexDirection="row" alignItems="start">
          <Text fontSize="clamp(.375rem, .6vw, .75rem)">{flightCountText}</Text>
        </Box>
        {!!meta?.layoverCounts.length && meta.layoverCounts.length > 1 && (
          <Box display="flex">
            <LayoverCountFilterMenu layoverCounts={meta.layoverCounts} />
          </Box>
        )}
        {!!meta?.airlines.length && meta.airlines.length > 1 && (
          <Box display="flex">
            <AirlineFilterMenu airlines={meta.airlines} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(TimelineTitle, (previous, next) => {
  return isEqual(previous, next);
});

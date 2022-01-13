import { Box, Text } from "bumbag";
import capitalize from "lodash.capitalize";
import isEqual from "lodash.isequal";
import React from "react";

import { SearchLegMeta } from "../../../shared/types/SearchMeta";
import { FlightSortDimension } from "../../constants";
import { AirlineFilterMenu } from "./Filters/AirlineFilterMenu";
import { LayoverCountFilterMenu } from "./Filters/LayoverCountFilterMenu";
import { SortFlightsMenu } from "./Sorts/SortFlightsMenu";

interface TimelineTitleProps {
  flightType: "DEPARTURE" | "RETURN";
  loading: boolean;
  legendContainerWidth: number;
  meta: SearchLegMeta;
  flightCount: number;
  filteredFlightCount: number;
  onLayoverCountFilterChange: (values: number[]) => void;
  onAirlinesFilterChange: (values: string[]) => void;
  onSortDimensionChange: (value: FlightSortDimension) => void;
  flightSelected: boolean;
}

const TimelineTitle = ({
  flightType,
  loading,
  legendContainerWidth,
  meta,
  flightCount,
  filteredFlightCount,
  onLayoverCountFilterChange,
  onAirlinesFilterChange,
  onSortDimensionChange,
  flightSelected,
}: TimelineTitleProps): React.ReactElement => {
  return (
    <Box
      className={`${flightType.toLowerCase()}-header-title`}
      display="flex"
      flexDirection="column"
      border="1px solid transparent"
    >
      <Box width={`${legendContainerWidth}px`}>
        <Text alignX="left" fontWeight="700" fontSize="clamp(1rem, 1.5vw, 1.5rem)">
          {capitalize(flightType)}s
        </Text>
        {!flightSelected && (
          <React.Fragment>
            <Box display="flex">
              <SortFlightsMenu
                loading={loading}
                flightCount={flightCount}
                filteredFlightCount={filteredFlightCount}
                onChange={onSortDimensionChange}
              />
            </Box>
            {!!meta?.layoverCounts.length && meta.layoverCounts.length > 1 && (
              <Box display="flex">
                <LayoverCountFilterMenu layoverCounts={meta.layoverCounts} onChange={onLayoverCountFilterChange} />
              </Box>
            )}
            {!!meta?.airlines.length && meta.airlines.length > 1 && (
              <Box display="flex">
                <AirlineFilterMenu airlines={meta.airlines} onChange={onAirlinesFilterChange} />
              </Box>
            )}
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(TimelineTitle, (previous, next) => {
  return isEqual(previous, next);
});

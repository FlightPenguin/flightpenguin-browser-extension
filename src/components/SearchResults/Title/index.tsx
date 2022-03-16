import { Box, Text } from "bumbag";
import isEqual from "lodash.isequal";
import React from "react";

import { SearchTripMeta } from "../../../shared/types/SearchMeta";
import { TripSortDimension } from "../../constants";
import { Airport } from "../../SearchForm/api/airports/Airport";
import { AirlineFilterMenu } from "./Filters/AirlineFilterMenu";
import { LayoverCountFilterMenu } from "./Filters/LayoverCountFilterMenu";
import { SortTripsMenu } from "./Sorts/SortTripsMenu";

interface TimelineTitleProps {
  arrivalLocation: Airport;
  departureLocation: Airport;
  containerIndex: number;
  loading: boolean;
  legendContainerWidth: number;
  meta: SearchTripMeta;
  tripCount: number;
  filteredTripCount: number;
  onLayoverCountFilterChange: (values: number[]) => void;
  onAirlinesFilterChange: (values: string[]) => void;
  onSortDimensionChange: (value: TripSortDimension) => void;
  tripSelected: boolean;
}

const TimelineTitle = ({
  arrivalLocation,
  containerIndex,
  departureLocation,
  loading,
  legendContainerWidth,
  meta,
  tripCount,
  filteredTripCount,
  onLayoverCountFilterChange,
  onAirlinesFilterChange,
  onSortDimensionChange,
  tripSelected,
}: TimelineTitleProps): React.ReactElement => {
  return (
    <Box
      className={`trip-header-title-${containerIndex}`}
      display="flex"
      flexDirection="column"
      border="1px solid transparent"
    >
      <Box width={`${legendContainerWidth}px`}>
        <Text alignX="left" fontWeight="700" fontSize="clamp(1rem, 1.5vw, 1.5rem)">
          {departureLocation.label} {">"} {arrivalLocation.label}
        </Text>
        {!tripSelected && (
          <React.Fragment>
            <Box display="flex">
              <SortTripsMenu
                loading={loading}
                tripCount={tripCount}
                filteredTripCount={filteredTripCount}
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

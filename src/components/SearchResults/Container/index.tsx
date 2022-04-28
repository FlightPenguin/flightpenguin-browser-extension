import { Alert, Badge, Box, Button } from "bumbag";
import isEqual from "lodash.isequal";
import React, { useEffect, useState } from "react";

import { DisplayableTrip } from "../../../shared/types/DisplayableTrip";
import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { SearchTripMeta } from "../../../shared/types/SearchMeta";
import { sidePaddingWidth, TripSortDimension } from "../../constants";
import TimelineGrid from "../Grid";
import TimelineHeader from "../Header";
import TimelineTitle from "../Title";
import { getFilteredTrips } from "./utilities/getFilteredTrips";
import { getIntervalInfo } from "./utilities/getIntervalInfo";
import { getSkeletonTrips } from "./utilities/getSkeletonTrips";
import { getSortedTrips } from "./utilities/getSortedTrips";
import { getTimelineRowComponentsWidth } from "./utilities/getTimelineRowComponentsWidth";

interface TimelineContainerProps {
  resultsContainerWidth: number;
  eligibleTrips: DisplayableTrip[];
  containerIndex: number;
  formData: FlightSearchFormData;
  meta: SearchTripMeta;
  loading: boolean;
  onSelection: (trip: DisplayableTrip) => void;
  onClear: () => void;
  onUpdateFormClick: () => void;
}

const TimelineContainer = ({
  resultsContainerWidth,
  eligibleTrips,
  containerIndex,
  formData,
  meta,
  loading,
  onSelection,
  onClear,
  onUpdateFormClick,
}: TimelineContainerProps): React.ReactElement => {
  const { legendContainerWidth, tripContainerWidth } = getTimelineRowComponentsWidth({
    resultsContainerWidth,
  });
  const [departureLocation, arrivalLocation] =
    formData.roundtrip && containerIndex === 2 ? [formData.to, formData.from] : [formData.from, formData.to];

  const [skeletonTrips, setSkeletonTrips] = useState<DisplayableTrip[]>([] as DisplayableTrip[]);

  const [filterDateRange, setFilterDateRange] = useState<{ lowerBound: Date | null; upperBound: Date | null }>({
    lowerBound: null,
    upperBound: null,
  });
  const [filterStops, setFilterStops] = useState<number[] | undefined>(undefined);
  const [filterCarriers, setFilterCarriers] = useState<string[] | undefined>(undefined);
  const [filterLayoverCities, setFilterLayoverCities] = useState<string[] | undefined>(undefined);
  const [sortDimension, setSortDimension] = useState<TripSortDimension>("pain");

  const [selectedTrip, setSelectedTrip] = useState<DisplayableTrip | null>(null);
  const [displayTrips, setDisplayTrips] = useState<DisplayableTrip[]>([]);
  const [updateSearchButtonDisabled, setUpdateSearchButtonDisabled] = useState(false);

  const intervalInfo = getIntervalInfo(meta, eligibleTrips, tripContainerWidth);

  useEffect(() => {
    const trips = getSkeletonTrips(formData, containerIndex, intervalInfo.earliestTime, intervalInfo.latestTime);
    setSkeletonTrips(trips);
  }, [formData, containerIndex]);

  useEffect(() => {
    if (selectedTrip) {
      return;
    }

    const filteredTrips = getFilteredTrips({
      displayTrips: eligibleTrips,
      filterProperties: {
        dateRange: filterDateRange,
        layoverCount: filterStops,
        carriers: filterCarriers,
        layoverCities: filterLayoverCities,
      },
    });

    if (filteredTrips && !!Object.keys(filteredTrips).length) {
      const sortedTrips = getSortedTrips({ trips: filteredTrips, dimension: sortDimension });
      setDisplayTrips(sortedTrips);
    } else {
      setDisplayTrips(filteredTrips);
    }
  }, [eligibleTrips, selectedTrip, filterDateRange, filterStops, filterCarriers, filterLayoverCities, sortDimension]);

  if (!loading && !eligibleTrips.length) {
    return (
      <Box alignX="center" marginTop="major-6">
        <Alert title="No flights found" type="warning">
          <Box width="100%">We were unable to find any flights. Update your search and / or try again!</Box>
          <Box width="100%" marginTop="major-1">
            <Button
              disabled={updateSearchButtonDisabled}
              palette="primary"
              onClick={() => {
                setUpdateSearchButtonDisabled(true);
                onUpdateFormClick();
              }}
            >
              Update search
            </Button>
          </Box>
        </Alert>
      </Box>
    );
  }

  const clearContainerSelection = () => {
    setSelectedTrip(null);
    onClear();
  };

  return (
    <Box
      key="timeline-container-section"
      use="section"
      paddingLeft={`${sidePaddingWidth}px`}
      paddingRight={`${sidePaddingWidth}px`}
      paddingBottom="45px"
      paddingTop="45px"
      altitude="400"
      width="100%"
    >
      <Box display="flex" flexDirection="row">
        <TimelineTitle
          key="search-title"
          arrivalLocation={arrivalLocation}
          containerIndex={containerIndex}
          departureLocation={departureLocation}
          loading={loading}
          legendContainerWidth={legendContainerWidth}
          tripCount={eligibleTrips.length}
          filteredTripCount={displayTrips.length}
          onLayoverCountFilterChange={(values: number[]) => setFilterStops(values)}
          onAirlinesFilterChange={(values: string[]) => setFilterCarriers(values)}
          onSortDimensionChange={(value) => setSortDimension(value)}
          meta={meta}
          tripSelected={!!selectedTrip}
        />
        <TimelineHeader
          arrivalLocation={arrivalLocation}
          departureLocation={departureLocation}
          intervals={intervalInfo.intervals}
          intervalWidth={intervalInfo.intervalWidth}
          tzOffset={intervalInfo.timezoneOffset}
          onSliderChange={(minDate: Date, maxDate: Date) => {
            setFilterDateRange({ lowerBound: minDate, upperBound: maxDate });
          }}
          sliderDisabled={!!selectedTrip}
          tripCount={displayTrips.length}
          tripContainerWidth={tripContainerWidth}
          startDate={intervalInfo.earliestTime}
        />
      </Box>
      <Box data-name={`trip-grid-wrapper-${containerIndex}`} display="flex">
        <Box className="border-flex-box" display="flex" width="100%">
          {eligibleTrips && eligibleTrips.length ? (
            !eligibleTrips.length &&
            (filterDateRange.lowerBound ||
              filterDateRange.upperBound ||
              filterStops !== undefined ||
              filterCarriers !== undefined ||
              filterLayoverCities !== undefined) ? (
              <Box width="100%" display="flex" justifyContent="center">
                <Alert title="No flights found" type="warning">
                  We were unable to find any flights that match your search criteria.{" "}
                  {loading ? "Results are still coming in, you can wait or u" : "U"}pdate your search and try again!
                </Alert>
              </Box>
            ) : (
              <TimelineGrid
                trips={displayTrips}
                intervalWidth={intervalInfo.intervalWidth}
                formData={formData}
                skeleton={false}
                selectedTrip={selectedTrip}
                legendContainerWidth={legendContainerWidth}
                resultsContainerWidth={resultsContainerWidth}
                onSelection={(trip: DisplayableTrip) => {
                  setSelectedTrip(trip);
                  setDisplayTrips([trip]);
                  onSelection(trip);
                }}
              />
            )
          ) : (
            <TimelineGrid
              trips={skeletonTrips}
              intervalWidth={intervalInfo.intervalWidth}
              formData={formData}
              skeleton={true}
              selectedTrip={null}
              legendContainerWidth={legendContainerWidth}
              resultsContainerWidth={resultsContainerWidth}
              onSelection={() => {}} // eslint-disable-line @typescript-eslint/no-empty-function
            />
          )}
        </Box>
      </Box>
      {selectedTrip && (
        <Badge isAttached size="large" palette="danger">
          <Box marginBottom="5px" fontSize={200} cursor="pointer" onClick={clearContainerSelection}>
            x
          </Box>
        </Badge>
      )}
    </Box>
  );
};

export default React.memo(TimelineContainer, (previous, next) => {
  return isEqual(getComparableProperties(previous), getComparableProperties(next));
});

const getComparableProperties = (container: TimelineContainerProps) => {
  return {
    trips: container.eligibleTrips,
    width: container.resultsContainerWidth,
    index: container.containerIndex,
    formData: container.formData,
    loading: container.loading,
    meta: container.meta,
  };
};

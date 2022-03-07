import { Alert, Badge, Box, Button } from "bumbag";
import isEqual from "lodash.isequal";
import uniqBy from "lodash.uniqby";
import React, { useEffect, useState } from "react";

import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../shared/types/ProcessedItinerary";
import { SearchLegMeta } from "../../../shared/types/SearchMeta";
import { FlightSortDimension, sidePaddingWidth } from "../../constants";
import { FlightSelection } from "../FlightSelection";
import TimelineGrid from "../Grid";
import TimelineHeader from "../Header";
import TimelineTitle from "../Title";
import _skeletonItineraries from "./skeletonItineraries.json";
import { getFilteredFlights } from "./utilities/getFilteredFlights";
import { getFlightRowComponentsWidth } from "./utilities/getFlightRowComponentsWidth";
import { getIntervalInfo } from "./utilities/getIntervalInfo";
import { getSkeletonIntervalInfo } from "./utilities/getSkeletonIntervalInfo";
import { getSkeletonItinerariesWithFlightDates } from "./utilities/getSkeletonItinerariesWithFlightDates";
import { getSortedFlights } from "./utilities/getSortedFlights";
import { isReadyToRenderResults } from "./utilities/isReadyToRenderResults";

interface TimelimeContainerProps {
  resultsContainerWidth: number;
  flightType: "DEPARTURE" | "RETURN";
  itineraries: { [keyof: string]: ProcessedItinerary };
  flights: ProcessedFlightSearchResult[];
  formData: FlightSearchFormData;
  meta: SearchLegMeta;
  loading: boolean;
  onSelection: (details: FlightSelection) => void;
  onClear: () => void;
  onUpdateFormClick: () => void;
}

const TimelineContainer = ({
  resultsContainerWidth,
  flightType,
  flights,
  itineraries,
  formData,
  meta,
  loading,
  onSelection,
  onClear,
  onUpdateFormClick,
}: TimelimeContainerProps): React.ReactElement => {
  const { legendContainerWidth, flightSegmentsContainerWidth: flightTimeContainerWidth } = getFlightRowComponentsWidth({
    resultsContainerWidth,
  });

  const [skeletonItineraries, setSkeletonItineraries] = useState<{ [keyof: string]: ProcessedItinerary }>({});
  const [skeletonFlights, setSkeletonFlights] = useState<ProcessedFlightSearchResult[]>([]);

  const [filterDateRange, setFilterDateRange] = useState<{ lowerBound: Date | null; upperBound: Date | null }>({
    lowerBound: null,
    upperBound: null,
  });
  const [filterStops, setFilterStops] = useState<number[] | undefined>(undefined);
  const [filterCarriers, setFilterCarriers] = useState<string[] | undefined>(undefined);
  const [filterLayoverCities, setFilterLayoverCities] = useState<string[] | undefined>(undefined);
  const [sortDimension, setSortDimension] = useState<FlightSortDimension>("pain");

  const [selectedFlightDetails, setSelectedFlightDetails] = useState<FlightSelection | null>(null);
  const [displayFlights, setDisplayFlights] = useState<ProcessedFlightSearchResult[]>([]);
  const [intervalInfo, setIntervalInfo] = useState<{
    startHour: number;
    increment: number;
    intervals: number[];
    timezoneOffset: number;
  }>(getSkeletonIntervalInfo({ flightTimeContainerWidth }));

  const [updateSearchButtonDisabled, setUpdateSearchButtonDisabled] = useState(false);

  useEffect(() => {
    if (!flights.length) {
      const intervalInfo = getSkeletonIntervalInfo({ flightTimeContainerWidth });
      setIntervalInfo(intervalInfo);
    }
  }, [resultsContainerWidth, flights]);

  useEffect(() => {
    const itins = getSkeletonItinerariesWithFlightDates({
      itineraries: _skeletonItineraries,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
    });
    setSkeletonItineraries(itins);
    setSkeletonFlights(
      Object.keys(_skeletonItineraries).map((itineraryId) => {
        const itinerary = itins[itineraryId];
        return flightType === "RETURN" && itinerary.retFlight ? itinerary.retFlight : itinerary.depFlight;
      }),
    );
  }, [_skeletonItineraries]);

  useEffect(() => {
    if (selectedFlightDetails) {
      return;
    }

    const filteredFlights = getFilteredFlights({
      flightSearchResults: flights,
      filterProperties: {
        dateRange: filterDateRange,
        layoverCount: filterStops,
        carriers: filterCarriers,
        layoverCities: filterLayoverCities,
      },
    });

    if (itineraries && !!Object.keys(itineraries).length) {
      const sortedFlights = getSortedFlights({ flights: filteredFlights, itineraries, dimension: sortDimension });
      setDisplayFlights(sortedFlights);
    } else {
      setDisplayFlights(filteredFlights);
    }
  }, [
    flights,
    itineraries,
    selectedFlightDetails,
    filterDateRange,
    filterStops,
    filterCarriers,
    filterLayoverCities,
    sortDimension,
  ]);

  useEffect(() => {
    if (
      Object.keys(itineraries).length &&
      Object.values(itineraries).some((itinerary) => {
        const flight = flightType === "RETURN" ? itinerary.retFlight : itinerary.depFlight;
        return !!flight;
      })
    ) {
      const { intervals, increment, startHour } = getIntervalInfo(
        Object.values(itineraries),
        flightType,
        flightTimeContainerWidth,
      );
      const timezoneOffset = Object.values(itineraries)[0].depFlight?.timezoneOffset || 0;
      setIntervalInfo({ intervals, increment, startHour, timezoneOffset });
    }
  }, [itineraries, resultsContainerWidth]);

  if (!loading && !flights.length) {
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
    setSelectedFlightDetails(null);
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
          flightType={flightType}
          loading={loading}
          legendContainerWidth={legendContainerWidth}
          flightCount={uniqBy(flights, "id").length}
          filteredFlightCount={displayFlights.length}
          onLayoverCountFilterChange={(values: number[]) => setFilterStops(values)}
          onAirlinesFilterChange={(values: string[]) => setFilterCarriers(values)}
          onSortDimensionChange={(value) => setSortDimension(value)}
          meta={meta}
          flightSelected={!!selectedFlightDetails}
        />
        <TimelineHeader
          formData={formData}
          flightType={flightType}
          intervals={intervalInfo.intervals}
          tzOffset={intervalInfo.timezoneOffset}
          onSliderChange={(minDate: Date, maxDate: Date) => {
            setFilterDateRange({ lowerBound: minDate, upperBound: maxDate });
          }}
          sliderDisabled={!!selectedFlightDetails}
          flightCount={displayFlights.length}
          flightTimeContainerWidth={flightTimeContainerWidth}
        />
      </Box>
      <Box data-name={`${flightType.toLowerCase()}-container`} display="flex">
        <Box className="border-flex-box" display="flex" borderLeft="default" width="100%">
          {isReadyToRenderResults({ flights, itineraries }) ? (
            !displayFlights.length &&
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
                flights={displayFlights}
                itineraries={itineraries}
                startHour={intervalInfo.startHour}
                increment={intervalInfo.increment}
                intervalCount={intervalInfo.intervals.length}
                flightType={flightType}
                formData={formData}
                skeleton={false}
                selectedFlight={selectedFlightDetails?.flight}
                legendContainerWidth={legendContainerWidth}
                resultsContainerWidth={resultsContainerWidth}
                flightTimeContainerWidth={flightTimeContainerWidth}
                onSelection={(details: FlightSelection) => {
                  setSelectedFlightDetails(details);
                  setDisplayFlights([details.flight]);
                  onSelection(details);
                }}
              />
            )
          ) : (
            <TimelineGrid
              flights={skeletonFlights}
              itineraries={skeletonItineraries}
              startHour={intervalInfo.startHour}
              increment={intervalInfo.increment}
              intervalCount={intervalInfo.intervals.length}
              flightType={flightType}
              formData={formData}
              skeleton={true}
              selectedFlight={undefined}
              legendContainerWidth={legendContainerWidth}
              flightTimeContainerWidth={flightTimeContainerWidth}
              resultsContainerWidth={resultsContainerWidth}
              onSelection={() => {}} // eslint-disable-line @typescript-eslint/no-empty-function
            />
          )}
        </Box>
      </Box>
      {selectedFlightDetails && (
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
  return isEqual(
    {
      flights: previous.flights,
      meta: previous.meta,
      itineraries: previous.itineraries,
      formData: previous.formData,
      flightType: previous.flightType,
      loading: previous.loading,
      resultsContainerWidth: previous.resultsContainerWidth,
    },
    {
      flights: next.flights,
      meta: next.meta,
      itineraries: next.itineraries,
      formData: next.formData,
      flightType: next.flightType,
      loading: next.loading,
      resultsContainerWidth: next.resultsContainerWidth,
    },
  );
});

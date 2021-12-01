import { Alert, Badge, Box } from "bumbag";
import { parseISO } from "date-fns";
import isEqual from "lodash.isequal";
import uniqBy from "lodash.uniqby";
import React, { useEffect, useState } from "react";

import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../shared/types/ProcessedItinerary";
import { legendWidth, sidePaddingWidth } from "../../constants";
import { FlightSelection } from "../FlightSelection";
import TimelineGrid from "../Grid";
import TimelineHeader from "../Header";
import TimelineTitle from "../Title";
import _skeletonItineraries from "./skeletonItineraries.json";
import { getFlightTimeContainerWidth } from "./utilities/getFlightTimeContainerWidth";
import { getIntervalInfo } from "./utilities/getIntervalInfo";
import { getSkeletonItinerariesWithFlightDates } from "./utilities/getSkeletonItinerariesWithFlightDates";
import { isFlightArrivingBeforeTime } from "./utilities/isFlightArrivingBeforeTime";
import { isFlightDepartingAfterTime } from "./utilities/isFlightDepartingAfterTime";

interface TimelimeContainerProps {
  resultsContainerWidth: number;
  flightType: "DEPARTURE" | "RETURN";
  itineraries: { [keyof: string]: ProcessedItinerary };
  flights: ProcessedFlightSearchResult[];
  formData: FlightSearchFormData;
  loading: boolean;
  onSelection: (details: FlightSelection) => void;
  onClear: () => void;
}

const TimelineContainer = ({
  resultsContainerWidth,
  flightType,
  flights,
  itineraries,
  formData,
  loading,
  onSelection,
  onClear,
}: TimelimeContainerProps): React.ReactElement => {
  const flightTimeContainerWidth = getFlightTimeContainerWidth({
    resultsContainerWidth,
    legendContainerWidth: legendWidth,
  });

  const [skeletonItineraries, setSkeletonItineraries] = useState<{ [keyof: string]: ProcessedItinerary }>({});
  const [skeletonFlights, setSkeletonFlights] = useState<ProcessedFlightSearchResult[]>([]);

  const [filterDateRange, setFilterDateRange] = useState<{ lowerBound: Date | null; upperBound: Date | null }>({
    lowerBound: null,
    upperBound: null,
  });
  const [selectedFlightDetails, setSelectedFlightDetails] = useState<FlightSelection | null>(null);
  const [displayFlights, setDisplayFlights] = useState<ProcessedFlightSearchResult[]>([]);
  const [intervalInfo, setIntervalInfo] = useState<{
    startHour: number;
    increment: number;
    intervals: number[];
    timezoneOffset: number;
  }>({ startHour: 0, increment: 4, intervals: [0, 4, 8, 12, 16, 20, 24, 28], timezoneOffset: 0 });

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
    // filter
    const filteredFlights = flights.filter((flight) => {
      // These coercions are necessary due to object passing from thread to thread...
      if (!(flight.fromDateTime instanceof Date)) {
        flight.fromDateTime = parseISO(flight.fromDateTime);
      }
      if (!(flight.toDateTime instanceof Date)) {
        flight.toDateTime = parseISO(flight.toDateTime);
      }
      if (!(flight.toLocalDateTime instanceof Date)) {
        flight.toLocalDateTime = parseISO(flight.toLocalDateTime);
      }

      return (
        isFlightArrivingBeforeTime({ flight, datetime: filterDateRange.upperBound }) &&
        isFlightDepartingAfterTime({ flight, datetime: filterDateRange.lowerBound })
      );
    });

    // sort / unique
    const sortedFlights = uniqBy(filteredFlights, "id").sort((a, b) => {
      return a.pain - b.pain;
    });
    setDisplayFlights(sortedFlights);
  }, [flights, selectedFlightDetails, filterDateRange]);

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
  }, [itineraries]);

  if (!loading && !flights.length) {
    return (
      <Alert title="No flights found" type="warning">
        We were unable to find any flights. Update your search and try again!
      </Alert>
    );
  }

  return (
    <Box
      key="timeline-container-section"
      use="section"
      paddingLeft={`${sidePaddingWidth}px`}
      paddingRight={`${sidePaddingWidth}px`}
      paddingBottom="45px"
      paddingTop="45px"
      altitude="400"
      width={`${resultsContainerWidth}px`}
    >
      <Box display="flex" flexDirection="row">
        <TimelineTitle key="search-title" flightType={flightType} loading={loading} />
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
          {flights.length ? (
            !displayFlights.length && (filterDateRange.lowerBound || filterDateRange.upperBound) ? (
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
              flightTimeContainerWidth={flightTimeContainerWidth}
              resultsContainerWidth={resultsContainerWidth}
              onSelection={() => {}} // eslint-disable-line @typescript-eslint/no-empty-function
            />
          )}
        </Box>
      </Box>
      {selectedFlightDetails && (
        <Badge isAttached size="large" palette="danger">
          <Box
            marginBottom="5px"
            fontSize={200}
            cursor="pointer"
            onClick={() => {
              setSelectedFlightDetails(null);
              onClear();
            }}
          >
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
      itineraries: previous.itineraries,
      formData: previous.formData,
      flightType: previous.flightType,
      loading: previous.loading,
      resultsContainerWidth: previous.resultsContainerWidth,
    },
    {
      flights: next.flights,
      itineraries: next.itineraries,
      formData: next.formData,
      flightType: next.flightType,
      loading: next.loading,
      resultsContainerWidth: next.resultsContainerWidth,
    },
  );
});

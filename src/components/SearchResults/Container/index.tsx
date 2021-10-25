import { Alert, Badge, Box } from "bumbag";
import isEqual from "lodash.isequal";
import uniqBy from "lodash.uniqby";
import React, { useEffect, useState } from "react";

import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../shared/types/ProcessedItinerary";
import { containerWidth, flightTimeContainerWidth, sidePaddingWidth } from "../../constants";
import { FlightSelection } from "../FlightSelection";
import TimelineGrid from "../Grid";
import TimelineHeader from "../Header";
import TimelineTitle from "../Title";
import _skeletonItineraries from "./skeletonItineraries.json";
import { getFilteredFlightsByArrivalTime } from "./utilities/getFilteredFlightsByArrivalTime";
import { getFilteredFlightsByDepartureTime } from "./utilities/getFilteredFlightsByDepartureTime";
import { getIntervalInfo } from "./utilities/getIntervalInfo";

interface TimelimeContainerProps {
  flightType: "DEPARTURE" | "RETURN";
  itineraries: { [keyof: string]: ProcessedItinerary };
  flights: ProcessedFlightSearchResult[];
  formData: FlightSearchFormData;
  loading: boolean;
  onSelection: (details: FlightSelection) => void;
  onClear: () => void;
}

const TimelineContainer = ({
  flightType,
  flights,
  itineraries,
  formData,
  loading,
  onSelection,
  onClear,
}: TimelimeContainerProps): React.ReactElement => {
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
    const itins = _skeletonItineraries as { [keyof: string]: ProcessedItinerary };
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
    let filteredFlights = flights;
    filteredFlights = getFilteredFlightsByArrivalTime({
      flights: filteredFlights,
      datetime: filterDateRange.lowerBound,
    });
    filteredFlights = getFilteredFlightsByDepartureTime({
      flights: filteredFlights,
      datetime: filterDateRange.upperBound,
    });

    // sort / unique
    const sortedFlights = uniqBy(filteredFlights, "id").sort((a, b) => {
      return a.pain - b.pain;
    });
    setDisplayFlights(sortedFlights);
  }, [flights, selectedFlightDetails]);

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
      width={`${containerWidth + sidePaddingWidth * 2}px`}
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
        />
      </Box>
      <Box data-name={`${flightType.toLowerCase()}-container`} display="flex">
        <Box className="border-flex-box" display="flex" borderLeft="default">
          {displayFlights.length ? (
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
              onSelection={(details: FlightSelection) => {
                setSelectedFlightDetails(details);
                setDisplayFlights([details.flight]);
                onSelection(details);
              }}
            />
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
    },
    {
      flights: next.flights,
      itineraries: next.itineraries,
      formData: next.formData,
      flightType: next.flightType,
      loading: next.loading,
    },
  );
});

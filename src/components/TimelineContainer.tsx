import { Box, List } from "bumbag";
import React, { useState } from "react";

import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../shared/types/ProcessedItinerary";
import { TimelineHeader } from "./TimelineHeader";
import { TimelineRow } from "./TimelineRow";
import { TimelineTitle } from "./TimelineTitle";
import { FlightSelection } from "./types/FlightSelection";

interface TimelimeContainerProps {
  flightType: "DEPARTURE" | "RETURN";
  itineraries: { [keyof: string]: ProcessedItinerary };
  flights: ProcessedFlightSearchResult[];
  formData: FlightSearchFormData;
  onSelection: (details: FlightSelection) => void;
}

export const TimelineContainer = ({
  flightType,
  flights,
  itineraries,
  formData,
  onSelection,
}: TimelimeContainerProps): React.ReactElement => {
  const [selectedFlightDetails, setSelectedFlightDetails] = useState<FlightSelection | null>(null);

  const containerWidth = 1418;
  const legendWidth = 300;
  const flightTimeContainerWidth = containerWidth - legendWidth - 1;
  const { intervals, increment, startHour } = getIntervalInfo(
    Object.values(itineraries),
    flightType,
    flightTimeContainerWidth,
  );
  const timezoneOffset = itineraries[0].depFlight.timezoneOffset;

  return (
    <Box
      use="section"
      paddingLeft="40px"
      paddingRight="40px"
      paddingBottom="40px"
      paddingTop={timezoneOffset > 0 ? "95px" : "65px"}
      altitude="400"
      width={`${containerWidth + 80}px`}
    >
      <TimelineTitle
        flightType={flightType}
        flightCount={flights.length}
        headerWidth={flightTimeContainerWidth}
        legendWidth={legendWidth}
      />
      <Box
        data-name={`${flightType.toLowerCase()}-container`}
        display="flex"
        position="relative"
        justifyContent="center"
      >
        <Box display="flex" position="relative" justifyContent="center">
          <List width={`${legendWidth}px`} borderLeft="default">
            {flights.map((flight, index) => {
              const flightPenguinId = getFlightPenguinId(flight);
              const cheapestItinerary = getCheapestItinerary(flight, itineraries);
              return (
                <TimelineRow
                  flight={flight}
                  itinerary={cheapestItinerary}
                  flightType={flightType}
                  maxRowWidth={containerWidth}
                  flightTimeContainerWidth={flightTimeContainerWidth}
                  legendWidth={legendWidth}
                  intervalCount={intervals.length}
                  increment={increment}
                  startHourOffset={startHour}
                  key={`itinerary-${flightPenguinId}`}
                  from={formData.from}
                  to={formData.to}
                  index={index}
                  hide={!!selectedFlightDetails}
                  onSelection={(details: FlightSelection) => {
                    setSelectedFlightDetails(details);
                    onSelection(details);
                  }}
                />
              );
            })}
          </List>
          <TimelineHeader
            formData={formData}
            flightType={flightType}
            intervals={intervals}
            tzOffset={timezoneOffset}
            flightTimeContainerWidth={flightTimeContainerWidth}
          />
        </Box>
      </Box>
    </Box>
  );
};

const getCheapestItinerary = (
  flight: ProcessedFlightSearchResult,
  itineraries: { [keyof: string]: ProcessedItinerary },
) => {
  return flight.itinIds.map((itinId) => itineraries[itinId]).sort((a, b) => a.fareNumber - b.fareNumber)[0];
};

const getFlightPenguinId = (flight: ProcessedFlightSearchResult): string => {
  return `${flight.operatingAirline.display}-${flight.fromTime}-${flight.toTime}`;
};

const getFlights = (
  itineraries: ProcessedItinerary[],
  flightType: "DEPARTURE" | "RETURN",
): ProcessedFlightSearchResult[] => {
  return itineraries.map((itinerary) => {
    const flight = flightType === "RETURN" ? itinerary.retFlight : itinerary.depFlight;
    if (!flight) {
      throw new Error(`No ${flightType.toLowerCase()} in itinerary`);
    }
    return flight;
  });
};

const getIntervalInfo = (
  itineraries: ProcessedItinerary[],
  flightType: "DEPARTURE" | "RETURN",
  rowMaxWidth: number,
) => {
  const flights = getFlights(itineraries, flightType);
  const earliestFlight = getEarliestFlight(flights);
  const latestFlight = getLatestFlight(flights);
  const { lowerBound, upperBound } = getTableTimeBounds(earliestFlight, latestFlight);

  const startHour = getStartHour(lowerBound);
  const increment = getIncrement(lowerBound, upperBound, startHour);
  const intervals = getIntervals(startHour, increment, rowMaxWidth, upperBound);

  return { lowerBound, upperBound, startHour, increment, intervals };
};

const getEarliestFlight = (flights: ProcessedFlightSearchResult[]): ProcessedFlightSearchResult => {
  return flights.slice().sort((a, b) => a.fromTimeDetails.hours - b.fromTimeDetails.hours)[0];
};

const getLatestFlight = (flights: ProcessedFlightSearchResult[]): ProcessedFlightSearchResult => {
  return flights.slice().sort((a, b) => b.toTimeDetails.hours - a.toTimeDetails.hours)[0];
};

const getTableTimeBounds = (
  earliestFlight: ProcessedFlightSearchResult,
  latestFlight: ProcessedFlightSearchResult,
  buffer = 2,
): { lowerBound: number; upperBound: number } => {
  return {
    lowerBound: Math.max(earliestFlight.fromTimeDetails.hours - buffer, 0),
    upperBound: latestFlight.toTimeDetails.hours + buffer,
  };
};

const getStartHour = (lowerBound: number): number => {
  return lowerBound < 12 ? 0 : 12;
};

const getIncrement = (lowerBound: number, upperBound: number, startHour: number): number => {
  let increment;

  if (upperBound - lowerBound > 72) {
    increment = 6;
  } else if (upperBound - startHour <= 12) {
    increment = 1;
  } else if (upperBound - startHour <= 24) {
    if (startHour % 4 === 0) {
      increment = 2;
    } else {
      increment = 3;
    }
  } else if (startHour % 4 === 0) {
    increment = 4;
  } else {
    increment = 3;
  }
  return increment;
};

const getIntervals = (startHour: number, increment: number, maxRowWidth: number, upperBound: number): number[] => {
  const intervals: number[] = [];
  let time = startHour;

  while (time <= upperBound + increment) {
    intervals.push(time);
    time += increment;
  }
  return intervals;
};

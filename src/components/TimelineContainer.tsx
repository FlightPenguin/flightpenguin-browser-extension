import { Box, List, Text } from "bumbag";
import capitalize from "lodash.capitalize";
import pluralize from "pluralize";
import React from "react";

import { FlightDetails } from "../shared/types/FlightDetails";
import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { Itinerary } from "../shared/types/Itinerary";
import { TimelineHeader } from "./TimelineHeader";
import { TimelineRow } from "./TimelineRow";

interface TimelimeContainerProps {
  flightType: "DEPARTURE" | "RETURN";
  itineraries: Itinerary[];
  formData: FlightSearchFormData;
}

export const TimelineContainer = ({
  flightType,
  itineraries,
  formData,
}: TimelimeContainerProps): React.ReactElement => {
  const width = 1418;
  const { intervals, increment, startHour } = getIntervalInfo(itineraries, flightType, width);
  const timezoneOffset = itineraries[0].departureFlight.timezoneOffset;

  return (
    <Box use="section" paddingLeft="major-3" paddingTop="major-3">
      <Text fontWeight="bold" fontSize={400}>
        {pluralize(capitalize(flightType), itineraries.length)}
      </Text>
      <Box data-name={"container"} display="flex" position="relative" justifyContent="center">
        <List width="350px">
          {itineraries.map((itinerary) => {
            const flightPenguinId = getFlightPenguinId(itinerary, flightType);
            return (
              <TimelineRow
                itinerary={itinerary}
                flightType={flightType}
                maxRowWidth={width}
                intervalCount={intervals.length}
                increment={increment}
                startHourOffset={startHour}
                key={`itinerary-${flightPenguinId}`}
                onClick={(event) => {
                  return;
                }} // TODO
              />
            );
          })}
        </List>
        <TimelineHeader
          formData={formData}
          flightType={flightType}
          intervals={intervals}
          tzOffset={timezoneOffset}
          maxRowWidth={width}
        />
      </Box>
    </Box>
  );
};

const getFlightPenguinId = (itinerary: Itinerary, flightType: "DEPARTURE" | "RETURN"): string => {
  const flight = flightType === "RETURN" ? itinerary.returnFlight : itinerary.departureFlight;
  return `${flight.operatingAirline}-${flight.fromTime}-${flight.toTime}`;
};

const getFlights = (itineraries: Itinerary[], flightType: "DEPARTURE" | "RETURN"): FlightDetails[] => {
  return itineraries.map((itinerary) => {
    return flightType === "RETURN" ? itinerary.returnFlight : itinerary.departureFlight;
  });
};

const getIntervalInfo = (itineraries: Itinerary[], flightType: "DEPARTURE" | "RETURN", rowMaxWidth: number) => {
  const flights = getFlights(itineraries, flightType);
  const earliestFlight = getEarliestFlight(flights);
  const latestFlight = getLatestFlight(flights);
  const { lowerBound, upperBound } = getTableTimeBounds(earliestFlight, latestFlight);

  const startHour = getStartHour(lowerBound);
  const increment = getIncrement(lowerBound, upperBound, startHour);
  const intervals = getIntervals(startHour, increment, rowMaxWidth, upperBound);

  return { lowerBound, upperBound, startHour, increment, intervals };
};

const getEarliestFlight = (flights: FlightDetails[]): FlightDetails => {
  return flights.slice().sort((a, b) => a.fromTimeDetails.hours - b.fromTimeDetails.hours)[0];
};

const getLatestFlight = (flights: FlightDetails[]): FlightDetails => {
  return flights.slice().sort((a, b) => b.toTimeDetails.hours - a.toTimeDetails.hours)[0];
};

const getTableTimeBounds = (
  earliestFlight: FlightDetails,
  latestFlight: FlightDetails,
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

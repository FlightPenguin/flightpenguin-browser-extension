import { parseISO } from "date-fns";

import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";
import { isFlightArrivingBeforeTime } from "./isFlightArrivingBeforeTime";
import { isFlightDepartingAfterTime } from "./isFlightDepartingAfterTime";
import { isFlightOperatedByCarriers } from "./isFlightOperatedByCarriers";
import { isFlightThroughCity } from "./isFlightThroughCity";
import { isLayoverCountInRange } from "./isLayoverCountInRange";

interface GetFilteredFlightsInput {
  flightSearchResults: ProcessedFlightSearchResult[];
  filterProperties: {
    dateRange: { lowerBound: Date | null; upperBound: Date | null };
    maxStopNumber: number | undefined;
    carriers: string[] | undefined;
    layoverCities: string[] | undefined;
  };
}

export const getFilteredFlights = ({
  flightSearchResults,
  filterProperties,
}: GetFilteredFlightsInput): ProcessedFlightSearchResult[] => {
  return flightSearchResults.filter((flight) => {
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
      isFlightArrivingBeforeTime({ flight, datetime: filterProperties.dateRange.upperBound }) &&
      isFlightDepartingAfterTime({ flight, datetime: filterProperties.dateRange.lowerBound }) &&
      isLayoverCountInRange({ flight, maxLayoverCount: filterProperties.maxStopNumber }) &&
      isFlightThroughCity({ flight, cities: filterProperties.layoverCities }) &&
      isFlightOperatedByCarriers({ flight, carriers: filterProperties.carriers })
    );
  });
};

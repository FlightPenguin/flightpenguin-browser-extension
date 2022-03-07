import uniqBy from "lodash.uniqby";

import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../../shared/types/ProcessedItinerary";
import { FlightSortDimension } from "../../../constants";

interface GetSortedFlightsProps {
  flights: ProcessedFlightSearchResult[];
  itineraries: { [keyof: string]: ProcessedItinerary };
  dimension: FlightSortDimension;
}

export const getSortedFlights = ({
  flights,
  itineraries,
  dimension,
}: GetSortedFlightsProps): ProcessedFlightSearchResult[] => {
  return uniqBy(flights, "id").sort((a, b) => {
    return getSortValue(a, b, itineraries, dimension);
  });
};

const getSortValue = (
  a: ProcessedFlightSearchResult,
  b: ProcessedFlightSearchResult,
  itineraries: { [keyof: string]: ProcessedItinerary },
  dimension: FlightSortDimension,
): number => {
  const itinA = itineraries[getItineraryId(a, itineraries) || ""];
  const itinB = itineraries[getItineraryId(b, itineraries) || ""];

  switch (dimension) {
    case "ata":
      return a.toDateTime.valueOf() - b.toDateTime.valueOf();
    case "atd":
      return b.toDateTime.valueOf() - a.toDateTime.valueOf();
    case "dta":
      return a.fromDateTime.valueOf() - b.fromDateTime.valueOf();
    case "dtd":
      return b.fromDateTime.valueOf() - a.fromDateTime.valueOf();
    case "duration":
      return a.durationMinutes - b.durationMinutes;
    case "fare":
      if (!itinA && !itinB) {
        return 0;
      } else if (!!itinA && !itinB) {
        return -1;
      } else if (!itinA && !!itinB) {
        return 1;
      } else {
        return itinA.fareNumber - itinB.fareNumber;
      }
      break;
    case "pain":
      return a.pain - b.pain;
  }
};

const getItineraryId = (
  flight: ProcessedFlightSearchResult,
  itineraries: { [keyof: string]: ProcessedItinerary },
): string | undefined => {
  return flight.itinIds.find((itinId) => Object.prototype.hasOwnProperty.call(itineraries, itinId));
};

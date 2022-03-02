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
  const itinA = itineraries[getItineraryId(a, itineraries)];
  const itinB = itineraries[getItineraryId(b, itineraries)];

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
      return itinA.fareNumber - itinB.fareNumber;
    case "pain":
      return a.pain - b.pain;
  }
};

const getItineraryId = (
  flight: ProcessedFlightSearchResult,
  itineraries: { [keyof: string]: ProcessedItinerary },
): string => {
  const id = flight.itinIds.find((itinId) => Object.prototype.hasOwnProperty.call(itineraries, itinId));
  if (!id) {
    throw new Error("Unable to determine itinerary ID");
  }
  return id;
};

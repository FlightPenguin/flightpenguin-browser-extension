import { ProcessedItinerary } from "../../../../shared/types/ProcessedItinerary";
import { getEarliestFlight } from "./getEarliestFlight";
import { getFlights } from "./getFlights";
import { getIncrement } from "./getIncrement";
import { getIntervals } from "./getIntervals";
import { getLatestFlight } from "./getLatestFlight";
import { getTableTimeBounds } from "./getTableTimeBounds";

export const getIntervalInfo = (
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

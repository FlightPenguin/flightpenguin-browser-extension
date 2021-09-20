import { MissingElementLookupError } from "../../shared/errors";
import { sendFlightsEvent, sendReturnFlightsEvent } from "../../shared/events";
import { FlightDetails } from "../../shared/types/FlightDetails";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { FlightMap } from "./constants";
import { getFlightDetails } from "./getFlightDetails";

const FARE_PARENT_CONTAINER_SELECTOR = "div.trip-cost";

export const sendFlights = async (
  flightCards: Node[],
  flightMap: FlightMap,
  selectedFlight = null,
): Promise<FlightMap> => {
  const flights = [] as UnprocessedFlightSearchResult[];
  const newlyVisitedIds: FlightMap = {};

  for (const node of flightCards) {
    const flightCard = node as HTMLElement;
    if (shouldSkipCard(flightCard)) {
      continue;
    }

    const flightDetails = await getFlightDetails(flightCard);
    const [departureFlight, returnFlight] = selectedFlight ? [selectedFlight, flightDetails] : [flightDetails, null];
    const fare = getFare(flightCard);
    const flightPenguinId = getFlightDatasetId(flightDetails);
    const skiplaggedShortId = getFlightCardShortId(flightCard);

    flightCard.dataset.fpid = flightPenguinId;
    flightCard.dataset.visited = "true";

    flights.push({
      departureFlight,
      returnFlight,
      fare,
    });
    newlyVisitedIds[flightPenguinId] = { skiplaggedId: skiplaggedShortId, lastUpdatedAt: new Date() };
  }

  const sendFlightsFunc = selectedFlight ? sendReturnFlightsEvent : sendFlightsEvent;
  if (flights.length) {
    sendFlightsFunc("skiplagged", flights);
  }

  return newlyVisitedIds;
};

const shouldSkipCard = (flightCard: HTMLElement) => {
  const denyListTerms = ["bargain fare", "special fare", "after booking"];
  return (
    Array.from(flightCard.classList).includes("skip-trip") ||
    denyListTerms.some((term) => flightCard.textContent?.includes(term))
  );
};

const getFlightDatasetId = (flight: FlightDetails) => {
  return [flight.fromTime, flight.toTime, flight.marketingAirline].join("-");
};

const getFare = (flightCard: HTMLElement) => {
  const fareWrapper = flightCard.querySelector(FARE_PARENT_CONTAINER_SELECTOR);
  if (!fareWrapper) {
    throw new MissingElementLookupError("Unable to find fare wrapper");
  }

  const fareContainer = fareWrapper.querySelector("p");
  if (!fareContainer) {
    throw new MissingElementLookupError("Unable to find fare container");
  }

  return fareContainer.textContent;
};

const getFlightCardShortId = (flightCard: HTMLElement) => {
  return flightCard.id.split('"key":')[1].split(",")[0].replace(/\W/g, "").trim();
};

import { MissingElementLookupError } from "../../shared/errors";
import { sendFlightsEvent, sendReturnFlightsEvent } from "../../shared/events";
import { Flight } from "../../shared/types/Flight";
import { FlightDetails } from "../../shared/types/FlightDetails";
import { FlightMap } from "./constants";
import { getFlightDetails } from "./getFlightDetails";

const FARE_PARENT_CONTAINER_SELECTOR = "div.trip-cost";

export const sendFlights = async (
  flightCards: Node[],
  visitedFlightCardIds: string[],
  selectedFlight = null,
): Promise<FlightMap> => {
  const flights = [] as Flight[];
  const newlyVisitedIds: { [key: string]: string } = {};

  for (const node of flightCards) {
    const flightCard = node as HTMLElement;
    if (shouldSkipCard(flightCard, visitedFlightCardIds)) {
      continue;
    }

    const flightDetails = await getFlightDetails(flightCard);
    const [departureFlight, returnFlight] = selectedFlight ? [selectedFlight, flightDetails] : [flightDetails, null];
    const fare = getFare(flightCard);

    const flightPenguinId = getFlightDatasetId(flightDetails);

    flightCard.dataset.fpid = flightPenguinId;
    flightCard.dataset.visited = "true";
    flights.push({
      departureFlight,
      returnFlight,
      fare,
    });
    newlyVisitedIds[flightPenguinId] = flightCard.id.split("|")[0].trim(); // todo: use trip name from ua1234
    if (selectedFlight) {
      sendReturnFlightsEvent("skiplagged", flights);
    } else {
      sendFlightsEvent("skiplagged", flights);
    }
  }

  return newlyVisitedIds;
};

const shouldSkipCard = (flightCard: HTMLElement, visitedCardIds: string[]) => {
  const denyListTerms = ["bargain fare", "special fare", "after booking"];
  return denyListTerms.some((term) => flightCard.textContent?.includes(term)) || visitedCardIds.includes(flightCard.id);
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

import { MissingElementLookupError } from "../../shared/errors";
import { Flight } from "../../shared/types/Flight";
import { FlightDetails } from "../../shared/types/FlightDetails";
import { waitForAppearance } from "../../shared/utilities/waitFor";
import { getFlightDetails } from "./getFlightDetails";

const CONTAINER_SHELL_SELECTOR = "section #trip-list-wrapper";
const SORT_BUTTON_SELECTOR = "[data-sort='cost']";
const NO_RESULTS_SELECTOR = ""; // TODO: Figure out
const FLIGHT_CARD_SELECTOR = "div[class='trip']";
const FARE_PARENT_CONTAINER_SELECTOR = "div.trip-cost";

export const getFlights = async (selectedFlight = null) => {
  await waitForAppearance(3000, CONTAINER_SHELL_SELECTOR);
  await waitForAppearance(10_000, SORT_BUTTON_SELECTOR);

  const flights: Flight[] = [];
  if (isNoResults()) {
    return flights;
  }

  const flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
  for (const flightCard of flightCards) {
    if (shouldSkipCard(flightCard)) {
      continue;
    }

    const flightDetails = await getFlightDetails(flightCard);
    const [departureFlight, returnFlight] = selectedFlight ? [selectedFlight, flightDetails] : [flightDetails, null];
    const fare = getFare(flightCard);

    flightCard.dataset.fpid = getFlightDatasetId(flightDetails);
    flights.push({
      departureFlight,
      returnFlight,
      fare,
    });
  }
};

const isNoResults = () => {
  return !!document.querySelector(NO_RESULTS_SELECTOR);
};

const shouldSkipCard = (flightCard: HTMLElement) => {
  const denyListTerms = ["bargain fare", "special fare", "after booking"];
  return denyListTerms.some((term) => flightCard.textContent?.includes(term));
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

import { waitForTheElementToDisappear } from "wait-for-the-element";

import { LoadingTimeoutParserError, MissingElementLookupError } from "../../shared/errors";
import { FlightDetails } from "../../shared/types/FlightDetails";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { waitForAppearance, waitForDisappearance } from "../../shared/utilities/waitFor";
import { closeFlightDetailsModal } from "../ui/closeFlightDetailsModal";
import { getFlight } from "./getFlight";
import { getFlightDetailsModal } from "./getFlightDetailsModal";

const CONTAINER_SHELL_SELECTOR = "[data-test-id='search-results']";
const LOADING_BAR_SELECTOR = ".uitk-loading-bar-current";
const RETURN_FLIGHT_LINK_SELECTOR = ".uitk-progress-indicator-step-details-wrapper > a";
const INITIAL_LOADING_ANIMATION_SELECTOR = "[data-test-id='loading-animation']";
const SECOND_LOADING_ANIMATION_SELECTOR = "[data-test-id='loading-more-flights']";
const NO_RESULTS_SELECTOR = ".uitk-empty-state";
const SHOW_MORE_BUTTON_SELECTOR = "[name='showMoreButton']";
const FLIGHT_CARD_SELECTOR = "[data-test-id='offer-listing']";
const MODAL_FARE_SELECTOR = "[data-test-id='fare-types-carousel'] .uitk-lockup-price";
const LIST_CARD_FARE_SELECTOR = ".uitk-price-subtext";

export const getFlights = async (
  selectedFlight = null,
  loadingTimeout = 75000,
  formData: FlightSearchFormData,
): Promise<UnprocessedFlightSearchResult[]> => {
  // beware - make sure you're on the right page before waiting for elements to go away...
  await waitForAppearance(loadingTimeout, CONTAINER_SHELL_SELECTOR);
  if (selectedFlight) {
    await waitForAppearance(loadingTimeout, RETURN_FLIGHT_LINK_SELECTOR);
  }

  // to all our horror, expedia has a very large number of loading components that fire sequentially...
  await waitForDisappearance(loadingTimeout, LOADING_BAR_SELECTOR);
  await waitForDisappearance(loadingTimeout, INITIAL_LOADING_ANIMATION_SELECTOR);
  await waitForDisappearance(loadingTimeout, SECOND_LOADING_ANIMATION_SELECTOR);

  if (isNoResults()) {
    return [];
  }

  await showMoreFlights();

  const flights = [];
  const flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
  for (const flightCard of flightCards) {
    if (shouldSkipCard(flightCard)) {
      continue;
    }

    const flight = await getFlight(flightCard, formData, !!selectedFlight);

    let departureFlight = null;
    let returnFlight = null;
    let fare = null;

    if (selectedFlight) {
      departureFlight = selectedFlight;
      returnFlight = flight;
      fare = await getListFare(flightCard);
    } else {
      departureFlight = flight;
      fare = await getModalFare();
    }
    flightCard.dataset.fpid = getFlightDatasetId(flight);

    flights.push({
      departureFlight,
      returnFlight,
      fare,
    });

    closeFlightDetailsModal();
  }
  return flights;
};

const isNoResults = () => {
  return !!document.querySelector(NO_RESULTS_SELECTOR);
};

const showMoreFlights = async (loadingTimeout = 30_000) => {
  const showMoreButton: HTMLElement = document.querySelector(SHOW_MORE_BUTTON_SELECTOR) as HTMLElement;
  if (showMoreButton) {
    showMoreButton.click();
    const loadingIndicator = await waitForTheElementToDisappear(SHOW_MORE_BUTTON_SELECTOR, { timeout: loadingTimeout });
    if (!loadingIndicator) {
      throw new LoadingTimeoutParserError("Took longer than ${loadingTimeout} ms to load the show more flight results");
    }
  }
};

const getModalFare = async () => {
  const modal = await getFlightDetailsModal();
  const fare = modal.querySelector(MODAL_FARE_SELECTOR);
  if (!fare) {
    throw new MissingElementLookupError("Unable to find fare in modal");
  }

  return fare.textContent;
};

const getListFare = async (flightCard: HTMLElement) => {
  const fare = flightCard.querySelector(LIST_CARD_FARE_SELECTOR);
  if (!fare) {
    throw new MissingElementLookupError("Unable to find fare in card");
  }

  return fare.textContent;
};

const shouldSkipCard = (flightCard: HTMLElement) => {
  const denyListTerms = ["bargain fare", "special fare", "after booking"];
  return denyListTerms.some((term) => flightCard.textContent?.includes(term));
};

const getFlightDatasetId = (flight: FlightDetails) => {
  return [flight.fromTime, flight.toLocalTime, flight.marketingAirline].join("-");
};

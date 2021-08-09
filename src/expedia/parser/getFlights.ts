import { waitForTheElementToDisappear } from "wait-for-the-element";

import { LoadingTimeoutParserError, MissingElementLookupError } from "../../shared/errors";
import { closeFlightDetailsModal } from "../ui/closeFlightDetailsModal";
import { getFlight } from "./getFlight";
import { getFlightDetailsModal } from "./getFlightDetailsModal";

const INITIAL_LOADING_ANIMATION_SELECTOR = "[data-test-id='loading-animation']";
const SECOND_LOADING_ANIMATION_SELECTOR = "[data-test-id='loading-more-flights']";
const NO_RESULTS_SELECTOR = ".uitk-empty-state";
const SHOW_MORE_BUTTON_SELECTOR = "[name='showMoreButton']";
const FLIGHT_CARD_SELECTOR = "[data-test-id='offer-listing']";
const MODAL_FARE_SELECTOR = "[data-test-id='fare-types-carousel'] .uitk-lockup-price";
const LIST_CARD_FARE_SELECTOR = ".uitk-price-subtext";

export const getFlights = async (selectedFlight = null, loadingTimeout = 30_000) => {
  await waitForLoadingIndicator(loadingTimeout, INITIAL_LOADING_ANIMATION_SELECTOR);
  await waitForLoadingIndicator(loadingTimeout, SECOND_LOADING_ANIMATION_SELECTOR);

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

    const flight = await getFlight(flightCard);

    let departureFlight = null;
    let returnFlight = null;
    let fare = null;

    if (selectedFlight) {
      departureFlight = selectedFlight;
      returnFlight = flight;
      fare = await getListFare(flightCard);
    } else {
      flightCard.dataset.fpid = getFlightDatasetId(flight);
      departureFlight = flight;
      fare = await getModalFare();
    }

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

const waitForLoadingIndicator = async (loadingTimeout: number, selector: string) => {
  if (document.querySelector(selector)) {
    const loadingIndicator = await waitForTheElementToDisappear(selector, {
      timeout: loadingTimeout,
    });
    if (!loadingIndicator) {
      throw new LoadingTimeoutParserError(
        `Took longer than ${loadingTimeout} ms to make the loading indicator (${selector}) disappear`,
      );
    }
  }
};

const shouldSkipCard = (flightCard: HTMLElement) => {
  const denyListTerms = ["bargain fare", "special fare", "after booking"];
  return denyListTerms.some((term) => flightCard.textContent?.includes(term));
};

const getFlightDatasetId = (flight: any) => {
  return [flight.fromTime, flight.toTime, flight.marketingAirline].join("-");
};

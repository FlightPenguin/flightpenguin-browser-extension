import { FlightDetails } from "../../shared/types/FlightDetails";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { waitForAppearance } from "../../shared/utilities/waitFor";
import { handleCaptcha } from "../ui/handleCaptcha";
import { getFlight } from "./getFlight";

const CAPTCHA_SELECTOR = "#px-captcha";
const NO_RESULTS_SELECTOR = "div[class*=FallbackNoResults_container]";
const RESULTS_SELECTOR = "span[class*=SummaryInfo_itineraryCountContainer]";
const FLIGHT_CARD_SELECTOR = "[class*='FlightsTicket_container'] [role='button']:not([data-visited='true'])";

export const getUnsentFlights = async (
  formData: FlightSearchFormData,
  loadingTimeout = 30_000,
): Promise<UnprocessedFlightSearchResult[]> => {
  await waitForAppearance(loadingTimeout, "body");
  if (isCaptcha()) {
    handleCaptcha();
  }

  await waitForAppearance(loadingTimeout, RESULTS_SELECTOR);
  if (isNoResults()) {
    return [];
  }

  const flights = [];
  const flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLElement>;
  for (const flightCard of flightCards) {
    if (shouldSkipCard(flightCard)) {
      continue;
    }

    const flight = await getFlight(flightCard, formData);
    setFlightId(flightCard, flight);
    flights.push(flight);
  }
  return flights;
};

const isCaptcha = () => {
  return !!document.querySelector(CAPTCHA_SELECTOR);
};

const isNoResults = () => {
  return !!document.querySelector(NO_RESULTS_SELECTOR);
};

const shouldSkipCard = (flightCard: HTMLElement) => {
  const denyListTerms = ["sponsored"];
  return denyListTerms.some((term) => flightCard.textContent?.includes(term));
};

const setFlightId = (flightCard: HTMLElement, flight: UnprocessedFlightSearchResult) => {
  const departureId = getFlightDatasetId(flight.departureFlight as FlightDetails);
  let flightId = `${departureId}`;
  if (flight.returnFlight) {
    const returnId = getFlightDatasetId(flight.returnFlight as FlightDetails);
    flightId = `${departureId}-${returnId}`;
  }

  flightCard.dataset.fpid = flightId;
};

const getFlightDatasetId = (flight: FlightDetails) => {
  return [flight.fromTime, flight.toLocalTime, flight.marketingAirline].join("-");
};

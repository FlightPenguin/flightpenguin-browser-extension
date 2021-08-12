import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";
import { standardizeTimeString } from "../../shared/helpers";
import AirlineMap from "../../shared/nameMaps/airlineMap";
import { Flight } from "../../shared/types/Flight";
import { getLayovers } from "./getLayovers";

const FARE_SELECTOR =
  "[class*='TotalPrice_totalPriceContainer'],[class*='Price_mainPriceContainer'],[class*='CardPrice_totalPrice']";
const DETAILS_SELECTOR = "[class*='UpperTicketBody_leg__']";
const MARKETING_AIRLINE_CONTAINER_SELECTOR = "[class*='LogoImage_container__']";
const OPERATING_AIRLINE_CONTAINER_SELECTOR = "[class*='Operators_operator']";
const TIME_CONTAINER_SELECTOR = "span[class*='LegInfo_routePartialTime__']";
const DURATION_CONTAINER_SELECTOR = "span[class*='Duration_duration']";

const STOP_REGEX = /\d{1,2} stop/;

export const getFlight = async (flightCard: HTMLElement): Promise<Flight> => {
  const fare = getFare(flightCard);

  const { departureLayovers, returnLayovers } = isNonstop(flightCard)
    ? { departureLayovers: [], returnLayovers: [] }
    : await getLayovers(flightCard);

  const departureFlight = getFlightDetails(flightCard, "DEPARTURE");
  const returnFlight = getFlightDetails(flightCard, "ARRIVAL");

  setFlightCardVisited(flightCard);
  return {
    departureFlight: { ...departureFlight, layovers: departureLayovers },
    returnFlight: { ...returnFlight, layovers: returnLayovers },
    fare,
  } as Flight;
};

const setFlightCardVisited = (flightCard: HTMLElement) => {
  flightCard.dataset.visited = "true";
};

const getFare = (flightCard: HTMLElement) => {
  const fare = flightCard.querySelector(FARE_SELECTOR);
  if (!fare) {
    throw new MissingElementLookupError("Unable to find fare in card");
  }

  return fare.textContent;
};

const isNonstop = (flightCard: HTMLElement) => {
  return !STOP_REGEX.test(flightCard.textContent || "");
};

const getFlightDetails = (flightCard: HTMLElement, type: "DEPARTURE" | "ARRIVAL") => {
  const index = type === "DEPARTURE" ? 0 : 1;
  const flightContainer = flightCard.querySelectorAll(DETAILS_SELECTOR)[index] as HTMLElement;
  if (!flightContainer) {
    throw new MissingElementLookupError(`Unable to locate ${type} container`);
  }

  return {
    marketingAirline: getMarketingAirline(flightContainer),
    operatingAirline: getOperatingAirline(flightContainer),
    fromTime: getFlightTime(flightContainer, "DEPARTURE"),
    toTime: getFlightTime(flightContainer, "ARRIVAL"),
    duration: getDurationTime(flightContainer),
  };
};

const getMarketingAirline = (flightContainer: HTMLElement) => {
  const airlineContainer = flightContainer.querySelector(MARKETING_AIRLINE_CONTAINER_SELECTOR) as HTMLElement;
  if (!airlineContainer) {
    throw new MissingElementLookupError("Unable to locate marketing airline container");
  }

  let rawAirlineName = airlineContainer.textContent?.trim();
  if (!rawAirlineName) {
    const airlineLogo = airlineContainer.querySelector("img") as HTMLImageElement;
    if (airlineLogo.alt) {
      rawAirlineName = airlineLogo.alt;
    }
    if (!rawAirlineName) {
      throw new MissingFieldParserError("Unable to extract marketing airline name");
    }
  }

  return AirlineMap.getAirlineName(rawAirlineName);
};

const getOperatingAirline = (flightContainer: HTMLElement) => {
  const airlineContainer = flightContainer.querySelector(OPERATING_AIRLINE_CONTAINER_SELECTOR) as HTMLElement;
  if (!airlineContainer) {
    if (flightContainer.textContent?.toLowerCase().includes("operated by")) {
      throw new MissingElementLookupError("Unable to locate operating airline container");
    } else {
      return null;
    }
  }

  const rawAirlineName = airlineContainer.textContent?.trim();
  if (!rawAirlineName) {
    throw new MissingFieldParserError("Unable to extract operating airline name");
  }

  return AirlineMap.getAirlineName(rawAirlineName);
};

const getFlightTime = (flightContainer: HTMLElement, type: "DEPARTURE" | "ARRIVAL") => {
  const index = type === "DEPARTURE" ? 0 : 1;
  const timeContainer = flightContainer.querySelectorAll(TIME_CONTAINER_SELECTOR)[index] as HTMLElement;
  if (!timeContainer) {
    throw new MissingElementLookupError(`Unable to find ${type} time container`);
  }

  const timeText = timeContainer.textContent?.trim();
  if (!timeText) {
    throw new MissingElementLookupError(`Unable to determine ${type} time`);
  }

  return standardizeTimeString(timeText);
};

const getDurationTime = (flightContainer: HTMLElement) => {
  const timeContainer = flightContainer.querySelector(DURATION_CONTAINER_SELECTOR) as HTMLElement;
  if (!timeContainer) {
    throw new MissingElementLookupError(`Unable to find duration time container`);
  }

  const duration = timeContainer.textContent?.trim();
  if (!duration) {
    throw new MissingElementLookupError(`Unable to determine duration time`);
  }

  return duration;
};

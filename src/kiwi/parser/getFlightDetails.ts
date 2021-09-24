import { format, parseISO } from "date-fns";

import { FlightType } from "../../background/constants";
import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";
import { FlightDetails } from "../../shared/types/FlightDetails";
import { FlightLeg } from "../../shared/types/FlightLeg";
import { getExcessDays } from "../shared/getExcessDays";

const DURATION_CONTAINER_SELECTOR = 'div[data-test="TripDurationBadge"]';
const ITINERARY_CONTAINER_SELECTOR = 'div[class*="ResultCardItinerarystyled__ResultCardSection"]';

export const getFlightDetails = (
  flightCard: HTMLDivElement,
  flightType: FlightType,
  layovers: FlightLeg[],
): FlightDetails => {
  const duration = getDuration(flightCard, flightType);

  const { departureDate, departureTime } = getDepartureTime(flightCard, flightType);
  const { arrivalTime } = getArrivalTime(flightCard, flightType, departureDate);
  const airline = getOperatingAirline(layovers);

  return new FlightDetails({
    fromTime: departureTime,
    toTime: arrivalTime,
    marketingAirline: airline,
    duration: duration,
    layovers: layovers,
  });
};

const getDepartureTime = (
  flightCard: HTMLDivElement,
  flightType: FlightType,
): { departureDate: Date; departureTime: string } => {
  const itineraryContainer = getItineraryContainer(flightCard, flightType);

  const timeElements = itineraryContainer.querySelectorAll("time");
  if (![4, 5].includes(timeElements.length)) {
    throw new MissingElementLookupError(`Unable to find ${flightType} trip datetime element`);
  }

  const timeElement = timeElements[1];
  const departureDate = parseISO(timeElement.dateTime);
  return { departureDate, departureTime: format(departureDate, "h:mmaaa") };
};

const getArrivalTime = (
  flightCard: HTMLDivElement,
  flightType: FlightType,
  departureDate: Date,
): { arrivalDate: Date; arrivalTime: string } => {
  const itineraryContainer = getItineraryContainer(flightCard, flightType);

  const timeElements = itineraryContainer.querySelectorAll("time");
  if (![4, 5].includes(timeElements.length)) {
    throw new MissingElementLookupError(`Unable to find ${flightType} trip datetime element`);
  }

  const timeElement = timeElements[3];
  const arrivalDate = parseISO(timeElement.dateTime);
  let arrivalTime = format(arrivalDate, "h:mmaaa");
  const excessDays = getExcessDays(departureDate, arrivalDate);
  if (excessDays) {
    arrivalTime += `+${excessDays}`;
  }
  return { arrivalTime, arrivalDate };
};

const getDuration = (flightCard: HTMLDivElement, flightType: FlightType): string => {
  const index = flightType === "RETURN" ? 1 : 0;

  const durationContainers = flightCard.querySelectorAll(DURATION_CONTAINER_SELECTOR);
  if (durationContainers.length !== 2) {
    throw new MissingElementLookupError("Unable to locate duration sections properly");
  }

  const durationContainer = durationContainers[index];
  const duration = durationContainer.textContent;
  if (!duration) {
    throw new MissingFieldParserError("Unable to extract duration");
  }

  return duration;
};

const getOperatingAirline = (layovers: FlightLeg[]): string => {
  const airlines = Array.from(new Set(layovers.map((layover) => layover.operatingAirline)));
  return airlines.join(", ");
};

const getItineraryContainer = (flightCard: HTMLDivElement, flightType: FlightType): HTMLDivElement => {
  const index = flightType === "RETURN" ? 1 : 0;
  const itineraryContainers = flightCard.querySelectorAll(ITINERARY_CONTAINER_SELECTOR) as NodeListOf<HTMLDivElement>;
  if (itineraryContainers.length !== 2) {
    throw new MissingElementLookupError("Unexpected number of itinerary containers");
  }
  return itineraryContainers[index];
};

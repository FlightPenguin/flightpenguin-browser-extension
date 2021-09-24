import { FlightType } from "../../background/constants";
import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";
import { FlightDetails } from "../../shared/types/FlightDetails";
import { FlightLeg } from "../../shared/types/FlightLeg";

const DURATION_CONTAINER_SELECTOR = 'div[data-test="TripDurationBadge"]';

export const getFlightDetails = (
  flightCard: HTMLDivElement,
  flightType: FlightType,
  layovers: FlightLeg[],
): FlightDetails => {
  const duration = getDuration(flightCard, flightType);

  const departureTime = layovers[0].fromTime;
  const returnTime = layovers.slice(-1)[0].toTime;
  const airline = getOperatingAirline(layovers);

  return new FlightDetails({
    fromTime: departureTime,
    toTime: returnTime,
    marketingAirline: airline,
    operatingAirline: airline,
    duration: duration,
    layovers: layovers,
  });
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

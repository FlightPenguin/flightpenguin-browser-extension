import { getFare } from "./getFare";
import { getFlightDuration } from "./getFlightDuration";
import { getFlightTimes } from "./getFlightTimes";
import { getMarketingAirlineName } from "./getMarketingAirlineName";

interface FlightCardData {
  arrivalTime: string;
  departureTime: string;
  duration: string;
  marketingAirline: string;
}

interface FlightsCardData {
  departure: FlightCardData;
  return?: FlightCardData;
  fare: string;
}

const DETAILS_CONTAINER_SELECTOR = "div.flight-info";

export const getFlightCardData = (flightCard: HTMLDivElement, roundtrip: boolean): FlightsCardData => {
  const { fare } = getFare(flightCard);

  const [departureContainer, returnContainer] = flightCard.querySelectorAll(DETAILS_CONTAINER_SELECTOR);

  if (!!returnContainer && !roundtrip) {
    throw new Error("WTF, have return container but one way flight");
  }

  if (!returnContainer && roundtrip) {
    throw new Error("WTF, have no return container but roundtrip flight");
  }

  return roundtrip
    ? {
        departure: getFlightContainerDetails(departureContainer as HTMLDivElement),
        return: getFlightContainerDetails(returnContainer as HTMLDivElement),
        fare,
      }
    : { departure: getFlightContainerDetails(departureContainer as HTMLDivElement), fare };
};

const getFlightContainerDetails = (container: HTMLDivElement): FlightCardData => {
  const { arrivalTime, departureTime } = getFlightTimes(container);
  const { duration } = getFlightDuration(container);
  const { marketingAirline } = getMarketingAirlineName(container);

  return { arrivalTime, departureTime, duration, marketingAirline };
};

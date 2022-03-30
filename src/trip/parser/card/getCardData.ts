import { getFlightId } from "../../../shared/parser/getFlightId";
import { getDuration } from "./getDuration";
import { getFare } from "./getFare";
import { getFlightTimes } from "./getFlightTimes";
import { getMarketingAirlineName } from "./getMarketingAirlineName";

interface FlightCardData {
  arrivalTime: string;
  departureTime: string;
  duration: string;
  marketingAirline: string;
  id: string;
}

interface FlightsCardData {
  departure: FlightCardData;
  return?: FlightCardData;
  fare: string;
}

const DETAILS_CONTAINER_SELECTOR = "div.flight-info";

export const getCardData = (flightCard: HTMLDivElement, roundtrip: boolean): FlightsCardData => {
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
  const { duration } = getDuration(container);
  const { marketingAirline } = getMarketingAirlineName(container);
  const id = getFlightId({ arrivalTime, departureTime, airlineName: marketingAirline });

  return { arrivalTime, departureTime, duration, id, marketingAirline };
};

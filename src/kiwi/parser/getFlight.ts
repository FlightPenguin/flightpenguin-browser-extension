import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { getFlightPenguinId } from "../shared/getFlightPenguinId";
import { getAllLayovers } from "./getAllLayovers";
import { getFlightDetails } from "./getFlightDetails";

const FARE_ELEMENT_SELECTOR = "strong[class*='PriceText']";

interface GetFlightProps {
  flightCard: HTMLDivElement;
  formData: FlightSearchFormData;
}

export const getFlight = async ({ flightCard, formData }: GetFlightProps): Promise<UnprocessedFlightSearchResult> => {
  const fare = getFare(flightCard);

  const { departureLayovers, returnLayovers } = await getAllLayovers({ flightCard, roundtrip: formData.roundtrip });

  const departureFlight = getFlightDetails(flightCard, "DEPARTURE", departureLayovers, formData);
  const returnFlight = formData.roundtrip ? getFlightDetails(flightCard, "RETURN", returnLayovers, formData) : null;

  const id = getFlightPenguinId(departureFlight.id, formData.roundtrip && returnFlight ? returnFlight.id : null);
  setFlightId(flightCard, id);

  return {
    id,
    departureFlight,
    returnFlight,
    fare,
  } as UnprocessedFlightSearchResult;
};

const getFare = (flightCard: HTMLDivElement): string => {
  const fareContainer = flightCard.querySelector(FARE_ELEMENT_SELECTOR);
  if (!fareContainer) {
    throw new MissingElementLookupError("Unable to find fare container");
  }

  const fare = fareContainer.textContent?.replace(/\s+/g, "");
  if (!fare) {
    throw new MissingFieldParserError(`Unable to extract fare from ${fareContainer.textContent}`);
  }

  return fare;
};

const setFlightId = (flightCard: HTMLDivElement, id: string) => {
  flightCard.dataset.fpid = id;
  flightCard.dataset.fpVisited = "true";
};

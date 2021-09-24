import { MissingElementLookupError } from "../../shared/errors";

const FLIGHT_CARD_SELECTOR = 'div[data-test="ResultCardWrapper"]';

export const findFlightCard = (id: string): HTMLDivElement => {
  const desiredFlightCardSelector = `${FLIGHT_CARD_SELECTOR}, div[data-fpid="${id}"]`;
  const flightCard = document.querySelector(desiredFlightCardSelector) as HTMLDivElement;
  if (!flightCard) {
    throw new MissingElementLookupError(`Unable to find flight with id ${id}`);
  }
  return flightCard;
};

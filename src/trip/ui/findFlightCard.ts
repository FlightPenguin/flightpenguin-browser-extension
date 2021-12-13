import { MissingElementLookupError } from "../../shared/errors";

export const findFlightCard = (id: string): HTMLDivElement => {
  const desiredFlightCardSelector = `div[data-fpid*='${id}']`;
  const flightCard = document.querySelector(desiredFlightCardSelector) as HTMLDivElement;
  if (!flightCard) {
    throw new MissingElementLookupError(`Unable to find flight with id ${id}`);
  }
  return flightCard;
};

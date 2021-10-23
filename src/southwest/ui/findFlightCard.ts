import { MissingElementLookupError } from "../../shared/errors";

export const findFlightCard = (id: string): HTMLDivElement => {
  const desiredFlightCardSelector = `li[data-fpid="${id}"]`;
  console.log(desiredFlightCardSelector);
  const flightCard = document.querySelector(desiredFlightCardSelector) as HTMLDivElement;
  if (!flightCard) {
    throw new MissingElementLookupError(`Unable to find flight with id ${id}`);
  }
  return flightCard;
};

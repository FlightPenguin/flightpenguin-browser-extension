import { MissingElementLookupError } from "../../shared/errors";

export const findFlightCard = (indexValue: string): HTMLDivElement => {
  const desiredFlightCardSelector = `div[data-index*='${indexValue}']`;
  const flightCard = document.querySelector(desiredFlightCardSelector) as HTMLDivElement;
  if (!flightCard) {
    throw new MissingElementLookupError(`Unable to find flight with index value ${indexValue}`);
  }
  return flightCard;
};

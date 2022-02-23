import { MissingElementLookupError } from "../../shared/errors";

export const findFlightCard = (indexValue: string): HTMLDivElement => {
  const desiredShoppingElementSelector = `div[data-shoppingid='${indexValue}']`;
  const shoppingElement = document.querySelector(desiredShoppingElementSelector) as HTMLDivElement;
  if (!shoppingElement) {
    throw new MissingElementLookupError(`Unable to find flight with shopping id ${indexValue}`);
  }

  const flightCard = shoppingElement.closest("div[data-testid*='u-flight-card']") as HTMLDivElement;
  if (!flightCard) {
    throw new MissingElementLookupError(`Unable to find flight card for shopping id ${indexValue}`);
  }
  return flightCard;
};

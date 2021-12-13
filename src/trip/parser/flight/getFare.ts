import { MissingElementLookupError, MissingFieldParserError } from "../../../shared/errors";

const FARE_ELEMENT_SELECTOR = "span.o-price-flight";

export const getFare = (flightCard: HTMLDivElement): { fare: string } => {
  const fareElement = flightCard.querySelector(FARE_ELEMENT_SELECTOR) as HTMLElement;
  if (!fareElement) {
    throw new MissingElementLookupError("Unable to find fare element");
  }

  const price = fareElement.dataset.price;
  if (!price) {
    throw new MissingFieldParserError("Unable to extract price");
  }

  return { fare: `${Math.ceil(Number(price))}` };
};

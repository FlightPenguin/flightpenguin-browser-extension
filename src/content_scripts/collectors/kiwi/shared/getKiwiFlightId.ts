import { MissingElementLookupError, MissingFieldParserError } from "../../../../shared/errors";

const INNER_FLIGHT_CARD_WRAPPER_SELECTOR = "div[class*='ResultCardstyled__ResultCardInner']";

export const getKiwiFlightId = (flightCard: HTMLDivElement): string => {
  const innerContainer = flightCard.querySelector(INNER_FLIGHT_CARD_WRAPPER_SELECTOR) as HTMLDivElement;
  if (!innerContainer) {
    throw new MissingElementLookupError("Unable to find inner flight card wrapper");
  }

  if (!innerContainer.dataset.test) {
    throw new MissingFieldParserError("Unable to extract kiwi id");
  }

  return innerContainer.dataset.test;
};

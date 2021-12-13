import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";

const TOTAL_FLIGHTS_CONTAINER_SELECTOR = "span.total";

export const isComplete = (flightCard: HTMLDivElement): boolean => {
  const processedFlightCount = getCurrentFlightNumber(flightCard);
  const totalExpectedFlights = getFlightTotal();

  return processedFlightCount >= totalExpectedFlights;
};

const getFlightTotal = (): number => {
  const totalContainer = document.querySelector(TOTAL_FLIGHTS_CONTAINER_SELECTOR);
  if (!totalContainer) {
    throw new MissingElementLookupError("Unable to find total number of flights container");
  }

  const numericText = totalContainer.textContent?.replace(/^\D+/g, "");
  if (!numericText) {
    throw new MissingFieldParserError("Unable to extract total number of flights text");
  }

  return Number(numericText);
};

const getCurrentFlightNumber = (flightCard: HTMLDivElement): number => {
  const index = flightCard.dataset.index;
  if (!index) {
    throw new Error("No index on flight card...");
  }

  return Number(index) + 1;
};

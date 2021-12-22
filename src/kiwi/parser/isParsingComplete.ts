import { waitForAppearance } from "../../shared/utilities/waitFor";

const FLIGHT_CARDS_SELECTOR = 'div[data-test="ResultCardWrapper"]';
const VISITED_SELECTOR = '[data-fp-visited="true"]';
const PLACEHOLDER_CARD_SELECTOR = 'div[data-test="ResultCardPlaceholder"]';
const NO_MORE_RESULTS_SELECTOR = 'div[class*="ShowMoreButtonstyled__AllResults"]';

export const isComplete = async (flightCard: HTMLDivElement): Promise<boolean> => {
  const flightContainer = flightCard.parentElement as HTMLDivElement;
  const processedFlightCount = getProcessedFlightTotal(flightContainer);

  if (processedFlightCount >= 80) {
    return true;
  }

  const showMoreButton = getShowMoreButton(flightContainer);
  if (!showMoreButton) {
    return true;
  }
  if (isReadyForMoreFlights(flightContainer)) {
    showMoreButton.click();
    const newCard = await waitForAppearance(
      60000,
      `${PLACEHOLDER_CARD_SELECTOR},${FLIGHT_CARDS_SELECTOR}:not(${VISITED_SELECTOR}`,
    );
    newCard.scrollIntoView({
      behavior: "smooth",
      // puts element at top
      block: "start",
      inline: "nearest",
    });
    return false;
  }
  return !!flightContainer.querySelector(NO_MORE_RESULTS_SELECTOR);
};

const getProcessedFlightTotal = (flightContainer: HTMLDivElement): number => {
  const visitedFlightCardsSelector = `${FLIGHT_CARDS_SELECTOR}${VISITED_SELECTOR}`;
  const processedFlightCards = flightContainer.querySelectorAll(visitedFlightCardsSelector);
  return processedFlightCards.length;
};

const isReadyForMoreFlights = (flightContainer: HTMLDivElement): boolean => {
  return flightContainer.querySelectorAll(PLACEHOLDER_CARD_SELECTOR).length <= 4;
};

const getShowMoreButton = (flightContainer: HTMLDivElement): HTMLButtonElement | null => {
  const button = Array.from(flightContainer.querySelectorAll("button")).slice(-1)[0] as HTMLButtonElement;
  const buttonText = button.textContent;
  if (!buttonText) {
    console.debug("Unable to extract text from last flight container button");
    return null;
  }

  return buttonText.toLowerCase().includes("load more") ? button : null;
};

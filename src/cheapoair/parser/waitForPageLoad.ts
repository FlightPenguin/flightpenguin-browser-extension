import { pause } from "../../shared/pause";
import { waitForAppearance } from "../../shared/utilities/waitFor";

const FLIGHT_CARD_SELECTOR = "article[class*='row contract']";
const VISITED_SELECTOR = '[data-fp-visited="true"]';
const ACTIVE_PAGE_NUMBER_SELECTOR = "li[class*='pagination__item is--item-active']";

export const waitForPageLoad = async (): Promise<void> => {
  await waitForAppearance(60000, ACTIVE_PAGE_NUMBER_SELECTOR);
  await waitForAppearance(60000, `${FLIGHT_CARD_SELECTOR}:not(${VISITED_SELECTOR}`);
  await pause(5000);
};

import { waitForAppearance, waitForDisappearance } from "../../shared/utilities/waitFor";

const SEARCH_CONTAINER_SELECTOR = "section.search-results--matrix";
const SEARCH_RESULTS_LOADING_INDICATOR_SELECTOR = "div.price-matrix--loading-detail";
const FLIGHT_CARD_SELECTOR = "li.air-booking-select-detail";

export const waitForLoading = async (): Promise<void> => {
  await waitForAppearance(120000, SEARCH_CONTAINER_SELECTOR);
  await waitForDisappearance(120000, SEARCH_RESULTS_LOADING_INDICATOR_SELECTOR);
  await waitForAppearance(120000, FLIGHT_CARD_SELECTOR);
};

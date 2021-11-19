import { waitForAppearance, waitForDisappearance } from "../../shared/utilities/waitFor";

const UNPROCESSED_FLIGHTS_SELECTOR = "[class*='FlightsTicket_container'] [role='button']:not([data-visited='true'])";

export const getMoreResults = async (loadingTimeout = 30000): Promise<void> => {
  await useShowMoreResultsButton(loadingTimeout);
  window.scrollTo(window.scrollX, document.body.offsetHeight);
  await waitForAppearance(loadingTimeout, UNPROCESSED_FLIGHTS_SELECTOR);
};

const useShowMoreResultsButton = async (loadingTimeout: number) => {
  const button = getShowMoreResultsButton();
  if (!button) {
    return;
  }
  button.classList.add("fp-showMoreResults");
  button.click();

  await waitForDisappearance(loadingTimeout, ".fp-showMoreResults");
};

const getShowMoreResultsButton = () => {
  return Array.from(document.querySelectorAll("button")).find((element) => element.textContent === "Show more results");
};

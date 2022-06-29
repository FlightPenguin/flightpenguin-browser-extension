import { waitForAppearance } from "../../../../shared/utilities/waitFor";

const CONTAINER_SELECTOR = "div[id='searchResultsList']";

export const getResultsContainer = async (): Promise<HTMLDivElement> => {
  return (await waitForAppearance(75000, CONTAINER_SELECTOR)) as HTMLDivElement;
};

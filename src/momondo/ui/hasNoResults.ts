const NO_RESULTS_SELECTOR = "div[class*='Common-Results-NoResults']";

export const hasNoResults = (): boolean => {
  const noResultsContainer = document.querySelector(NO_RESULTS_SELECTOR);
  return (
    !!noResultsContainer &&
    !!noResultsContainer?.textContent &&
    noResultsContainer.textContent.toLowerCase().includes("couldn't find any results")
  );
};

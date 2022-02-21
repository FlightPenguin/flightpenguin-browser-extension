const NO_RESULTS_SELECTOR = "span[data-testid='net_work_txt']";

export const hasNoResults = (): boolean => {
  const noResultsContainer = document.querySelector(NO_RESULTS_SELECTOR);
  return (
    !!noResultsContainer &&
    !!noResultsContainer?.textContent &&
    noResultsContainer.textContent.toLowerCase().includes("no matching results found")
  );
};

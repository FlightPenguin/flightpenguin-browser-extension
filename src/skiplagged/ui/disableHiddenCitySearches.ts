const STANDARD_SELECTOR = "input[data-name='standard']";

export const disableHiddenCitySearches = (): void => {
  const input = document.querySelector(STANDARD_SELECTOR) as HTMLInputElement;
  if (input) {
    const only = input.parentElement?.querySelector(".only") as HTMLElement;
    if (only) {
      only.click();
    }
  }
};

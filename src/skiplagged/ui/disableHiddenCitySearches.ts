const HIDDEN_CITY_SELECTOR = "input[data-name='hiddenCity']";

export const disableHiddenCitySearches = (): void => {
  const input = document.querySelector(HIDDEN_CITY_SELECTOR) as HTMLInputElement;
  if (input) {
    input.click();
  }
};

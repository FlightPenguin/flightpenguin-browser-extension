const BUTTON_SELECTOR = "button.fare-detail--clear-flight";

export const clearSelections = (): void => {
  const buttons = document.querySelectorAll(BUTTON_SELECTOR) as NodeListOf<HTMLButtonElement>;
  buttons.forEach((button) => {
    button.click();
  });
};

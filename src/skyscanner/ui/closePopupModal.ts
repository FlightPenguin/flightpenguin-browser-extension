const MODAL_SELECTOR = "button[class*='close-button']";

export function closePopupModal() {
  const button = document.querySelector(MODAL_SELECTOR) as HTMLButtonElement;
  if (button) {
    button.click();
  }
}

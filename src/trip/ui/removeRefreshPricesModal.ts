const REFRESH_PRICES_MODAL_SELECTOR = "div.refresh-search-tips";

export const removeRefreshPricesModal = () => {
  const innerModalContent = document.querySelector(REFRESH_PRICES_MODAL_SELECTOR);
  if (innerModalContent) {
    const modal = innerModalContent?.parentElement?.parentElement;
    if (modal) {
      modal.remove();
    }
  }
};

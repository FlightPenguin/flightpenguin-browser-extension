const UNRETRIEVED_SELECTOR = "div.list-placeholder";

export const shouldSkipCard = (flightCard: HTMLDivElement): { skip: boolean; hide: boolean } => {
  if (!flightCard.dataset.flightId) {
    return { skip: true, hide: true };
  }
  if (flightCard.querySelector(UNRETRIEVED_SELECTOR)) {
    return { skip: true, hide: false };
  }
  return { skip: false, hide: false };
};

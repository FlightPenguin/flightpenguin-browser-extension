export const scrollToFlightCard = (flightCard: HTMLElement): void => {
  flightCard.scrollIntoView();
  window.scrollBy(0, -400);
};

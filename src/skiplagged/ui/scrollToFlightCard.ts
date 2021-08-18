export const scrollToFlightCard = (flightCard: HTMLElement) => {
  const yPosition = window.pageYOffset + flightCard.getBoundingClientRect().top - window.innerHeight / 2;
  window.scroll(0, yPosition);
};

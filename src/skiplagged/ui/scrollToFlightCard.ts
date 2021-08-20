export const scrollToFlightCard = (flightCard: HTMLElement): void => {
  const yPosition = window.pageYOffset + flightCard.getBoundingClientRect().top - window.innerHeight / 2;
  window.scrollTo({ top: yPosition, behavior: "smooth" });
};

export const scrollToTop = (topPosition = 0): void => {
  window.scrollTo({ top: topPosition, behavior: "smooth" });
};

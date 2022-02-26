export const shouldSkipCard = (flightCard: HTMLElement): boolean => {
  const hasWarningBar = hasGreenBar(flightCard);

  return [hasWarningBar].some((value) => value);
};

const hasGreenBar = (flightCard: HTMLElement): boolean => {
  const hasMark = flightCard.querySelector("mark[class*='greenbar-msg']");
  return !!hasMark;
};

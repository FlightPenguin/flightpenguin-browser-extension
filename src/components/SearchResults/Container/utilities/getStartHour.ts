export const getStartHour = (lowerBound: number): number => {
  return lowerBound < 12 ? 0 : 12;
};

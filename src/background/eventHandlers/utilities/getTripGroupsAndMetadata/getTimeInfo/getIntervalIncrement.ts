export const getIntervalIncrement = (hours: number): number => {
  if (hours > 144) {
    return 12;
  } else if (hours > 72) {
    return 6;
  } else if (hours <= 24) {
    return 2;
  } else {
    return 4;
  }
};

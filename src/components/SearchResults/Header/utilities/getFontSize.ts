export const getFontSize = (intervalCount: number): string => {
  if (intervalCount <= 12) {
    return "200";
  } else if (intervalCount <= 24) {
    return "150";
  } else {
    return "100";
  }
};

export const getIncrement = (intervals: number[]): number => {
  if (!intervals.length) {
    return 0;
  }
  return intervals[1] - intervals[0];
};

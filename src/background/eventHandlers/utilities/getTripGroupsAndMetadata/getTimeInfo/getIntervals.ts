import { differenceInHours } from "date-fns";

export const getIntervals = (earliestTime: Date, latestTime: Date, increment: number): { intervals: number[] } => {
  const hours = differenceInHours(latestTime, earliestTime);

  const intervals: number[] = [];
  let time = earliestTime.getHours();
  const upperBoundary = earliestTime.getHours() + hours;
  while (time <= upperBoundary) {
    intervals.push(time);
    time += increment;
  }
  return { intervals };
};

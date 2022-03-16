import { DisplayableTrip } from "../../../../shared/types/newtypes/DisplayableTrip";

export const getIntervals = (
  startHour: number,
  increment: number,
  maxRowWidth: number,
  upperBound: number,
): number[] => {
  const intervals: number[] = [];
  let time = startHour;

  while (time <= upperBound + increment) {
    intervals.push(time);
    time += increment;
  }
  return intervals;
};

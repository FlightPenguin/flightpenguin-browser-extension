import { addHours, differenceInHours } from "date-fns";

export const getBoundaryTimes = (
  earliestTime: Date,
  latestTime: Date,
  increment: number,
): { lowerBoundary: Date; upperBoundary: Date } => {
  // ensures there is at least one increment of padding
  const lowerBoundary = addHours(earliestTime, increment * -1);
  let upperBoundary = addHours(latestTime, increment);

  // ensure lower/upper boundary fit exactly into intervals
  const hours = differenceInHours(upperBoundary, lowerBoundary);
  if (hours % increment !== 0) {
    upperBoundary = addHours(upperBoundary, hours % increment);
  }

  return { lowerBoundary, upperBoundary };
};

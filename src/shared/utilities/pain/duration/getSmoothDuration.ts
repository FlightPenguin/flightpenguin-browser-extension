import { convertDurationToMinutes } from "../../../../utilityFunctions";

export const getSmoothDuration = (duration: string): number => {
  /*
    Longer flights are... less pleasant than shorter flights.
    The difference between 1h31m and 1h35m is effectively irrelevant.
    Similarly, the difference between 13h14m and 13h44m is irrelevant.
    We should use a sliding step function based on the total duration.
   */
  const durationInMinutes = convertDurationToMinutes(duration);
  const stepSize = getStepSize(durationInMinutes);
  const steps = Math.floor(durationInMinutes / stepSize);
  return steps * stepSize;
};

const getStepSize = (durationInMinutes: number): number => {
  if (durationInMinutes <= 240) {
    return 15;
  } else if (durationInMinutes <= 480) {
    return 30;
  } else {
    return 60;
  }
};

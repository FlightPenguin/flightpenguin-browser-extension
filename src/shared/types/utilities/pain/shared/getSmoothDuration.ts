export const getSmoothDuration = (durationInMinutes: number): number => {
  /*
    Longer flights are... less pleasant than shorter flights.
    The difference between 1h31m and 1h35m is effectively irrelevant.
    Similarly, the difference between 13h11m and 13h19m is irrelevant.
    We should use a sliding step function based on the total duration.
   */
  const stepSize = getStepSize(durationInMinutes);
  return Math.ceil(durationInMinutes / stepSize) * stepSize;
};

const getStepSize = (durationInMinutes: number): number => {
  return durationInMinutes <= 240 ? 5 : 10;
};

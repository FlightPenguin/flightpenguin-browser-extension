interface GetSliderTicksProps {
  intervals: number[];
}

export const ticksPerHour = 4;

export const getSliderTicks = ({ intervals }: GetSliderTicksProps): number => {
  if (!intervals.length) {
    return 0;
  }

  const hours = intervals.slice(-1)[0] - intervals[0];
  return hours * ticksPerHour;
};

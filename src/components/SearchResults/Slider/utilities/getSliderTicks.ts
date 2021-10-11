interface GetSliderTicksProps {
  intervals: number[];
}

export const ticksPerHour = 4;

export const getSliderTicks = ({ intervals }: GetSliderTicksProps): number => {
  const hours = intervals.slice(-1)[0] - intervals[0];
  return hours * ticksPerHour;
};

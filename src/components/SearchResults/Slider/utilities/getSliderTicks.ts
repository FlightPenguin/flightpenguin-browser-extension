interface GetSliderTicksProps {
  intervals: number[];
}

export const ticksPerHour = 4;

export const getSliderTicks = ({ intervals }: GetSliderTicksProps): [number, number] => {
  if (!intervals.length) {
    return [0, 112];
  }

  const hours = intervals.slice(-1)[0] - intervals[0];
  return [intervals[0] * ticksPerHour, hours * ticksPerHour];
};

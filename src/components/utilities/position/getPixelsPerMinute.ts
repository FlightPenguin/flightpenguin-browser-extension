interface GetPixelsPerMinuteProps {
  intervalCount: number;
  increment: number;
  width: number;
}

export const getPixelsPerMinute = ({ intervalCount, increment, width }: GetPixelsPerMinuteProps): number => {
  const totalHours = (intervalCount - 1) * increment;
  const totalMinutes = totalHours * 60;
  return width / totalMinutes;
};

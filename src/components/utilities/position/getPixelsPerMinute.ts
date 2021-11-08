import Decimal from "decimal.js-light";

interface GetPixelsPerMinuteProps {
  intervalCount: number;
  increment: number;
  width: number;
}

export const getPixelsPerMinute = ({ intervalCount, increment, width }: GetPixelsPerMinuteProps): Decimal => {
  const totalHours = new Decimal((intervalCount - 1) * increment);
  const totalMinutes = totalHours.times(60);

  return new Decimal(width).dividedBy(totalMinutes).toDecimalPlaces(2);
};

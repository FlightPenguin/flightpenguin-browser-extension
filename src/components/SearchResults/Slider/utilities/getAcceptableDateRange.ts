import { addHours } from "date-fns";

interface GetAcceptableDateRangeProps {
  intervals: number[];
  startDate: Date;
}

export const getAcceptableDateRange = ({
  intervals,
  startDate,
}: GetAcceptableDateRangeProps): { minimumDate: Date; maximumDate: Date } => {
  if (!intervals.length) {
    return { minimumDate: startDate, maximumDate: startDate };
  }

  const minimumDate = addHours(startDate, intervals[0]);
  const maximumDate = addHours(startDate, intervals.slice(-1)[0]);
  return { minimumDate, maximumDate };
};

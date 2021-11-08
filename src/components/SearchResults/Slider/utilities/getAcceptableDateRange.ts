import { addHours, addMinutes } from "date-fns";

interface GetAcceptableDateRangeProps {
  intervals: number[];
  startDate: Date;
  timezoneOffset: number;
}

export const getAcceptableDateRange = ({
  intervals,
  startDate,
  timezoneOffset,
}: GetAcceptableDateRangeProps): { minimumDate: Date; maximumDate: Date } => {
  if (!intervals.length) {
    return { minimumDate: startDate, maximumDate: startDate };
  }

  const minimumDate = addHours(startDate, intervals[0]);
  const maximumDate = addMinutes(addHours(startDate, intervals.slice(-1)[0]), timezoneOffset);
  return { minimumDate, maximumDate };
};

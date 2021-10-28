import { differenceInDays, startOfDay } from "date-fns";
import { format } from "date-fns-tz";

interface GetTimeStringFromDate {
  date: Date;
  previousFlightDate?: Date;
}

export const getTimeStringFromDate = ({ date, previousFlightDate }: GetTimeStringFromDate): string => {
  let value = format(date, "h:mmaaa");
  if (previousFlightDate) {
    const excessDays = Math.abs(differenceInDays(startOfDay(date), startOfDay(previousFlightDate)));
    if (excessDays) {
      value = `${value}+${excessDays}`;
    }
  }
  return value;
};

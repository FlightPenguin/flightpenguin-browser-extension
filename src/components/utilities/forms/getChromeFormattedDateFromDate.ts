import { format } from "date-fns";

export const getChromeFormattedDateFromDate = (value: Date): string => {
  return format(value, "yyyy-MM-dd");
};

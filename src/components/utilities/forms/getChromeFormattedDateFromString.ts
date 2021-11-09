import { format, parse } from "date-fns";

export const getChromeFormattedDateFromString = (value: string): string => {
  if (value.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
    return format(parse(value, "MM/dd/yyyy", new Date()), "yyyy-MM-dd");
  }
  return value;
};

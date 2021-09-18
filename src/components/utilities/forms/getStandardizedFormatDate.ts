import { format, parse } from "date-fns";

export const getStandardizedFormatDate = (value: string): string => {
  return format(parse(value, "yyyy-MM-dd", new Date()), "MM/dd/yyyy");
};

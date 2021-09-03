import { format, parse } from "date-fns";

export const getChromeFormatDate = (value: string): string => {
  return format(parse(value, "MM/dd/yyyy", new Date()), "yyyy-MM-dd");
};

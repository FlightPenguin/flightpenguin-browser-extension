import { isDate, parse as parseDate } from "date-fns";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getParsedDate = (value: Date | string): Date => {
  const formatString = (value as string).includes("-") ? "yyyy-MM-dd" : "MM/dd/yyyy";
  return isDate(value) ? (value as Date) : parseDate(value as string, formatString, new Date());
};

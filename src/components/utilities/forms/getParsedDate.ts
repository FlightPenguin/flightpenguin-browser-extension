import { isDate, parse as parseDate } from "date-fns";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getParsedDate = (value: Date | string): Date => {
  return isDate(value) ? (value as Date) : parseDate(value as string, getDateStringFormat(value as string), new Date());
};

const getDateStringFormat = (input: string): string => {
  return input.includes("-") ? "yyyy-MM-dd" : "MM/dd/yyyy";
};

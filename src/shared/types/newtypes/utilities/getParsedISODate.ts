import { isDate, parseISO as parseDate } from "date-fns";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getParsedISODate = (value: Date | string): Date => {
  return isDate(value) ? (value as Date) : parseDate(value as string);
};

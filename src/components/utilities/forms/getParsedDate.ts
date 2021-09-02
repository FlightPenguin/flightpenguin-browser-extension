import { isDate, parse as parseDate } from "date-fns";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getParsedDate = (value: unknown, originalValue: unknown): Date | unknown => {
  return isDate(originalValue) ? originalValue : parseDate(originalValue as string, "MM/dd/yyyy", new Date());
};

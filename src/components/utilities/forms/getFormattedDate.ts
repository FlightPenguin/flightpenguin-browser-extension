import { format } from "date-fns";

const DATE_FORMAT = "MM/dd/yyyy";

export const getFormattedDate = (input: Date): string => {
  return format(input, DATE_FORMAT);
};

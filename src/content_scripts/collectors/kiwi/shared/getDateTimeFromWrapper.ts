import { parseISO } from "date-fns";

import { MissingElementLookupError } from "../../../../shared/errors";

export const getDateTimeFromWrapper = (container: HTMLDivElement): Date => {
  const timeElement = container.querySelector("time") as HTMLTimeElement;
  if (!timeElement) {
    throw new MissingElementLookupError("Unable to find datetime element");
  }
  return parseISO(timeElement.dateTime);
};

import { addDays, formatISO } from "date-fns";

import { SELECTION_SUPPRESSION_KEY } from "./constants";

export const setSuppressionFlag = (days: number): void => {
  const now = Date.now();
  const suppressUntil = formatISO(addDays(now, days));
  localStorage.setItem(SELECTION_SUPPRESSION_KEY, suppressUntil);
};

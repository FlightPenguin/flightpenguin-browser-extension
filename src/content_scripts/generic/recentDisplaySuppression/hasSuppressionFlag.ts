import { isBefore, parseISO } from "date-fns";

import { SELECTION_SUPPRESSION_KEY } from "./constants";

export const hasSuppressionFlag = (): boolean => {
  const rawValue = localStorage.getItem(SELECTION_SUPPRESSION_KEY);
  if (rawValue) {
    try {
      const expiryDate = parseISO(rawValue);
      const now = Date.now();
      if (isBefore(now, expiryDate)) {
        return true;
      }
    } catch (e) {
      return false;
    } finally {
      localStorage.removeItem(SELECTION_SUPPRESSION_KEY);
    }
  }
  return false;
};

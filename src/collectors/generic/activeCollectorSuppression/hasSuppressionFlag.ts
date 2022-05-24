import { ACTIVE_SUPPRESSION_KEY } from "./constants";

export const hasSuppressionFlag = (): boolean => {
  const value = sessionStorage.getItem(ACTIVE_SUPPRESSION_KEY);
  if (value) {
    return !!JSON.parse(value);
  }
  return false;
};

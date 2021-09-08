import { addDays, nextFriday, startOfToday } from "date-fns";

export const getFridayAfterNext = (): Date => {
  // Research shows the most common search begins at the 'next' Friday.
  return addDays(nextFriday(startOfToday()), 7);
};

export const hasVisitedRecently = (): boolean => {
  /*
  When this function is called, we leave a trace in session storage indicating that
  someone has visited this domain at a specific time. If the user visits again
  within an hour, we say they have visited recently. We have chosen session storage
  *intentionally* as this disappears on tab closure *and* is tab-isolated, so if
  someone accidently opens two united.com windows at the same time and for some
  reason picks the second, they see the popup.
   */
  const storageKey = `fp-visit-tracker-${window.location.hostname}`;
  const currentTime = new Date().getTime();
  const hourInMillis = 3600000;

  const lastVisit = getLastVisitTime(storageKey);
  if (currentTime - lastVisit <= hourInMillis) {
    return true;
  }
  setLastVisitTime(storageKey, currentTime);
  return false;
};

export const getLastVisitTime = (key: string): number => {
  return Number(JSON.parse(sessionStorage.getItem(key) || "0"));
};

export const setLastVisitTime = (key: string, time: number): void => {
  sessionStorage.setItem(key, time.toString());
};

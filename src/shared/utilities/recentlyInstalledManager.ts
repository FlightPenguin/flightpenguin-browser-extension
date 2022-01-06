export const NEWLY_INSTALLED_KEY = "recentFpInstall";

export const isRecentlyInstalled = (): boolean => {
  return JSON.parse(localStorage.getItem(NEWLY_INSTALLED_KEY) || "false");
};

export const setRecentlyInstalled = (value: boolean): void => {
  localStorage.setItem(NEWLY_INSTALLED_KEY, JSON.stringify(value));
};

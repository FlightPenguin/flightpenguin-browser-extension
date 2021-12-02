const KEY_NAME = "fp-scraper-flag";

export const isScraperFlag = (): boolean => {
  return JSON.parse(sessionStorage.getItem(KEY_NAME) || "false");
};

export const setScraperFlag = (): void => {
  console.log(new Date().getTime());
  sessionStorage.setItem(KEY_NAME, "true");
};

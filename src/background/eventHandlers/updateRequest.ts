import * as browser from "webextension-polyfill";

export const handleUpdateRequest = (): void => {
  browser.runtime.reload();
};

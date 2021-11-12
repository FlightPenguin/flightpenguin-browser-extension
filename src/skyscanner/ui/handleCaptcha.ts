import { MissingElementLookupError } from "../../shared/errors";
import { waitForAppearance } from "../../shared/utilities/waitFor";

const SEARCH_PAGE_SHELL_SELECTOR = "#pagewrap";

export const handleCaptcha = async (doc?: HTMLDocument) => {
  if (!doc) {
    doc = document;
  }
  const iframes = doc.querySelectorAll("iframe");
  if (!iframes) {
    throw new MissingElementLookupError("Unable to locate iframes in captcha page");
  }

  for (let index = 0; index < iframes.length; index++) {
    const testWindow = window[index];
    testWindow.document.body.dispatchEvent(new Event("mousedown"));
  }

  await waitForAppearance(15000, SEARCH_PAGE_SHELL_SELECTOR);
};

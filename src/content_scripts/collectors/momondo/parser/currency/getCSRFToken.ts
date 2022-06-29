import { ParserError } from "../../../../../shared/errors";

const STORAGE_KEY = "fp-formtoken";

export const getCSRFToken = (): string => {
  /* Content Scripts have different execution contexts than the page.
     We need to write a separate script that dumps a safe variable into the DOM to be read.

     https://stackoverflow.com/questions/9515704/use-a-content-script-to-access-the-page-context-variables-and-functions
   */

  const bodyElement = document.getElementsByTagName("body")[0];

  const scriptElement = document.createElement("script");
  scriptElement.innerHTML = `
  function dumpFormToken() {
    const { formtoken } = globals
    
    sessionStorage.setItem("fp-formtoken", formtoken);
    }
  dumpFormToken();
  `;
  bodyElement.appendChild(scriptElement);

  const csrfToken = getCSRFTokenFromLocalStorage();
  scriptElement.remove();
  return csrfToken;
};

const getCSRFTokenFromLocalStorage = (): string => {
  const storageData = sessionStorage.getItem(STORAGE_KEY);
  if (!storageData) {
    throw new ParserError("Unable to get contracts from session storage");
  }
  sessionStorage.removeItem(STORAGE_KEY);
  return storageData;
};

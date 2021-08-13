import { ParserError } from "../errors";
import { waitForAppearance } from "./waitFor";

export const createInvisibleIframe = async (
  parentElement: HTMLElement,
  link: string,
  timeout = 15000,
  id?: string,
  classNames = [] as string[],
): Promise<HTMLDocument> => {
  const iframeElement = document.createElement("iframe");
  let selector = "iframe";
  if (id) {
    iframeElement.id = id;
    selector += `#id`;
  }
  if (classNames) {
    for (const className of classNames) {
      iframeElement.classList.add(className);
      selector += `.${className}`;
    }
  }
  iframeElement.src = link;
  iframeElement.style.display = "none";
  iframeElement.dataset.loaded = "false";
  iframeElement.onload = (event) => {
    if (!(event.target instanceof HTMLIFrameElement)) {
      throw new Error("Unable to resolve iframe");
    }
    event.target.dataset.loaded = "true";
  };
  parentElement.appendChild(iframeElement);

  selector += "[data-loaded='true']";

  const iframe = (await waitForAppearance(timeout, selector)) as HTMLIFrameElement;
  if (!iframe.contentDocument) {
    throw new ParserError("Unable to access content document of iframe");
  }
  return iframe.contentDocument;
};

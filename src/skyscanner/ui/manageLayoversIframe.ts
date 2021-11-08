import { MissingElementLookupError, ParserError } from "../../shared/errors";
import { createInvisibleIframe } from "../../shared/utilities/createInvisibleIframe";
import { waitForDisappearance } from "../../shared/utilities/waitFor";

const IFRAME_CLASSNAME = "invisible_layovers";
const IFRAME_SELECTOR = `.${IFRAME_CLASSNAME}`;
const LINK_SELECTOR = "a[class*='FlightsTicket_link']";
const IFRAME_LOADING_SELECTOR = "[class*='DetailsPanel_loading']";

export const createLayoversIframe = async (flightCard: HTMLElement) => {
  const link = await getLayoversLink(flightCard);
  const iframeDocument = await createInvisibleIframe(flightCard, link, 120000, "", [IFRAME_CLASSNAME]);
  await waitForDisappearance(30000, IFRAME_LOADING_SELECTOR, iframeDocument);
  return iframeDocument;
};

export const deleteLayoversIframe = async (flightCard: HTMLElement): Promise<void> => {
  const iframe = flightCard.querySelector(IFRAME_SELECTOR);
  if (!iframe) {
    return;
  }
  iframe.parentElement?.removeChild(iframe);
  await waitForDisappearance(10000, IFRAME_SELECTOR);
};

const getLayoversLink = async (flightCard: HTMLElement) => {
  const link = flightCard.closest(LINK_SELECTOR) as HTMLLinkElement;
  if (!link) {
    throw new MissingElementLookupError("Unable to find layovers link");
  }

  return link.href;
};

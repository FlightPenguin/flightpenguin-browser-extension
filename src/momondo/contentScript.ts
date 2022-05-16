// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: `${process.env.EXTENSION_ENV}`,
  release: `${process.env.SENTRY_PROJECT}@${process.env.VERSION}`,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  integrations: [new window.Sentry.Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

import { sendFailedScraper, sendItineraryNotFound, sendScraperStarting } from "../shared/events";
import { sendFailed, sendProcessing } from "../shared/events/analytics/scrapers";
import { pollForNoResults } from "../shared/parser/pollForNoResults";
import { addBackToSearchButton } from "../shared/ui/backToSearch";
import { stopScrollingNow } from "../shared/ui/stopScrolling";
import { suppressOfferFlightPenguinPopup } from "../shared/utilities/suppressOfferFlightPenguinPopup";
import { suppressRedirectOfferOnBookingPage } from "./booking/suppressRedirectOfferOnBookingPage";
import { getResultsContainer } from "./parser/getResultsContainer";
import { ItineraryObserver } from "./parser/observer";
import { hasNoResults } from "./ui/hasNoResults";
import { highlightItineraryCard } from "./ui/highlightItineraryCard";

let observer: ItineraryObserver | null = null;

suppressRedirectOfferOnBookingPage();

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  sendResponse({ received: true, responderName: "momondo" });
  console.debug(message);
  switch (message.event) {
    case "BEGIN_PARSING":
      try {
        suppressOfferFlightPenguinPopup();
        sendProcessing("momondo");
        sendScraperStarting("momondo");
        observer = new ItineraryObserver({ formData: message.formData });
        await attachObserver(observer);
        pollForNoResults({ pollForNoResultsCheck: hasNoResults, providerName: "momondo" });
      } catch (error) {
        console.error(error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Sentry.captureException(error);
        sendFailedScraper("momondo", error);
        sendFailed("momondo");
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      try {
        stopScrollingNow("flight selected");
        await highlightItineraryCard(message.sourceId);
        addBackToSearchButton();
      } catch (error) {
        console.error(error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Sentry.captureException(error);
        sendItineraryNotFound(message.itineraryId);
      }
      break;
    default:
      break;
  }
});

const attachObserver = async (observer: ItineraryObserver): Promise<HTMLDivElement | null> => {
  const resultsContainer = await getResultsContainer();
  observer.beginObservation(resultsContainer);
  return resultsContainer;
};

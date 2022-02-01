// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: `${process.env.EXTENSION_ENV}`,
  release: `${process.env.SENTRY_PROJECT}@${process.env.VERSION}`,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  integrations: [new window.Sentry.Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

import { sendFailedScraper, sendScraperComplete } from "../shared/events";
import { sendFailed, sendProcessing, sendSuccess } from "../shared/events/analytics/scrapers";
import { addBackToSearchButton } from "../shared/ui/backToSearch";
import { setScraperFlag } from "../shared/utilities/isScraperFlag";
import { suppressOfferFlightPenguinPopup } from "../shared/utilities/suppressOfferFlightPenguinPopup";
import { parseFlights } from "./parser/parseFlights";
import { setFlightIds } from "./parser/setFlightIds";
import { waitForLoading } from "./parser/waitForLoading";
import { clearSelections } from "./ui/clearSelections";
import { highlightFlightCard } from "./ui/highlightFlightCard";

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  sendResponse({ received: true, responderName: "southwest" });
  console.debug(message);
  switch (message.event) {
    case "BEGIN_PARSING":
      try {
        suppressOfferFlightPenguinPopup();
        sendProcessing("southwest");
        await getFlightResults();
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Sentry.captureException(error);
        console.error(error);
        sendFailedScraper("southwest", error, "ALL");
        sendFailed("southwest");
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      try {
        await setFlightIds();
        await highlightFlightCard({ departureId: message.selectedDepartureId, returnId: message.selectedReturnId });
        addBackToSearchButton();
      } catch (error) {
        console.error(error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Sentry.captureException(error);
      }
      break;
    case "CLEAR_SELECTION":
      try {
        clearSelections();
        chrome.runtime.sendMessage({ event: "PROVIDER_READY", provider: "southwest" });
      } catch (error) {
        console.error(error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Sentry.captureException(error);
      }
      break;
    default:
      break;
  }
});

const getFlightResults = async () => {
  await waitForLoading();
  const id = window.setInterval(() => {
    const searchResults = JSON.parse(
      window.sessionStorage.getItem("AirBookingSearchResultsSearchStore-searchResults-v1") || "{}",
    );
    if (searchResults && searchResults.searchResults) {
      const results = parseFlights(searchResults.searchResults);
      window.clearInterval(id);
      sendScraperComplete("southwest", "BOTH");
      sendSuccess("southwest", results.length);
    }
  }, 500);
};

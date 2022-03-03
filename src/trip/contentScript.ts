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

import { sendFailedScraper } from "../shared/events";
import { sendFailed, sendProcessing } from "../shared/events/analytics/scrapers";
import { pollForNoResults } from "../shared/parser/pollForNoResults";
import { addBackToSearchButton } from "../shared/ui/backToSearch";
import { stopScrollingNow } from "../shared/ui/stopScrolling";
import { suppressOfferFlightPenguinPopup } from "../shared/utilities/suppressOfferFlightPenguinPopup";
import { getFlightContainer } from "./parser/getFlightContainer";
import { FlightObserver } from "./parser/observer";
import { getFlightPenguinId } from "./shared/getFlightPenguinId";
import { ensureBookTogetherSelected } from "./ui/ensureBookTogetherSelected";
import { hasNoResults } from "./ui/hasNoResults";
import { highlightFlightCard } from "./ui/highlightFlightCard";

let observer: FlightObserver | null = null;
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  sendResponse({ received: true, responderName: "trip" });
  console.debug(message);
  switch (message.event) {
    case "BEGIN_PARSING":
      try {
        document.cookie = "IBU_FLIGHT_LIST_STYLE=Merged";
        suppressOfferFlightPenguinPopup();
        sendProcessing("trip");
        await ensureBookTogetherSelected();
        observer = new FlightObserver({ formData: message.formData });
        await attachObserver(observer);
        pollForNoResults({ pollForNoResultsCheck: hasNoResults, providerName: "trip", searchType: "BOTH" });
      } catch (error) {
        console.error(error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Sentry.captureException(error);
        sendFailedScraper("trip", error, "ALL");
        sendFailed("trip");
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      try {
        observer?.endObservation();
        await highlightFlight(message.selectedDepartureId, message.selectedReturnId);
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

const attachObserver = async (observer: FlightObserver): Promise<HTMLDivElement | null> => {
  const flightContainer = await getFlightContainer();
  observer.beginObservation(flightContainer);
  return flightContainer;
};

const highlightFlight = async (departureId: string, returnId: string): Promise<void> => {
  stopScrollingNow("flight selected");

  if (observer) {
    const flightPenguinId = getFlightPenguinId(departureId, returnId);
    // const flightIndex = observer.getFlightIndex(flightPenguinId);
    await highlightFlightCard(flightPenguinId);
    addBackToSearchButton();
  } else {
    throw new Error("Tried to lookup trip.com index, observer not initialized");
  }
};

import { sendFailedScraper, sendScraperComplete } from "../shared/events";
import { sendFailed, sendProcessing } from "../shared/events/analytics/scrapers";
import { addBackToSearchButton } from "../shared/ui/backToSearch";
import { stopScrollingNow } from "../shared/ui/stopScrolling";
import { suppressOfferFlightPenguinPopup } from "../shared/utilities/suppressOfferFlightPenguinPopup";
import { getFlightContainer } from "./parser/getFlightContainer";
import { FlightObserver } from "./parser/observer";
import { getFlightPenguinId } from "./shared/getFlightPenguinId";
import { highlightFlightCard } from "./ui/highlightFlightCard";

let observer: FlightObserver | null = null;

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  sendResponse({ received: true, responderName: "kiwi" });
  console.debug(message);
  switch (message.event) {
    case "BEGIN_PARSING":
      try {
        suppressOfferFlightPenguinPopup();
        sendProcessing("kiwi");
        observer = new FlightObserver({ formData: message.formData });
        await attachObserver(observer);
      } catch (error) {
        console.error(error);
        // window.Sentry.captureException(error);  // TODO: Sentry setup
        sendFailedScraper("kiwi", error, "ALL");
        sendFailed("kiwi");
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      stopScrollingNow("flight selected");
      await highlightFlightCard(getFlightPenguinId(message.selectedDepartureId, message.selectedReturnId));
      addBackToSearchButton();
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
4;

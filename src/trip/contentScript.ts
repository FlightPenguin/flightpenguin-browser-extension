import { sendFailedScraper } from "../shared/events";
import { addBackToSearchButton } from "../shared/ui/backToSearch";
import { getFlightContainer } from "./parser/getFlightContainer";
import { FlightObserver } from "./parser/observer";
import { getFlightPenguinId } from "./shared/getFlightPenguinId";
import { highlightFlightCard } from "./ui/highlightFlightCard";
import { stopScrollingNow } from "./ui/stopScrolling";

let observer: FlightObserver | null = null;
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  sendResponse({ received: true, responderName: "trip" });
  console.debug(message);
  switch (message.event) {
    case "BEGIN_PARSING":
      try {
        observer = new FlightObserver({ formData: message.formData });
        await attachObserver(observer);
      } catch (error) {
        console.error(error);
        // window.Sentry.captureException(error);  // TODO: Sentry setup
        sendFailedScraper("trip", error, "ALL");
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

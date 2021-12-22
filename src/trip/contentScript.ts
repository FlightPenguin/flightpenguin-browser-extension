import { sendFailedScraper } from "../shared/events";
import { addBackToSearchButton } from "../shared/ui/backToSearch";
import { stopScrollingNow } from "../shared/ui/stopScrolling";
import { suppressOfferFlightPenguinPopup } from "../shared/utilities/suppressOfferFlightPenguinPopup";
import { getFlightContainer } from "./parser/getFlightContainer";
import { FlightObserver } from "./parser/observer";
import { getFlightPenguinId } from "./shared/getFlightPenguinId";
import { highlightFlightCard } from "./ui/highlightFlightCard";

let observer: FlightObserver | null = null;
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  sendResponse({ received: true, responderName: "trip" });
  console.debug(message);
  switch (message.event) {
    case "BEGIN_PARSING":
      try {
        suppressOfferFlightPenguinPopup();
        observer = new FlightObserver({ formData: message.formData });
        await attachObserver(observer);
      } catch (error) {
        console.error(error);
        // window.Sentry.captureException(error);  // TODO: Sentry setup
        sendFailedScraper("trip", error, "ALL");
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      observer?.endObservation();
      await highlightFlight(message.selectedDepartureId, message.selectedReturnId);
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
    const flightIndex = observer.getFlightIndex(flightPenguinId);
    await highlightFlightCard(flightIndex);
    addBackToSearchButton();
  } else {
    throw new Error("Tried to lookup trip.com index, observer not initialized");
  }
};
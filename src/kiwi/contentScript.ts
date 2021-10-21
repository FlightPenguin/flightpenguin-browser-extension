import { sendFailedScraper, sendScraperComplete } from "../shared/events";
import { addBackToSearchButton } from "../shared/ui/backToSearch";
import { getFlightContainer } from "./parser/getFlightContainer";
import { FlightObserver } from "./parser/observer";
import { getFlightPenguinId } from "./shared/getFlightPenguinId";
import { highlightFlightCard } from "./ui/highlightFlightCard";
import { loadAllFlights, stopScrollingNow } from "./ui/loadAllFlights";

let observer: FlightObserver | null = null;
let flightContainer: HTMLDivElement | null;

chrome.runtime.onMessage.addListener(async function (message) {
  console.debug(message);
  switch (message.event) {
    case "BEGIN_PARSING":
      try {
        console.log(message.formData);
        observer = new FlightObserver({ formData: message.formData });
        flightContainer = await attachObserver(observer);
        if (flightContainer) {
          await loadAllFlights();
        }
        sendScraperComplete("kiwi", "DEPARTURE");
      } catch (error) {
        console.error(error);
        // window.Sentry.captureException(error);  // TODO: Sentry setup
        sendFailedScraper("kiwi", error, "DEPARTURE");
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

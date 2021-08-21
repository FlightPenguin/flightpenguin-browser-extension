window.Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});

import { sendFailedScraper } from "../shared/events";
import { addBackToSearchButton } from "../shared/ui/backToSearch";
import { getFlightContainer } from "./parser/getFlightContainer";
import { FlightObserver } from "./parser/observer";
import { highlightFlightCard } from "./ui/highlightFlightCard";
import { addStopScrollingElement, scrollThroughContainer, stopScrollingNow } from "./ui/scrollThroughContainer";
import { selectFlightCard } from "./ui/selectFlightCard";

let departureFlightContainer: HTMLElement | null;
let departureObserver: FlightObserver | null = null;
let returnFlightContainer: HTMLElement | null;
let returnObserver: FlightObserver | null = null;

chrome.runtime.onMessage.addListener(async function (message) {
  switch (message.event) {
    case "BEGIN_PARSING":
      departureObserver = new FlightObserver(null);
      departureFlightContainer = await attachObserver(departureObserver, null);
      if (departureFlightContainer) {
        await scrollThroughContainer(departureFlightContainer);
      }
      departureObserver.endObservation();
      break;
    case "GET_RETURN_FLIGHTS":
      if (departureObserver) {
        departureObserver.endObservation();
      }
      stopScrollingNow();
      returnObserver = new FlightObserver(message.departure);
      returnFlightContainer = await attachObserver(returnObserver, message.departure.id);
      if (returnFlightContainer) {
        await scrollThroughContainer(returnFlightContainer);
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      stopScrollingNow();
      if (departureObserver) {
        departureObserver.endObservation();
      }
      if (returnObserver) {
        returnObserver.endObservation();
      }

      await highlightFlight(message.selectedDepartureId, departureObserver, message.selectedReturnId, returnObserver);
      break;
    case "CLEAR_SELECTION":
      debugger;
      chrome.runtime.sendMessage({ event: "PROVIDER_READY", provider: "skiplagged" });
      break;
    default:
      break;
  }
});

const attachObserver = async (observer: FlightObserver, flightId: any): Promise<HTMLElement | null> => {
  try {
    if (flightId) {
      const skiplaggedId = observer.getSkiplaggedId(flightId);
      await selectFlightCard(skiplaggedId);
    }
    const flightContainer = await getFlightContainer(!!flightId);
    observer.beginObservation(flightContainer);
    return flightContainer;
  } catch (error) {
    window.Sentry.captureException(error);
    sendFailedScraper("skiplagged", error);
    return null;
  }
};

const highlightFlight = async (
  flightPenguinDepartureId: string,
  departureObserver: FlightObserver | null,
  flightPenguinReturnId: string,
  returnObserver: FlightObserver | null,
) => {
  addBackToSearchButton();
  try {
    let flightId;
    if (flightPenguinDepartureId) {
      flightId = departureObserver?.getSkiplaggedId(flightPenguinDepartureId);
    } else {
      flightId = returnObserver?.getSkiplaggedId(flightPenguinReturnId);
    }

    await highlightFlightCard(flightId || "");
  } catch (error) {
    window.Sentry.captureException(error);
    sendFailedScraper("skiplagged", error);
  }
};

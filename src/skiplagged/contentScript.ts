import { ParserError } from "../shared/errors";

window.Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});

import { sendFailedScraper, sendScraperComplete } from "../shared/events";
import { addBackToSearchButton } from "../shared/ui/backToSearch";
import { getFlightContainer } from "./parser/getFlightContainer";
import { FlightObserver } from "./parser/observer";
import { clearSelection } from "./ui/clearSelection";
import { highlightFlightCard } from "./ui/highlightFlightCard";
import { scrollThroughContainer, stopScrollingNow } from "./ui/scrollThroughContainer";
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
      sendScraperComplete("skiplagged", "DEPARTURE");
      departureObserver.endObservation();
      break;
    case "GET_RETURN_FLIGHTS":
      departureObserver?.endObservation();
      stopScrollingNow();

      returnObserver = new FlightObserver(message.departure);
      returnFlightContainer = await attachObserver(
        returnObserver,
        getSkiplaggedDepartureId(departureObserver, message.departure.id),
      );
      if (returnFlightContainer) {
        await scrollThroughContainer(returnFlightContainer);
      }
      sendScraperComplete("skiplagged", "RETURN");
      break;
    case "HIGHLIGHT_FLIGHT":
      stopScrollingNow();
      departureObserver?.endObservation();
      returnObserver?.endObservation();

      await highlightFlight(message.selectedDepartureId, departureObserver, message.selectedReturnId, returnObserver);
      break;
    case "CLEAR_SELECTION":
      departureObserver?.endObservation();
      returnObserver?.endObservation();
      stopScrollingNow();

      await clearSelection();
      chrome.runtime.sendMessage({ event: "PROVIDER_READY", provider: "skiplagged" });
      break;
    default:
      break;
  }
});

const attachObserver = async (
  observer: FlightObserver,
  skiplaggedFlightId: string | null,
): Promise<HTMLElement | null> => {
  try {
    if (skiplaggedFlightId) {
      await selectFlightCard(skiplaggedFlightId);
    }
    const flightContainer = await getFlightContainer(!!skiplaggedFlightId);
    observer.beginObservation(flightContainer);
    return flightContainer;
  } catch (error) {
    window.Sentry.captureException(error);
    const flightType = skiplaggedFlightId ? "RETURN" : "DEPARTURE";
    sendFailedScraper("skiplagged", error, flightType);
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
    if (flightPenguinReturnId) {
      flightId = returnObserver?.getSkiplaggedId(flightPenguinReturnId);
    } else if (flightPenguinDepartureId) {
      flightId = departureObserver?.getSkiplaggedId(flightPenguinDepartureId);
    } else {
      throw new ParserError("highlighting without a flight...");
    }

    await highlightFlightCard(flightId || "");
  } catch (error) {
    window.Sentry.captureException(error);
    const flightType = flightPenguinReturnId ? "RETURN" : "DEPARTURE";
    sendFailedScraper("skiplagged", error, flightType);
  }
};

const getSkiplaggedDepartureId = (departureObserver: FlightObserver | null, flightPenguinId: string) => {
  if (departureObserver) {
    return departureObserver.getSkiplaggedId(flightPenguinId);
  }
  throw new ParserError("Departure observer not initialized...");
};

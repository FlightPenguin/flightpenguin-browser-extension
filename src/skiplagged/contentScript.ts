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
  console.debug(message);
  switch (message.event) {
    case "BEGIN_PARSING":
      try {
        departureObserver = new FlightObserver(null);
        departureFlightContainer = await attachObserver(departureObserver, false);
        if (departureFlightContainer) {
          await scrollThroughContainer(departureFlightContainer);
        }
        sendScraperComplete("skiplagged", "DEPARTURE");
        departureObserver.endObservation();
      } catch (error) {
        console.error(error);
        window.Sentry.captureException(error);
        sendFailedScraper("skiplagged", error, "DEPARTURE");
      }
      break;
    case "GET_RETURN_FLIGHTS":
      try {
        departureObserver?.endObservation();
        await stopScrollingNow("Return flight selected");

        returnObserver = new FlightObserver(message.departure);
        returnFlightContainer = await attachObserver(returnObserver, true);
        await selectFlightCard(getSkiplaggedDepartureId(departureObserver, message.departure.id));
        if (returnFlightContainer) {
          await scrollThroughContainer(returnFlightContainer);
        }
        sendScraperComplete("skiplagged", "RETURN");
      } catch (error) {
        console.error(error);
        window.Sentry.captureException(error);
        sendFailedScraper("skiplagged", error, "RETURN");
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      try {
        await stopScrollingNow("Flight selection");

        departureObserver?.endObservation();
        returnObserver?.endObservation();

        await highlightFlight(message.selectedDepartureId, departureObserver, message.selectedReturnId, returnObserver);
      } catch (error) {
        console.error(error);
        window.Sentry.captureException(error);
      }

      break;
    case "CLEAR_SELECTION":
      try {
        departureObserver?.endObservation();
        returnObserver?.endObservation();
        await stopScrollingNow("Clear selection");

        await clearSelection();
        chrome.runtime.sendMessage({ event: "PROVIDER_READY", provider: "skiplagged" });
      } catch (error) {
        console.error(error);
        window.Sentry.captureException(error);
      }

      break;
    default:
      break;
  }
});

const attachObserver = async (observer: FlightObserver, selectedFlight: boolean): Promise<HTMLElement | null> => {
  const flightContainer = await getFlightContainer(!!selectedFlight);
  observer.beginObservation(flightContainer);
  return flightContainer;
};

const highlightFlight = async (
  flightPenguinDepartureId: string,
  departureObserver: FlightObserver | null,
  flightPenguinReturnId: string,
  returnObserver: FlightObserver | null,
) => {
  addBackToSearchButton();

  let flightId;
  if (flightPenguinReturnId) {
    flightId = returnObserver?.getSkiplaggedId(flightPenguinReturnId);
  } else if (flightPenguinDepartureId) {
    flightId = departureObserver?.getSkiplaggedId(flightPenguinDepartureId);
  } else {
    throw new ParserError("highlighting without a flight...");
  }

  await highlightFlightCard(flightId || "");
};

const getSkiplaggedDepartureId = (departureObserver: FlightObserver | null, flightPenguinId: string) => {
  if (departureObserver) {
    return departureObserver.getSkiplaggedId(flightPenguinId);
  }
  throw new ParserError("Departure observer not initialized...");
};

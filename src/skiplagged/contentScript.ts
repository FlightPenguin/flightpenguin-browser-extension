window.Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});

import { ParserError } from "../shared/errors";
import { sendFailedScraper, sendScraperComplete } from "../shared/events";
import { addBackToSearchButton } from "../shared/ui/backToSearch";
import { getFlightContainer } from "./parser/getFlightContainer";
import { FlightObserver } from "./parser/observer";
import { clearSelection } from "./ui/clearSelection";
import { highlightFlightCard } from "./ui/highlightFlightCard";
import { reloadForDeparture } from "./ui/reloadForDeparture";
import { scrollThroughContainer, stopScrollingNow } from "./ui/scrollThroughContainer";

let departureFlightContainer: HTMLElement | null;
let departureObserver: FlightObserver | null = null;
let returnFlightContainer: HTMLElement | null;
let returnObserver: FlightObserver | null = null;

chrome.runtime.onMessage.addListener(async function (message) {
  console.log(message);
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
        window.Sentry.captureException(error);
        sendFailedScraper("skiplagged", error, "DEPARTURE");
      }
      break;
    case "GET_RETURN_FLIGHTS":
      // this will parse the card and reload the page... firing off a message indicating what to do...
      try {
        departureObserver?.endObservation();
        stopScrollingNow();

        await reloadForDeparture(
          getSkiplaggedDepartureId(departureObserver, message.departure.id),
          message.departure,
          departureObserver?.getFlightMap() || {},
        );
      } catch (error) {
        window.Sentry.captureException(error);
        sendFailedScraper("skiplagged", error, "RETURN");
      }

      break;
    case "BEGIN_PARSING_RETURNS":
      try {
        // handling post-reload
        departureObserver?.endObservation();
        returnObserver?.endObservation();

        departureObserver = new FlightObserver(null);
        departureObserver.addNewFlightsToMap(message.departureMap);

        returnObserver = new FlightObserver(message.departure);
        returnFlightContainer = await attachObserver(returnObserver, true);
        if (returnFlightContainer) {
          await scrollThroughContainer(returnFlightContainer);
        }
        sendScraperComplete("skiplagged", "RETURN");
      } catch (error) {
        console.log(error);
        window.Sentry.captureException(error);
        sendFailedScraper("skiplagged", error, "RETURN");
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      stopScrollingNow("Highlight flight");
      departureObserver?.endObservation();
      returnObserver?.endObservation();

      await highlightFlight(message.selectedDepartureId, departureObserver, message.selectedReturnId, returnObserver);
      break;
    case "CLEAR_SELECTION":
      departureObserver?.endObservation();
      returnObserver?.endObservation();
      stopScrollingNow("Clear selection(s)");

      await clearSelection();
      chrome.runtime.sendMessage({ event: "PROVIDER_READY", provider: "skiplagged" });
      break;
    default:
      break;
  }
});

const attachObserver = async (observer: FlightObserver, returnFlight: boolean): Promise<HTMLElement | null> => {
  const flightContainer = await getFlightContainer(returnFlight);
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

import { addBackToSearchButton } from "../shared/ui/backToSearch";

window.Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});

import { ParserError } from "../shared/errors";
import { sendFailedScraper } from "../shared/events";
import { getFlights } from "./parser/getFlights";
import { highlightFlightCard } from "./ui/highlightFlightCard";
import { selectReturnFlight } from "./ui/selectReturnFlight";

const flightMaps = {
  departureFlightMap: {} as { [key: string]: string },
  returnFlightMap: {} as { [key: string]: string },
};

chrome.runtime.onMessage.addListener(async function (message) {
  switch (message.event) {
    case "BEGIN_PARSING":
      await scrapeDepartureFlights();
      break;
    case "GET_RETURN_FLIGHTS":
      await scrapeReturnFlights(message.departure);
      break;
    case "HIGHLIGHT_FLIGHT":
      await highlightFlight(message.selectedReturnId);
      break;
    case "CLEAR_SELECTION":
      debugger;
      chrome.runtime.sendMessage({ event: "PROVIDER_READY", provider: "skiplagged" });
      break;
    default:
      break;
  }
});

const scrapeDepartureFlights = async () => {
  try {
    flightMaps.departureFlightMap = await getFlights(null);
  } catch (error) {
    window.Sentry.captureException(error);
    sendFailedScraper("skiplagged", error);
  }
};

const scrapeReturnFlights = async (departure: any) => {
  await selectReturnFlight(departure);
  try {
    flightMaps.returnFlightMap = await getFlights(departure);
  } catch (error) {
    window.Sentry.captureException(error);
    sendFailedScraper("skiplagged", error);
  }
};

const highlightFlight = async (flightPenguinReturnId: string) => {
  try {
    const returnId = getReturnId(flightPenguinReturnId);
    await highlightFlightCard(returnId);
    addBackToSearchButton();
  } catch (error) {
    window.Sentry.captureException(error);
    sendFailedScraper("skiplagged", error);
  }
};

const getReturnId = (flightPenguinReturnId: string): string => {
  const skiplaggedId = flightMaps.returnFlightMap[flightPenguinReturnId];
  if (!skiplaggedId) {
    throw new ParserError(`Unable to find mapped flight for ${flightPenguinReturnId}`);
  }
  return skiplaggedId;
};

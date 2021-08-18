import { addBackToSearchButton } from "../shared/ui/backToSearch";

window.Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});

import { sendFailedScraper } from "../shared/events/index";
import { getFlights } from "./parser/getFlights";
import { highlightFlightCard } from "./ui/highlightFlightCard";
import { selectReturnFlight } from "./ui/selectReturnFlight";

chrome.runtime.onMessage.addListener(async function (message) {
  switch (message.event) {
    case "BEGIN_PARSING":
      await scrapeDepartureFlights();
      break;
    case "GET_RETURN_FLIGHTS":
      await scrapeReturnFlights(message.departure);
      break;
    case "HIGHLIGHT_FLIGHT":
      await highlightFlightCard(message.selectedDepartureId, message.selectedReturnId);
      addBackToSearchButton();
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
    await getFlights(null);
  } catch (error) {
    window.Sentry.captureException(error);
    sendFailedScraper("skiplagged", error);
  }
};

const scrapeReturnFlights = async (departure) => {
  await selectReturnFlight(departure);
  try {
    await getFlights(departure);
  } catch (error) {
    window.Sentry.captureException(error);
    sendFailedScraper("skiplagged", error);
  }
};

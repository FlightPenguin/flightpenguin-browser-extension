import { addBackToSearchButton } from "../shared/ui/backToSearch";

window.Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});

import {
  sendFailedScraper,
  sendFlightsEvent,
  sendNoFlightsEvent,
  sendReturnFlightsEvent,
  sendScraperComplete,
} from "../shared/events";
import { getFlights } from "./parser/getFlights";
import { highlightFlightCard } from "./ui/highlightFlightCard";
import { selectReturnFlight } from "./ui/selectReturnFlight";

let formData;

chrome.runtime.onMessage.addListener(async function (message) {
  switch (message.event) {
    case "BEGIN_PARSING":
      formData = message.formData;
      await scrapeDepartureFlights(formData);
      break;
    case "GET_RETURN_FLIGHTS":
      await scrapeReturnFlights(message.departure, formData);
      break;
    case "HIGHLIGHT_FLIGHT":
      await highlightFlightCard(message.selectedDepartureId, message.selectedReturnId);
      addBackToSearchButton();
      break;
    case "CLEAR_SELECTION":
      history.back();
      formData = null;
      chrome.runtime.sendMessage({ event: "PROVIDER_READY", provider: "expedia" });
      break;
    default:
      break;
  }
});

const scrapeDepartureFlights = async (formData) => {
  try {
    const flights = await getFlights(null, 30000, formData);
    if (flights) {
      sendFlightsEvent("expedia", flights);
      sendScraperComplete("expedia", "DEPARTURE");
    } else {
      sendNoFlightsEvent("expedia", "DEPARTURE");
    }
  } catch (error) {
    window.Sentry.captureException(error);
    sendFailedScraper("expedia", error, "DEPARTURE");
  }
};

const scrapeReturnFlights = async (departure, formData) => {
  await selectReturnFlight(departure, formData);
  try {
    const flights = await getFlights(departure, 30000, formData);
    if (flights) {
      sendReturnFlightsEvent("expedia", flights);
      sendScraperComplete("expedia", "RETURN");
    } else {
      sendNoFlightsEvent("expedia", "RETURN");
    }
  } catch (error) {
    window.Sentry.captureException(error);
    sendFailedScraper("expedia", error, "RETURN");
  }
};

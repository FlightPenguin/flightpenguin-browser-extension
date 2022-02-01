window.Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: `${process.env.EXTENSION_ENV}`,
  release: `${process.env.SENTRY_PROJECT}@${process.env.VERSION}`,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  integrations: [new window.Sentry.Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

import { sendFailed, sendProcessing, sendSuccess } from "shared/events/analytics/scrapers/index";
import { suppressOfferFlightPenguinPopup } from "shared/utilities/suppressOfferFlightPenguinPopup";

import {
  sendFailedScraper,
  sendFlightsEvent,
  sendNoFlightsEvent,
  sendReturnFlightsEvent,
  sendScraperComplete,
} from "../shared/events";
import { addBackToSearchButton } from "../shared/ui/backToSearch";
import { getFlights } from "./parser/getFlights";
import { highlightFlightCard } from "./ui/highlightFlightCard";
import { selectReturnFlight } from "./ui/selectReturnFlight";

let formData;

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  sendResponse({ received: true, responderName: "expedia" });
  console.debug(message);
  switch (message.event) {
    case "BEGIN_PARSING":
      suppressOfferFlightPenguinPopup();
      sendProcessing("expedia");
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
    const flights = await getFlights(null, 75000, formData);
    if (flights) {
      sendFlightsEvent("expedia", flights);
      sendScraperComplete("expedia", "DEPARTURE");
      sendSuccess("expedia", flights.length);
    } else {
      sendSuccess("expedia", 0);
      sendNoFlightsEvent("expedia", "DEPARTURE");
    }
  } catch (error) {
    window.Sentry.captureException(error);
    sendFailedScraper("expedia", error, "DEPARTURE");
    sendFailed("expedia");
  }
};

const scrapeReturnFlights = async (departure, formData) => {
  try {
    await selectReturnFlight(departure, formData);
    const flights = await getFlights(departure, 75000, formData);
    if (flights) {
      sendReturnFlightsEvent("expedia", flights);
      sendScraperComplete("expedia", "RETURN");
    } else {
      sendNoFlightsEvent("expedia", "RETURN");
    }
  } catch (error) {
    window.Sentry.captureException(error);
    sendFailedScraper("expedia", error, "RETURN");
    sendFailed("expedia");
  }
};

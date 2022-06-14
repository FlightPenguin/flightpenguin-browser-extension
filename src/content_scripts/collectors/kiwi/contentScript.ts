import { initializeSentry } from "../../../shared/initializeSentry";

initializeSentry();

import * as Sentry from "@sentry/browser";
import * as browser from "webextension-polyfill";

import { sendFailedScraper, sendItineraryNotFound, sendScraperStarting } from "../../../shared/events";
import { sendFailed, sendProcessing } from "../../../shared/events/analytics/scrapers";
import { pollForNoResults } from "../../../shared/parser/pollForNoResults";
import { addBackToSearchButton } from "../../../shared/ui/backToSearch";
import { stopScrollingNow } from "../../../shared/ui/stopScrolling";
import { suppressOfferFlightPenguinPopup } from "../../generic/activeCollectorSuppression/suppressOfferFlightPenguinPopup";
import { getFlightContainer } from "./parser/getFlightContainer";
import { FlightObserver } from "./parser/observer";
import { hasNoResults } from "./ui/hasNoResults";
import { highlightFlightCard } from "./ui/highlightFlightCard";

let observer: FlightObserver | null = null;

browser.runtime.onMessage.addListener(async (message, sender) => {
  console.debug(message);
  switch (message.event) {
    case "BEGIN_PARSING":
      try {
        document.cookie = "preferred_currency=usd";
        suppressOfferFlightPenguinPopup();
        sendProcessing("kiwi");
        sendScraperStarting("kiwi");
        observer = new FlightObserver({ formData: message.formData });
        await attachObserver(observer);
        pollForNoResults({ pollForNoResultsCheck: hasNoResults, providerName: "kiwi" });
      } catch (error) {
        console.error(error);
        Sentry.captureException(error);
        sendFailedScraper("kiwi", error);
        sendFailed("kiwi");
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      try {
        stopScrollingNow("flight selected");
        await highlightFlightCard(message.itineraryId);
        addBackToSearchButton();
      } catch (error) {
        console.error(error);
        Sentry.captureException(error);
        sendItineraryNotFound(message.itineraryId);
      }
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

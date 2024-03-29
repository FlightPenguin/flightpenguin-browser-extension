import * as browser from "webextension-polyfill";

import { sendFailedScraper, sendItineraryNotFound, sendScraperStarting } from "../../../shared/events";
import { pollForNoResults } from "../../../shared/parser/pollForNoResults";
import { addBackToSearchButton } from "../../../shared/ui/backToSearch";
import { stopScrollingNow } from "../../../shared/ui/stopScrolling";
import { suppressOfferFlightPenguinPopup } from "../../generic/activeCollectorSuppression/suppressOfferFlightPenguinPopup";
import { suppressRedirectOfferOnBookingPage } from "./booking/suppressRedirectOfferOnBookingPage";
import { getResultsContainer } from "./parser/getResultsContainer";
import { ItineraryObserver } from "./parser/observer";
import { hasNoResults } from "./ui/hasNoResults";
import { highlightItineraryCard } from "./ui/highlightItineraryCard";

let observer: ItineraryObserver | null = null;

suppressRedirectOfferOnBookingPage();

browser.runtime.onMessage.addListener(async (message, sender) => {
  console.debug(message);
  switch (message.event) {
    case "BEGIN_PARSING":
      try {
        suppressOfferFlightPenguinPopup();
        sendScraperStarting("momondo");
        observer = new ItineraryObserver({ formData: message.formData });
        await attachObserver(observer);
        pollForNoResults({ pollForNoResultsCheck: hasNoResults, providerName: "momondo" });
      } catch (error) {
        console.error(error);
        sendFailedScraper("momondo", error);
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      try {
        stopScrollingNow("flight selected");
        await highlightItineraryCard(message.sourceId);
        addBackToSearchButton();
      } catch (error) {
        console.error(error);
        sendItineraryNotFound(message.itineraryId);
      }
      break;
    default:
      break;
  }
});

const attachObserver = async (observer: ItineraryObserver): Promise<HTMLDivElement | null> => {
  const resultsContainer = await getResultsContainer();
  observer.beginObservation(resultsContainer);
  return resultsContainer;
};

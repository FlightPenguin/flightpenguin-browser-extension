import * as browser from "webextension-polyfill";

import { sendFailedScraper, sendItineraryNotFound, sendScraperStarting } from "../../../shared/events";
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
        sendScraperStarting("kiwi");
        observer = new FlightObserver({ formData: message.formData });
        await attachObserver(observer);
        pollForNoResults({ pollForNoResultsCheck: hasNoResults, providerName: "kiwi" });
      } catch (error) {
        console.error(error);
        sendFailedScraper("kiwi", error);
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      try {
        stopScrollingNow("flight selected");
        await highlightFlightCard(message.itineraryId);
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

const attachObserver = async (observer: FlightObserver): Promise<HTMLDivElement | null> => {
  const flightContainer = await getFlightContainer();
  observer.beginObservation(flightContainer);
  return flightContainer;
};

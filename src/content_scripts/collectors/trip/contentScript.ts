import { initializeSentry } from "../../../shared/initializeSentry";

initializeSentry();

import * as Sentry from "@sentry/browser";
import * as browser from "webextension-polyfill";

import { sendFailedScraper, sendItineraryNotFound, sendScraperStarting } from "../../../shared/events";
import { sendFailed, sendProcessing } from "../../../shared/events/analytics/scrapers";
import { pollForNoResults } from "../../../shared/parser/pollForNoResults";
import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { addBackToSearchButton } from "../../../shared/ui/backToSearch";
import { stopScrollingNow } from "../../../shared/ui/stopScrolling";
import { suppressOfferFlightPenguinPopup } from "../../generic/activeCollectorSuppression/suppressOfferFlightPenguinPopup";
import { getFlightContainer } from "./parser/getFlightContainer";
import { FlightObserver } from "./parser/observer";
import { ensureBookTogetherSelected } from "./ui/ensureBookTogetherSelected";
import { hasNoResults } from "./ui/hasNoResults";
import { highlightFlightCard } from "./ui/highlightFlightCard";

let observer: FlightObserver | null = null;
let formData: FlightSearchFormData;

browser.runtime.onMessage.addListener(async (message, sender) => {
  console.debug(message);
  switch (message.event) {
    case "BEGIN_PARSING":
      try {
        document.cookie = "IBU_FLIGHT_LIST_STYLE=Merged;cookiePricesDisplayed=USD";
        suppressOfferFlightPenguinPopup();
        sendProcessing("trip");
        sendScraperStarting("trip");
        formData = message.formData as FlightSearchFormData;
        if (formData.roundtrip) {
          await ensureBookTogetherSelected();
        }
        observer = new FlightObserver({ formData });
        await attachObserver(observer);
        pollForNoResults({ pollForNoResultsCheck: hasNoResults, providerName: "trip" });
      } catch (error) {
        console.error(error);
        Sentry.captureException(error);
        sendFailedScraper("trip", error);
        sendFailed("trip");
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      try {
        observer?.endObservation();
        await highlightFlight(message.itineraryId, formData);
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

const highlightFlight = async (itineraryId: string, formData: FlightSearchFormData): Promise<void> => {
  stopScrollingNow("flight selected");

  if (observer) {
    // const flightIndex = observer.getFlightIndex(flightPenguinId);
    await highlightFlightCard(itineraryId, formData);
    addBackToSearchButton();
  } else {
    throw new Error("Tried to lookup trip.com index, observer not initialized");
  }
};

import * as browser from "webextension-polyfill";

import { suppressOfferFlightPenguinPopup } from "../collectors/generic/activeCollectorSuppression/suppressOfferFlightPenguinPopup";
import {
  sendFailedScraper,
  sendItinerariesEvent,
  sendItineraryNotFound,
  sendScraperComplete,
  sendScraperStarting,
} from "../shared/events";
import { sendFailed, sendProcessing } from "../shared/events/analytics/scrapers";
import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { Itinerary } from "../shared/types/Itinerary";
import { getItinerariesOnPage } from "./parser/getItinerariesOnPage";
import { CheapoairModalObserver } from "./parser/modalObserver";
import { waitForPageLoad } from "./parser/waitForPageLoad";
import { clickNextPage } from "./ui/clickNextPage";
import { getPageCount } from "./ui/getPageCount";
import { isLastPage } from "./ui/isLastPage";
import { openBookingLink } from "./ui/openBookingLink";

export const initMessageListener = (observer: CheapoairModalObserver): void => {
  let formData;
  const knownItineraries = [] as Itinerary[];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    sendResponse({ received: true, responderName: "cheapoair" });
    console.debug(message);
    switch (message.event) {
      case "BEGIN_PARSING":
        try {
          document.cookie = "currency=usd";
          suppressOfferFlightPenguinPopup();
          sendProcessing("cheapoair");
          sendScraperStarting("cheapoair");
          formData = message.formData;
          observer.beginObservation();
          await getAllItineraries(formData, knownItineraries);
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.Sentry.captureException(error);
          sendFailedScraper("cheapoair", error);
          sendFailed("cheapoair");
        }
        break;
      case "HIGHLIGHT_FLIGHT":
        try {
          await openBookingLink(message.itineraryId, knownItineraries);
          observer.endObservation();
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.Sentry.captureException(error);
          sendItineraryNotFound(message.itineraryId);
        }
        break;
      case "CLEAR_SELECTION":
        browser.runtime.sendMessage({ event: "PROVIDER_READY", provider: "cheapoair" });
        break;
      default:
        break;
    }
  });

  const getAllItineraries = async (formData: FlightSearchFormData, knownItineraries: Itinerary[]) => {
    await waitForPageLoad();

    const maxPageNumber = getPageCount();
    let complete = isLastPage(maxPageNumber);

    const itineraries = await getItinerariesOnPage(formData);
    if (itineraries.length) {
      itineraries.forEach((itinerary) => {
        knownItineraries.push(itinerary);
      });
      sendItinerariesEvent("cheapoair", itineraries);
    } else {
      complete = true;
    }

    if (complete) {
      sendScraperComplete("cheapoair");
    } else {
      clickNextPage();
      await waitForPageLoad();

      await getAllItineraries(formData, knownItineraries);
    }
  };
};

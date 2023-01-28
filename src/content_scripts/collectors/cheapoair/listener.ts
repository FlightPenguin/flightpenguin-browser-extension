import * as browser from "webextension-polyfill";

import {
  sendFailedScraper,
  sendItinerariesEvent,
  sendItineraryNotFound,
  sendScraperComplete,
  sendScraperStarting,
} from "../../../shared/events";
import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { Itinerary } from "../../../shared/types/Itinerary";
import { suppressOfferFlightPenguinPopup } from "../../generic/activeCollectorSuppression/suppressOfferFlightPenguinPopup";
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

  browser.runtime.onMessage.addListener(async (message, sender) => {
    console.debug(message);
    switch (message.event) {
      case "BEGIN_PARSING":
        try {
          document.cookie = "currency=usd";
          suppressOfferFlightPenguinPopup();
          sendScraperStarting("cheapoair");
          formData = message.formData;
          observer.beginObservation();
          await getAllItineraries(formData, knownItineraries);
        } catch (error) {
          sendFailedScraper("cheapoair", error);
        }
        break;
      case "HIGHLIGHT_FLIGHT":
        try {
          await openBookingLink(message.itineraryId, knownItineraries);
          observer.endObservation();
        } catch (error) {
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

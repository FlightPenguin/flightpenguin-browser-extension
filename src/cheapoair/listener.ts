import { sendFailedScraper, sendItinerariesEvent, sendScraperComplete } from "../shared/events";
import { sendFailed, sendProcessing } from "../shared/events/analytics/scrapers";
import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { Itinerary } from "../shared/types/newtypes/Itinerary";
import { suppressOfferFlightPenguinPopup } from "../shared/utilities/suppressOfferFlightPenguinPopup";
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

  chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    sendResponse({ received: true, responderName: "cheapoair" });
    console.debug(message);
    switch (message.event) {
      case "BEGIN_PARSING":
        try {
          suppressOfferFlightPenguinPopup();
          sendProcessing("cheapoair");
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
        await openBookingLink(message.itineraryId, knownItineraries);
        observer.endObservation();
        break;
      case "CLEAR_SELECTION":
        chrome.runtime.sendMessage({ event: "PROVIDER_READY", provider: "cheapoair" });
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

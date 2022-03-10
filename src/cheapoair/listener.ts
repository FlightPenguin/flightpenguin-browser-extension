import { sendFailedScraper, sendFlightNotFound, sendFlightsEvent, sendScraperComplete } from "../shared/events";
import { sendFailed, sendProcessing } from "../shared/events/analytics/scrapers";
import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { getFlightPenguinTripId } from "../shared/utilities/getFlightPenguinTripId";
import { suppressOfferFlightPenguinPopup } from "../shared/utilities/suppressOfferFlightPenguinPopup";
import { getFlightsOnPage } from "./parser/getFlightsOnPage";
import { CheapoairModalObserver } from "./parser/modalObserver";
import { waitForPageLoad } from "./parser/waitForPageLoad";
import { clickNextPage } from "./ui/clickNextPage";
import { getPageCount } from "./ui/getPageCount";
import { isLastPage } from "./ui/isLastPage";
import { openBookingLink } from "./ui/openBookingLink";

export const initMessageListener = (observer: CheapoairModalObserver): void => {
  let formData;
  const idMap = {} as { [keyof: string]: string };

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
          await getAllFlights(formData, idMap);
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.Sentry.captureException(error);
          sendFailedScraper("cheapoair", error, "ALL");
          sendFailed("cheapoair");
        }
        break;
      case "HIGHLIGHT_FLIGHT":
        // eslint-disable-next-line no-case-declarations
        const flightId = getFlightPenguinTripId(message.selectedDepartureId, message.selectedReturnId);
        try {
          await openBookingLink(flightId, idMap);
          observer.endObservation();
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.Sentry.captureException(error);
          sendFlightNotFound(flightId);
        }
        break;
      case "CLEAR_SELECTION":
        chrome.runtime.sendMessage({ event: "PROVIDER_READY", provider: "cheapoair" });
        break;
      default:
        break;
    }
  });

  const getAllFlights = async (formData: FlightSearchFormData, idMap: { [keyof: string]: string }) => {
    await waitForPageLoad();

    const maxPageNumber = getPageCount();
    let complete = isLastPage(maxPageNumber);

    const flights = await getFlightsOnPage(formData);
    if (flights.length) {
      flights.forEach((flight) => {
        idMap[flight.id] = flight.cheapoAirId;
      });
      sendFlightsEvent("cheapoair", flights);
    } else {
      complete = true;
    }

    if (complete) {
      sendScraperComplete("cheapoair", "BOTH");
    } else {
      clickNextPage();
      await waitForPageLoad();

      await getAllFlights(formData, idMap);
    }
  };
};

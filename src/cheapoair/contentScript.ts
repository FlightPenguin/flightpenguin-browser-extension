// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: `${process.env.EXTENSION_ENV}`,
  release: `${process.env.SENTRY_PROJECT}@${process.env.VERSION}`,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  integrations: [new window.Sentry.Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

import { sendFailedScraper, sendFlightsEvent, sendScraperComplete } from "../shared/events";
import { sendFailed, sendProcessing } from "../shared/events/analytics/scrapers";
import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { addBackToSearchButton } from "../shared/ui/backToSearch";
import { suppressOfferFlightPenguinPopup } from "../shared/utilities/suppressOfferFlightPenguinPopup";
import { getFlightsOnPage } from "./parser/getFlightsOnPage";
import { waitForPageLoad } from "./parser/waitForPageLoad";
import { clickNextPage } from "./ui/clickNextPage";
import { getPageCount } from "./ui/getPageCount";
import { isLastPage } from "./ui/isLastPage";
import { openBookingLink } from "./ui/openBookingLink";

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
        await getAllFlights(formData);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Sentry.captureException(error);
        sendFailedScraper("cheapoair", error, "ALL");
        sendFailed("cheapoair");
      }
      break;
    case "HIGHLIGHT_FLIGHT":
      try {
        await openBookingLink(getFlightPenguinId(message.selectedDepartureId, message.selectedReturnId), idMap);
        addBackToSearchButton();
      } catch (e) {
        debugger;
      }
      break;
    case "CLEAR_SELECTION":
      chrome.runtime.sendMessage({ event: "PROVIDER_READY", provider: "cheapoair" });
      break;
    default:
      break;
  }
});

const getAllFlights = async (formData: FlightSearchFormData) => {
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

    await getAllFlights(formData);
  }
};

const getFlightPenguinId = (departureId: string, returnId: string): string => {
  return `${departureId}-${returnId}`;
};

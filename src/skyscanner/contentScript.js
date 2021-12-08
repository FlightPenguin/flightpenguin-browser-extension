window.Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});

import { sendFailedScraper, sendFlightsEvent, sendNoFlightsEvent, sendScraperComplete } from "../shared/events";
import { addBackToSearchButton } from "../shared/ui/backToSearch";
import { getUnsentFlights } from "./parser/getUnsentFlights";
import { closePopupModal } from "./ui/closePopupModal";
import { getMoreResults } from "./ui/getMoreResults";
import { highlightFlightCard } from "./ui/highlightFlightCard";

let continueScraping = true;

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  sendResponse({ received: true, responderName: "skyscanner" });
  console.debug(message);
  switch (message.event) {
    case "BEGIN_PARSING":
      await scrapeFlights(message.formData);
      break;
    case "HIGHLIGHT_FLIGHT":
      continueScraping = false;
      closePopupModal();
      await highlightFlightCard(message.selectedDepartureId, message.selectedReturnId);
      addBackToSearchButton();
      break;
    default:
      break;
  }
});

const scrapeFlights = async (formData) => {
  let totalFlightCount = 0;
  let hasMoreFlights = true;
  try {
    while (totalFlightCount < 100 && hasMoreFlights && continueScraping) {
      closePopupModal();
      const unsentFlights = await getUnsentFlights(formData);
      if (unsentFlights) {
        sendFlightsEvent("skyscanner", unsentFlights);
        totalFlightCount += unsentFlights.length;
        await getMoreResults();
      } else if (totalFlightCount === 0) {
        sendNoFlightsEvent("skyscanner", "BOTH");
        hasMoreFlights = false;
      } else {
        hasMoreFlights = false;
      }
    }
    sendScraperComplete("skyscanner", "BOTH");
  } catch (error) {
    window.Sentry.captureException(error);
    if (!totalFlightCount) {
      sendFailedScraper("skyscanner", error, "BOTH");
    }
  }
};

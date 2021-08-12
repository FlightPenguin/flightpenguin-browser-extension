import { addBackToSearchButton } from "../shared/ui/backToSearch";

window.Sentry.init({
  dsn: "https://d7f3363dd3774a64ad700b4523bcb789@o407795.ingest.sentry.io/5277451",
});

import { sendFailedScraper, sendFlightsEvent, sendNoFlightsEvent } from "../shared/events";
import { getUnsentFlights } from "./parser/getUnsentFlights";
import { getMoreResults } from "./ui/getMoreResults";
import { highlightFlightCard } from "./ui/highlightFlightCard";

chrome.runtime.onMessage.addListener(async function (message) {
  switch (message.event) {
    case "BEGIN_PARSING":
      await scrapeFlights();
      break;
    case "HIGHLIGHT_FLIGHT":
      await highlightFlightCard(message.selectedDepartureId, message.selectedReturnId);
      addBackToSearchButton();
      break;
    default:
      break;
  }
});

const scrapeFlights = async () => {
  let totalFlightCount = 0;
  let hasMoreFlights = true;
  try {
    while (totalFlightCount < 60 && hasMoreFlights) {
      const unsentFlights = await getUnsentFlights();
      if (unsentFlights) {
        sendFlightsEvent("skyscanner", unsentFlights);
        totalFlightCount += unsentFlights.length;
        await getMoreResults();
      } else if (totalFlightCount === 0) {
        sendNoFlightsEvent("skyscanner");
      } else {
        hasMoreFlights = false;
      }
    }
  } catch (error) {
    window.Sentry.captureException(error);
    sendFailedScraper("skyscanner", error);
  }
};

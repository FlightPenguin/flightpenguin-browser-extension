import { MissingElementLookupError, MissingFieldParserError } from "../../shared/errors";
import { ProcessedFlightSearchResult } from "../../shared/types/ProcessedFlightSearchResult";
import { findFlightCard } from "./findFlightCard";

export const reloadForDeparture = async (
  skiplaggedId: string,
  departure: ProcessedFlightSearchResult,
): Promise<void> => {
  const flightCard = (await findFlightCard(skiplaggedId)) as HTMLElement;
  const flights = getFlightAbbreviations(flightCard);
  const newUrl = getNewUrl(flights);
  chrome.runtime.sendMessage({
    event: "RELOAD_SELECTED_DEPARTURE",
    providerName: "skiplagged",
    targetUrl: newUrl,
    departureId: skiplaggedId,
    departure: departure,
  });
};

const getFlightAbbreviations = (flightCard: HTMLElement): string => {
  const airlinesContainer = flightCard.querySelector("span.airlines") as HTMLSpanElement;
  if (!airlinesContainer) {
    throw new MissingElementLookupError("Unable to locate airlines container in flight card");
  }

  const originalTitle = airlinesContainer.dataset?.originalTitle;
  if (!originalTitle) {
    throw new MissingFieldParserError("Unable to parse original title of flight card airlines");
  }

  const parser = new DOMParser();
  const airlinesDoc = parser.parseFromString(originalTitle, "text/html");

  const containers = airlinesDoc.querySelectorAll("span") as NodeListOf<HTMLSpanElement>;
  const flights = Array.from(containers).map((container) => {
    const img = container.querySelector("img");
    if (!img) {
      throw new MissingElementLookupError("Unable to locate airline image in parsed document");
    }
    const airlineAbbreviation = img.src.split("/").slice(-1)[0].split(".")[0];
    const airlineNumber = container.textContent?.split(/\s+/).slice(-1)[0];
    return `${airlineAbbreviation}${airlineNumber}`;
  });
  return flights.join("-");
};

const getNewUrl = (flights: string): string => {
  const currentUrl = window.location.href.split("#")[0];
  return `${currentUrl}#trip=${flights}`;
};

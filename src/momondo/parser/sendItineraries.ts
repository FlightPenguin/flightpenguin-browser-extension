import { sendItinerariesEvent } from "../../shared/events";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { Itinerary } from "../../shared/types/newtypes/Itinerary";
import { stopScrollingCheck } from "../../shared/ui/stopScrolling";
import { clickLoadMoreButton } from "../ui/clickLoadMoreButton";
import { scrollToItineraryCard } from "../ui/scrollToItineraryCard";
import { getItinerary } from "./getItinerary";
import { isComplete } from "./isComplete";
import { shouldSkipCard } from "./shouldSkipCard";

interface SendItinerariesResults {
  complete: boolean;
}

export const sendItineraries = async (
  itineraryCards: HTMLDivElement[],
  formData: FlightSearchFormData,
): Promise<SendItinerariesResults> => {
  const itineraries: Itinerary[] = [];
  for (const itineraryCard of itineraryCards) {
    if (await stopScrollingCheck(false)) {
      continue;
    }

    const skip = shouldSkipCard(itineraryCard);
    if (skip) {
      setVisited(itineraryCard, true);
      continue;
    }

    scrollToItineraryCard(itineraryCard);
    const itinerary = await getItinerary(itineraryCard, formData);
    itineraries.push(itinerary);
    setVisited(itineraryCard);
  }

  if (itineraries.length) {
    sendItinerariesEvent("momondo", itineraries);
  }

  const complete = isComplete();
  if (!complete && !(await stopScrollingCheck(false))) {
    await clickLoadMoreButton();
  }
  return { complete };
};

const setVisited = (itineraryCard: HTMLDivElement, hide = false): void => {
  itineraryCard.dataset.fpVisited = "true";
  if (hide) {
    itineraryCard.style.display = "none";
  }
};

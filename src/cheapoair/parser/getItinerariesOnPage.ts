import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { Itinerary } from "../../shared/types/Itinerary";
import { getContractIds } from "./getContractIds";
import { getItinerary } from "./getItinerary";
import { waitForPageLoad } from "./waitForPageLoad";

const OVERVIEW_SELECTOR = "article[class*='row contract']";

export const getItinerariesOnPage = async (formData: FlightSearchFormData): Promise<Itinerary[]> => {
  await waitForPageLoad();

  const cheapoFlightIds = getContractIds();
  const itineraries = [] as Itinerary[];
  const overviewCards = document.querySelectorAll(OVERVIEW_SELECTOR) as NodeListOf<HTMLElement>;
  let idx = 0;
  for (const overviewCard of overviewCards) {
    const itin = await getItinerary(overviewCard, formData, cheapoFlightIds[idx]);
    if (itin) {
      itineraries.push(itin);
    }
    idx += 1;
  }

  return itineraries;
};

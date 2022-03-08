import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { waitForAppearance } from "../../shared/utilities/waitFor";
import { scrollToFlightCard } from "../ui/scrollToFlightCard";
import { getFlight } from "./getFlight";
import { shouldScrollToPlaceholder } from "./shouldScrollToPlaceholder";
import { shouldSkipCard } from "./shouldSkipCard";

const FLIGHT_CARD_SELECTOR = "div[data-testid*='u-flight-card']";
const VISITED_SELECTOR = "[data-fpid]";

export const setFlightIds = async (formData: FlightSearchFormData): Promise<void> => {
  /* A race condition exists where the user has selected a flight, but trip.com has updated it and our UI hasn't updated.
     By reprocessing untagged flights, we can ensure they are selectable...
  */

  const unmarkedFlightCardSelector = `${FLIGHT_CARD_SELECTOR}:not(${VISITED_SELECTOR})`;
  const flightCards = Array.from(document.querySelectorAll(unmarkedFlightCardSelector) as NodeListOf<HTMLDivElement>);
  const maxIndex = getMaxKnownFlightId();

  if (maxIndex) {
    for (let flightCard of flightCards) {
      const { skip, hide } = shouldSkipCard(flightCard);
      console.log(`Flight card: ${flightCard.dataset.index} skip (${skip}) hide (${hide})`);
      if (skip) {
        if (hide) {
          flightCard.style.display = "none";
          flightCard.dataset.fpVisited = "true";
          continue;
        } else {
          const shouldScroll = shouldScrollToPlaceholder(flightCard, false);
          if (shouldScroll) {
            scrollToFlightCard(flightCard);
            try {
              const innards = await waitForAppearance(1000, "div[class*='result-item']", flightCard);
              if (innards && !!innards.parentElement) {
                flightCard = innards.parentElement as HTMLDivElement;
              } else {
                continue;
              }
            } catch {
              continue;
            }
          }
        }
      }

      const flightCardIndex = Number(flightCard.dataset.index);
      if (flightCardIndex && flightCardIndex <= maxIndex) {
        const flight = await getFlight({ flightCard, formData });
        console.log(`retagged flight ${flight.id}`);
      }
    }
  }
};

const getMaxKnownFlightId = () => {
  const flightCards = document.querySelectorAll(`div${VISITED_SELECTOR}`) as NodeListOf<HTMLDivElement>;
  const lastFlightCard = Array.from(flightCards).slice(-1)[0];
  return Number(lastFlightCard.dataset.index);
};

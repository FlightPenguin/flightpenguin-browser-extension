import { sendScraperComplete } from "../../shared/events";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { sendFlights } from "./sendFlights";

interface FlightObserverProps {
  formData: FlightSearchFormData;
}

const FLIGHT_CARD_SELECTOR = "div[data-testid*='u-flight-card']";

export class FlightObserver {
  private observer: MutationObserver;

  constructor({ formData }: FlightObserverProps) {
    this.observer = new MutationObserver(async function (mutations) {
      const flightCards: HTMLDivElement[] = [];
      for (const mutation of mutations) {
        Array.from(mutation.addedNodes as NodeListOf<HTMLElement>).forEach((element) => {
          if (element.dataset?.index) {
            flightCards.push(element as HTMLDivElement);
          } else {
            const parent = element.closest(FLIGHT_CARD_SELECTOR);
            if (parent) {
              flightCards.push(parent as HTMLDivElement);
            }
          }
        });
      }
      const complete = await sendFlights({ flightCards, formData: formData });
      if (complete) {
        sendScraperComplete("trip", "BOTH");
      }
    });
  }

  beginObservation(flightContainer: HTMLElement): void {
    this.observer.observe(flightContainer, { childList: true, subtree: true });
  }

  endObservation(): void {
    this.observer.disconnect();
  }
}

import { sendScraperComplete } from "../../shared/events";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { sendFlights } from "./sendFlights";

interface FlightObserverProps {
  formData: FlightSearchFormData;
}

export class FlightObserver {
  private observer: MutationObserver;

  constructor({ formData }: FlightObserverProps) {
    this.observer = new MutationObserver(async function (mutations) {
      let flightCards: HTMLElement[] = [];
      for (const mutation of mutations) {
        flightCards = flightCards.concat(Array.from(mutation.addedNodes as NodeListOf<HTMLElement>));
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

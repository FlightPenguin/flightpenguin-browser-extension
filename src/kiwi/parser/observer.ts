import { sendScraperComplete } from "../../shared/events";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { sendFlights } from "./sendFlights";

interface FlightObserverProps {
  formData: FlightSearchFormData;
}

const FLIGHT_CARD_SELECTOR = 'div[data-test="ResultCardWrapper"]';

export class FlightObserver {
  private observer: MutationObserver;

  constructor({ formData }: FlightObserverProps) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    this.observer = new MutationObserver(async function (mutations) {
      const flightCards: HTMLElement[] = [];
      for (const mutation of mutations) {
        Array.from(mutation.addedNodes as NodeListOf<HTMLElement>).forEach((element) => {
          if (element.dataset?.test === "ResultCardWrapper") {
            flightCards.push(element as HTMLDivElement);
          } else {
            const parent = !!element && !!element.closest && (element.closest(FLIGHT_CARD_SELECTOR) as HTMLElement);
            if (parent) {
              flightCards.push(parent as HTMLDivElement);
            }
          }
        });
      }
      if (flightCards.length) {
        const { complete } = await sendFlights({ flightCards, formData: formData });

        if (complete) {
          sendScraperComplete("kiwi", "BOTH");
          that.endObservation();
        }
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

import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { sendFlights } from "./sendFlights";

const FLIGHT_CARD_SELECTOR = "[data-test='ResultCardWrapper']";

interface FlightObserverProps {
  formData: FlightSearchFormData;
}

export class FlightObserver {
  private observer: MutationObserver;
  private formData: FlightSearchFormData;

  constructor({ formData }: FlightObserverProps) {
    this.formData = formData;
    this.observer = new MutationObserver(async function (mutations) {
      let flightCards: HTMLElement[] = [];
      for (const mutation of mutations) {
        flightCards = flightCards.concat(
          Array.from(mutation.addedNodes as NodeListOf<HTMLElement>).filter((element) => {
            return element.dataset.test === "ResultCardWrapper" && element;
          }),
        );
      }
      await sendFlights({ flightCards, formData: formData });
    });
  }

  async beginObservation(flightContainer: HTMLElement): Promise<void> {
    this.observer.observe(flightContainer, { childList: true });
    /*
    Due to race conditions, there may be cards attached when we begin observation.
    Deduplication is already in place downstream, so just greedily grab.
     */
    const flightCards = document.querySelectorAll(FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLDivElement>;
    await sendFlights({ flightCards: Array.from(flightCards), formData: this.formData });
  }

  endObservation(): void {
    this.observer.disconnect();
  }
}

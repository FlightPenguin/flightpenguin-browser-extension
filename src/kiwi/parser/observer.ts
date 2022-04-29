import debounce from "lodash.debounce";

import { sendFailedScraper, sendScraperComplete } from "../../shared/events";
import { sendFailed, sendSuccess } from "../../shared/events/analytics/scrapers";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { sendFlights } from "./sendFlights";

interface FlightObserverProps {
  formData: FlightSearchFormData;
}

const FLIGHT_CARD_SELECTOR = 'div[data-test="ResultCardWrapper"]';

export class FlightObserver {
  private observer: MutationObserver;
  private flightCards: HTMLDivElement[];
  private formData: FlightSearchFormData;
  private flightCount;

  constructor({ formData }: FlightObserverProps) {
    this.flightCount = 0;
    this.flightCards = [];
    this.formData = formData;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    this.observer = new MutationObserver(async function (mutations) {
      for (const mutation of mutations) {
        Array.from(mutation.addedNodes as NodeListOf<HTMLElement>).forEach((element) => {
          if (element.dataset?.test === "ResultCardWrapper") {
            that.flightCards.push(element as HTMLDivElement);
          } else {
            const parent = !!element && !!element.closest && (element.closest(FLIGHT_CARD_SELECTOR) as HTMLElement);
            if (parent) {
              that.flightCards.push(parent as HTMLDivElement);
            }
          }
        });
      }
      const debouncedSendFlights = debounce(that.sendItineraries.bind(that), 300, { maxWait: 1000 });
      debouncedSendFlights();
    });
  }

  beginObservation(flightContainer: HTMLElement): void {
    this.observer.observe(flightContainer, { childList: true, subtree: true });
  }

  endObservation(): void {
    this.observer.disconnect();
  }

  async sendItineraries(): Promise<void> {
    console.log("sending");
    const flightCards = [] as HTMLDivElement[];
    let hasMoreFlightCards = this.flightCards.length;
    while (hasMoreFlightCards) {
      const flightCard = this.flightCards.pop();
      flightCards.push(flightCard as HTMLDivElement);
      hasMoreFlightCards = this.flightCards.length;
    }
    console.debug(`Processing ${flightCards.length} cards, ${this.flightCards.length} remaining`);
    this.flightCount += flightCards.length;

    if (flightCards.length) {
      try {
        // eslint-disable-next-line prefer-const
        const { complete } = await sendFlights({ flightCards, formData: this.formData });
        if (complete) {
          sendScraperComplete("kiwi");
          sendSuccess("kiwi", this.flightCount);
          this.endObservation();
        }
      } catch (error) {
        this.endObservation();
        console.error(error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Sentry.captureException(error);
        sendFailedScraper("kiwi", error);
        sendFailed("kiwi");
      }
    }
  }
}

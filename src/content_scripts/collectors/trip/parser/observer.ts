import * as Sentry from "@sentry/browser";
import debounce from "lodash.debounce";

import { sendFailedScraper, sendScraperComplete } from "../../../../shared/events";
import { sendFailed, sendSuccess } from "../../../../shared/events/analytics/scrapers";
import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { sendItineraries } from "./sendItineraries";

interface FlightObserverProps {
  formData: FlightSearchFormData;
}

const FLIGHT_CARD_SELECTOR = "div[data-testid*='u-flight-card']";

export class FlightObserver {
  private observer: MutationObserver;
  private flightCards: HTMLDivElement[];
  private formData: FlightSearchFormData;
  private counter: number;

  constructor({ formData }: FlightObserverProps) {
    this.counter = 0;
    this.flightCards = [];
    this.formData = formData;

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    this.observer = new MutationObserver(async function (mutations) {
      for (const mutation of mutations) {
        Array.from(mutation.addedNodes as NodeListOf<HTMLElement>).forEach((element) => {
          if (element.dataset?.index) {
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
    const flightCards = [] as HTMLDivElement[];
    let hasMoreFlightCards = this.flightCards.length;
    while (hasMoreFlightCards) {
      const flightCard = this.flightCards.pop();
      flightCards.push(flightCard as HTMLDivElement);
      hasMoreFlightCards = this.flightCards.length;
    }
    console.debug(`Processing ${flightCards.length} cards, ${this.flightCards.length} remaining`);
    this.counter += flightCards.length;

    if (flightCards.length) {
      try {
        // eslint-disable-next-line prefer-const
        let { complete } = await sendItineraries({ flightCards, formData: this.formData });
        if (complete) {
          sendScraperComplete("trip");
          sendSuccess("trip", this.counter);
        }
      } catch (error) {
        this.endObservation();
        console.error(error);
        Sentry.captureException(error);
        sendFailedScraper("trip", error);
        sendFailed("trip");
      }
    }
  }
}

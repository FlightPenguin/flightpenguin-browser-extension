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
  private flightCount;

  constructor({ formData }: FlightObserverProps) {
    this.flightCount = 0;
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
        that.flightCount += flightCards.length;
        try {
          const { complete } = await sendFlights({ flightCards, formData: formData });

          if (complete) {
            sendScraperComplete("kiwi");
            sendSuccess("kiwi", that.flightCount);
            that.endObservation();
          }
        } catch (error) {
          that.endObservation();
          console.error(error);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.Sentry.captureException(error);
          sendFailedScraper("kiwi", error);
          sendFailed("kiwi");
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

import { sendFailedScraper, sendScraperComplete } from "../../shared/events";
import { sendFailed, sendSuccess } from "../../shared/events/analytics/scrapers";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { stopScrollingNow } from "../../shared/ui/stopScrolling";
import { sendFlights } from "./sendFlights";

interface FlightObserverProps {
  formData: FlightSearchFormData;
}

const FLIGHT_CARD_SELECTOR = "div[data-testid*='u-flight-card']";

export class FlightObserver {
  private observer: MutationObserver;
  private flightPenguinIdToIndexMap: { [keyOf: string]: string };

  constructor({ formData }: FlightObserverProps) {
    this.flightPenguinIdToIndexMap = {};

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    this.observer = new MutationObserver(async function (mutations) {
      const flightCards: HTMLDivElement[] = [];
      for (const mutation of mutations) {
        Array.from(mutation.addedNodes as NodeListOf<HTMLElement>).forEach((element) => {
          if (element.dataset?.index) {
            flightCards.push(element as HTMLDivElement);
          } else {
            const parent = !!element && !!element.closest && (element.closest(FLIGHT_CARD_SELECTOR) as HTMLElement);
            if (parent) {
              flightCards.push(parent as HTMLDivElement);
            }
          }
        });
      }
      try {
        // eslint-disable-next-line prefer-const
        let { complete, idToIndexMap: batchMap } = await sendFlights({ flightCards, formData: formData });
        Object.entries(batchMap).forEach(([flightPenguinId, indexValue]) => {
          that.flightPenguinIdToIndexMap[flightPenguinId] = indexValue;
        });
        if (Object.keys(that.flightPenguinIdToIndexMap).length >= 100) {
          stopScrollingNow("reached max flights");
        }
        if (complete) {
          sendScraperComplete("trip", "BOTH");
          sendSuccess("trip", Object.keys(that.flightPenguinIdToIndexMap).length);
        }
      } catch (error) {
        that.endObservation();
        console.error(error);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.Sentry.captureException(error);
        sendFailedScraper("trip", error, "ALL");
        sendFailed("trip");
      }
    });
  }

  beginObservation(flightContainer: HTMLElement): void {
    this.observer.observe(flightContainer, { childList: true, subtree: true });
  }

  endObservation(): void {
    this.observer.disconnect();
  }

  getFlightIndex(flightPenguinId: string) {
    return this.flightPenguinIdToIndexMap[flightPenguinId];
  }
}

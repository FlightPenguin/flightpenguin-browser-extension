import { sendScraperComplete } from "../../shared/events";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
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
      const { complete, idToIndexMap: batchMap } = await sendFlights({ flightCards, formData: formData });
      Object.entries(batchMap).forEach(([flightPenguinId, indexValue]) => {
        that.flightPenguinIdToIndexMap[flightPenguinId] = indexValue;
      });
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

  getFlightIndex(flightPenguinId: string) {
    return this.flightPenguinIdToIndexMap[flightPenguinId];
  }
}

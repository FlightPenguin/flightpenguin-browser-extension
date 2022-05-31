import * as Sentry from "@sentry/browser";

import { sendFailedScraper, sendScraperComplete } from "../../shared/events";
import { sendFailed, sendSuccess } from "../../shared/events/analytics/scrapers";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { sendItineraries } from "./sendItineraries";

interface ItineraryObserverProps {
  formData: FlightSearchFormData;
}

const ITINERARY_CARD_SELECTOR = 'div[class*="Flights-Results-FlightResultItem"]';

export class ItineraryObserver {
  private observer: MutationObserver;
  private itineraryCount;

  constructor({ formData }: ItineraryObserverProps) {
    this.itineraryCount = 0;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    this.observer = new MutationObserver(async function (mutations) {
      const itineraryCards: HTMLDivElement[] = [];
      try {
        for (const mutation of mutations) {
          Array.from(mutation.addedNodes as NodeListOf<HTMLElement>).forEach((element) => {
            if (element.tagName === "DIV") {
              const localItineraryCards = element.querySelectorAll(ITINERARY_CARD_SELECTOR);
              if (localItineraryCards.length) {
                localItineraryCards.forEach((card) => itineraryCards.push(card as HTMLDivElement));
              }
            } else if (element.dataset?.resultid) {
              itineraryCards.push(element as HTMLDivElement);
            } else {
              const parent =
                !!element && !!element.closest && (element.closest(ITINERARY_CARD_SELECTOR) as HTMLElement);
              if (parent) {
                itineraryCards.push(parent as HTMLDivElement);
              }
            }
          });
        }
      } catch (error) {
        that.endObservation();
        console.error(error);
        Sentry.captureException(error);
        sendFailedScraper("momondo", error);
        sendFailed("momondo");
      }

      if (itineraryCards.length) {
        that.itineraryCount += itineraryCards.length;
        try {
          const { complete } = await sendItineraries(itineraryCards, formData);

          if (complete) {
            sendScraperComplete("momondo");
            sendSuccess("momondo", that.itineraryCount);
            that.endObservation();
          }
        } catch (error) {
          that.endObservation();
          console.error(error);
          Sentry.captureException(error);
          sendFailedScraper("momondo", error);
          sendFailed("momondo");
        }
      }
    });
  }

  beginObservation(resultsContainer: HTMLElement): void {
    this.observer.observe(resultsContainer, { childList: true, subtree: true });
  }

  endObservation(): void {
    this.observer.disconnect();
  }
}

import { sendFlights } from "./sendFlights";

export class FlightObserver {
  private observer: MutationObserver;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    this.observer = new MutationObserver(async function (mutations) {
      let flightCards: HTMLElement[] = [];
      for (const mutation of mutations) {
        flightCards = flightCards.concat(
          Array.from(mutation.addedNodes as NodeListOf<HTMLElement>).filter((element) => {
            return element.dataset.test === "ResultCardWrapper" && element;
          }),
        );
      }
      await sendFlights(flightCards);
    });
  }

  beginObservation(flightContainer: HTMLElement): void {
    this.observer.observe(flightContainer, { childList: true });
  }

  endObservation(): void {
    this.observer.disconnect();
  }
}

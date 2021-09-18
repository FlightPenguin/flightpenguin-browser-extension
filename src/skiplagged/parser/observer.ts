import { FlightMap } from "./constants";
import { sendFlights } from "./sendFlights";

export class FlightObserver {
  private observer: MutationObserver;
  private flightMap: FlightMap;

  constructor(selectedFlight = null) {
    this.flightMap = {};

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    this.observer = new MutationObserver(async function (mutations) {
      let flightCards: HTMLElement[] = [];
      for (const mutation of mutations) {
        flightCards = flightCards.concat(Array.from(mutation.addedNodes) as HTMLElement[]);
      }
      const newFlightMaps = await sendFlights(flightCards, that.flightMap, selectedFlight);
      that.addNewFlightsToMap(newFlightMaps);
    });
  }

  addNewFlightsToMap(mappings: FlightMap): void {
    for (const flightPenguinId in mappings) {
      const { skiplaggedId, lastUpdatedAt } = mappings[flightPenguinId];
      const currentRecord = this.flightMap[flightPenguinId];
      if (currentRecord) {
        if (currentRecord.skiplaggedId !== skiplaggedId && lastUpdatedAt > currentRecord.lastUpdatedAt) {
          this.flightMap[flightPenguinId] = { skiplaggedId, lastUpdatedAt };
        }
      } else {
        this.flightMap[flightPenguinId] = { skiplaggedId, lastUpdatedAt };
      }
    }
  }

  getSkiplaggedId(flightPenguinId: string): string {
    return this.flightMap[flightPenguinId]["skiplaggedId"];
  }

  beginObservation(flightContainer: HTMLElement): void {
    this.observer.observe(flightContainer, { childList: true });
  }

  endObservation(): void {
    this.observer.disconnect();
  }

  getFlightMap(): FlightMap {
    return this.flightMap;
  }
}

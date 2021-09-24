import { sendFlightsEvent } from "../../shared/events";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { getFlight } from "./getFlight";

export const sendFlights = async (flightCards: Node[]): Promise<void> => {
  const flights: UnprocessedFlightSearchResult[] = [];

  for (const node of flightCards) {
    const flightCard = node as HTMLDivElement;
    if (shouldSkipCard(flightCard)) {
      flightCard.style.display = "none";
      continue;
    }

    const flight = await getFlight(flightCard);
    flights.push(flight);
  }

  if (flights.length) {
    sendFlightsEvent("kiwi", flights);
  }
};

const shouldSkipCard = (flightCard: HTMLDivElement): boolean => {
  const denyListTerms = ["travel hack", "no-checked-bag"];
  const ignoreIfMissing = ["show details"];

  return (
    denyListTerms.some((term) => flightCard.textContent?.toLowerCase().includes(term)) ||
    ignoreIfMissing.some((term) => !flightCard.textContent?.toLowerCase().includes(term))
  );
};
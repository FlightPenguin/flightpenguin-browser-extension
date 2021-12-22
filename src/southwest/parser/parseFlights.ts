import { sendFlightsEvent, sendNoFlightsEvent } from "../../shared/events";
import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { SearchResult } from "../types/SearchResult";
import { getUnprocessedSearchResults } from "./getUnprocessedSearchResults";

export const parseFlights = (searchResults: SearchResult): UnprocessedFlightSearchResult[] => {
  if (!searchResults) {
    return [];
  }
  const [departures, returns] = searchResults.airProducts;
  if ((departures && departures.details.length === 0) || (returns && returns.details.length === 0)) {
    sendNoFlightsEvent("southwest", "BOTH");
    return [];
  }
  const departureFlights = departures.details;
  const returnFlights = returns ? returns.details : [];
  const results = getUnprocessedSearchResults({ departures: departureFlights, returns: returnFlights });
  sendFlightsEvent("southwest", results);
  return results;
};

import { UnprocessedFlightSearchResult } from "../../shared/types/UnprocessedFlightSearchResult";
import { Flight } from "../types/Flight";
import { getFare } from "./getFare";
import { getFlightDetails } from "./getFlightDetails";

interface GetUnprocessedSearchResultsProps {
  departures: Flight[];
  returns: Flight[];
}

export const getUnprocessedSearchResults = ({
  departures,
  returns,
}: GetUnprocessedSearchResultsProps): UnprocessedFlightSearchResult[] => {
  const roundtrip = returns.length > 0;
  const itineraries: UnprocessedFlightSearchResult[] = [];
  departures.forEach((departureItem) => {
    const departureFlight = getFlightDetails({ flight: departureItem });
    const departureFare = getFare({ flight: departureItem });
    if (roundtrip) {
      returns.forEach((returnItem) => {
        const returnFlight = getFlightDetails({ flight: returnItem });
        const returnFare = getFare({ flight: returnItem });
        itineraries.push({
          departureFlight,
          returnFlight,
          fare: `${Number(departureFare) + Number(returnFare)}`,
          id: `${departureFlight.id}-${returnFlight.id}`,
        });
      });
    } else {
      itineraries.push({
        departureFlight,
        returnFlight: null,
        fare: departureFare,
        id: departureFlight.id,
      });
    }
  });
  return itineraries;
};

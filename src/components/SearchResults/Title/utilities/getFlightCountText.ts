interface GetFlightCountTextProps {
  loading: boolean;
  flightCount: number;
  filteredFlightCount: number;
}

export const getFlightCountText = ({ loading, flightCount, filteredFlightCount }: GetFlightCountTextProps): string => {
  if (flightCount < 1) {
    return loading ? "Searching for flights..." : "";
  } else {
    if (filteredFlightCount !== flightCount) {
      return `Showing ${filteredFlightCount} of ${flightCount}${loading ? "+" : ""} flights`;
    } else {
      return `${flightCount}${loading ? "+" : ""} flights`;
    }
  }
};

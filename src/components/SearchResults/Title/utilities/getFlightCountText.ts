interface GetFlightCountTextProps {
  loading: boolean;
  flightCount: number;
}

export const getFlightCountText = ({ loading, flightCount }: GetFlightCountTextProps): string => {
  if (flightCount < 1) {
    return loading ? "Searching for flights..." : "";
  } else {
    return `${flightCount}${loading ? "+" : ""} flights`;
  }
};

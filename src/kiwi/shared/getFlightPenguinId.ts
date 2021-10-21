export const getFlightPenguinId = (departureFlightId: string, returnFlightId: string | null): string => {
  if (returnFlightId) {
    return `${departureFlightId}-${returnFlightId}`;
  }
  return `${departureFlightId}`;
};

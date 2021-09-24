export const getFlightPenguinId = (departureFlightId: string, returnFlightId: string) => {
  return `${departureFlightId}-${returnFlightId}`;
};

import { Flight } from "../../../Flight";

const AWFUL_CARRIERS = [
  // lowercase only key words
  "allegiant",
  "frontier",
  "ryanair",
  "scoot",
  "spirit",
  "sun country",
];

export const getAwfulCarrierMultiplier = (flight: Flight): number => {
  return AWFUL_CARRIERS.some((shortNameString) => flight.getAirline().getName().includes(shortNameString)) ? 0.9 : 0;
};

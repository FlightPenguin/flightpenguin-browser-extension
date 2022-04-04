import { Flight } from "../../../Flight";
import { getAwfulCarrierMultiplier } from "./getAwfulCarrierMultiplier";

export const getFlightMultiplier = (flight: Flight): number => {
  let multiplier = 1;

  const awfulCarrierTax = getAwfulCarrierMultiplier(flight);
  multiplier += awfulCarrierTax;

  return multiplier;
};

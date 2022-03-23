import { Layover } from "../../../Layover";
import { getLongDurationMultiplier } from "./getLongDurationMultiplier";
import { getOvernightMultiplier } from "./getOvernightMultiplier";
import { getShortDurationMultiplier } from "./getShortDurationMultiplier";
import { getTransferMultiplier } from "./getTransferMultiplier";

export const getLayoverMultiplier = (layover: Layover): number => {
  let multiplier = 2; // inherent tax for not being in the air

  const transferTax = getTransferMultiplier(layover);
  multiplier += transferTax;

  const shortTax = getShortDurationMultiplier(layover);
  multiplier += shortTax;

  const overnightTax = getOvernightMultiplier(layover);
  const isOvernight = !!overnightTax;
  multiplier += overnightTax;

  if (!shortTax) {
    const longTax = getLongDurationMultiplier(layover, isOvernight);
    multiplier += longTax;
  }

  return multiplier;
};

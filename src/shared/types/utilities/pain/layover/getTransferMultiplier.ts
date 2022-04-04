import { Layover } from "../../../Layover";

export const getTransferMultiplier = (layover: Layover): number => {
  return layover.isTransfer() ? 10 : 0;
};

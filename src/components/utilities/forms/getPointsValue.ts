import { PaymentType, PointsMap } from "../../constants";

export const getPointsValue = (fareValue: number, paymentType: PaymentType): number => {
  if (paymentType === "CASH") {
    throw new Error("Cannot get points from cash");
  }
  return Math.floor(fareValue / PointsMap[paymentType]);
};

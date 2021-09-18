import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { PaymentType } from "../../constants";

export const getPaymentType = (formData: FlightSearchFormData): PaymentType => {
  return formData.searchByPoints ? formData.pointsType : "CASH";
};

import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { FlightSearchDetails } from "../typings/FlightSearchDetails";
import { cabinMap } from "./cabinMap";
import { tripTypeMap } from "./tripType";

export const getQueryParams = (formData: FlightSearchFormData): FlightSearchDetails => {
  const payloadData = {
    d1: formData.from.value,
    r1: formData.to.value,
    dt1: formData.fromDate,
    tripType: formData.roundtrip ? tripTypeMap.roundtrip : tripTypeMap.oneway,
    cl: cabinMap[formData.cabin || "econ"],
    ad: formData.numPax,
    se: 0,
    ch: 0,
    infs: 0,
    infl: 0,
    timestamp: new Date().valueOf() / 1000,
    currency: "USD",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  } as FlightSearchDetails;
  if (formData.roundtrip) {
    payloadData["dt2"] = formData.toDate;
    payloadData["d2"] = formData.to.value;
    payloadData["r2"] = formData.from.value;
  }
  return payloadData;
};

export const getUrl = (formData: FlightSearchFormData): string => {
  const url = new URL("https://www.cheapoair.com/air/listing");
  const payload = getQueryParams(formData);

  Object.entries(payload).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  return url.toString();
};

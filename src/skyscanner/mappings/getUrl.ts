import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { cabinMap } from "./cabin";

export const getUrl = (formData: FlightSearchFormData): string => {
  const { from, to, fromDate, toDate, numPax, cabin, roundtrip } = formData;
  const startDate = fromDate.replace(/-/g, "").slice(2);

  let url = `https://www.skyscanner.com/transport/flights/${from}/${to}/${startDate}/`;

  if (roundtrip) {
    const endDate = toDate.replace(/-/g, "").slice(2);
    url += `${endDate}/`;
  }

  return `${url}?adults=${numPax}&children=0&adultsv2=${numPax}&childrenv2=&infants=0&cabinclass=${
    cabinMap[cabin || "econ"]
  }`;
};

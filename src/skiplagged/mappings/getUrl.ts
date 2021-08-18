import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";

export const getUrl = (formData: FlightSearchFormData): string => {
  const { from, to, fromDate, toDate, numPax, roundtrip } = formData;

  let url = `https://skiplagged.com/flights/${from.toUpperCase()}/${to.toUpperCase()}/${fromDate}`;
  if (roundtrip) {
    url += `/${toDate}`;
  }
  url += `?adults=${numPax}`;

  return url;
};

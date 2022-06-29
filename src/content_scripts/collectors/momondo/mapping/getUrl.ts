// https://www.momondo.com/flight-search/DTW-NYC/2022-04-08/2022-04-08/economy?sort=bestflight_a

import { getParsedDate } from "../../../../components/utilities/forms";
import { getChromeFormattedDateFromDate } from "../../../../components/utilities/forms/getChromeFormattedDateFromDate";
import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { cabinFilterMap, cabinMap } from "./cabin";

export const getUrl = (formData: FlightSearchFormData): string => {
  const cabinValue = cabinMap[formData.cabin || "econ"];
  const cabinFilterValue = cabinFilterMap[formData.cabin || "econ"];
  const from = formData.from.value.toUpperCase();
  const to = formData.to.value.toUpperCase();
  const dDate = getChromeFormattedDateFromDate(getParsedDate(formData.fromDate));
  const aDate = getChromeFormattedDateFromDate(getParsedDate(formData.toDate));

  let url = `https://www.momondo.com/flight-search/${from}-${to}/${dDate}`;
  if (formData.roundtrip) {
    url = `${url}/${aDate}`;
  }
  url = `${url}/${cabinValue}/${formData.numPax}adults?sort=bestflight_a&fs=cabin=${cabinFilterValue}`;
  return url;
};

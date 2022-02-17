import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { cabinMap } from "./cabin";

export const getUrl = (formData: FlightSearchFormData): string => {
  /**
   * URLs from search results page, different from a search from the homepage
   * oneway
   * https://www.expedia.com/Flights-Search?mode=search&trip=oneway&leg1=from:SFO,to:JFK,departure:12/20/2020TANYT&leg2=from:JFK,to:SFO,departure:12/23/2020TANYT&passengers=adults:1,children:0,infantinlap:N&options=carrier:*,cabinclass:economy,maxhops:1,nopenalty:N&pageId=0
   *
   * roundtrip
   * https://www.expedia.com/Flights-Search?mode=search&trip=roundtrip&leg1=from:SFO,to:JFK,departure:12/20/2020TANYT&leg2=from:JFK,to:SFO,departure:12/25/2020TANYT&passengers=adults:1,children:0,infantinlap:N&options=carrier:*,cabinclass:first,maxhops:1,nopenalty:N&pageId=0
   *
   **/

  const { from, to, fromDate, toDate, numPax, cabin, roundtrip } = formData;
  const startDate = formatDate(fromDate);
  const tripType = roundtrip ? "roundtrip" : "oneway";
  let url = `https://www.expedia.com/Flights-Search?mode=search&trip=${tripType}&leg1=from:${from.value.toUpperCase()},to:${to.value.toUpperCase()},departure:${startDate}TANYT&leg2=from:${to.value.toUpperCase()},to:${from.value.toUpperCase()},`;

  if (roundtrip) {
    const endDate = formatDate(toDate);
    url += `departure:${endDate}TANYT`;
  } else {
    url += `departure:${startDate}TANYT`;
  }
  url += `&passengers=adults:${numPax},children:0,seniors:0,infantinlap:N&options=carrier:*,`;
  url += `cabinclass:${cabinMap[cabin || "econ"]},`;
  url += "maxhops:1,nopenalty:N&pageId=0";
  return url;
};

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  return [month, day, year].join("/");
};

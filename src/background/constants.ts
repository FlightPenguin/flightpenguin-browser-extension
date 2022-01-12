export const EXTENSION_URL = "chrome-extension://nofndgfpjopdpbcejgdpikmpdehlekac/index.html";

export const PROVIDERS_NEEDING_RETURNS = [
  // force expansion
  "expedia",
];
export const PROVIDERS_SUPPORTING_POINTS_SEARCH = ["expedia"];
export const SUPPORTED_PROVIDERS = [
  // force expansion
  // "expedia",
  // "kiwi",
  "southwest",
  // "trip",
];

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const DEFAULT_ON_READY_FUNCTION = () => {};

export type SearchType = "DEPARTURE" | "RETURN" | "BOTH";
export type FlightType = "DEPARTURE" | "RETURN";
export const CabinMap = {
  econ: "Economy",
  prem_econ: "Premium Economy",
  business: "Business",
  first: "First",
};
export type CabinType = "econ" | "prem_econ" | "business" | "first";

export const API_HOST =
  `${process.env.EXTENSION_ENV}` === "development" ? "http://localhost:3000" : "https://subscribe.flightpenguin.com";

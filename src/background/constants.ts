export const PROVIDERS_NEEDING_RETURNS = ["expedia", "skiplagged"];
export const PROVIDERS_SUPPORTING_POINTS_SEARCH = ["expedia"];
export const SUPPORTED_PROVIDERS = ["skiplagged"];

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

export const PROVIDERS_NEEDING_RETURNS = [
  // force expansion
] as string[];
export const PROVIDERS_SUPPORTING_POINTS_SEARCH = ["expedia"];
export const SUPPORTED_PROVIDERS = [
  // force expansion
  "cheapoair",
  "momondo",
  "kiwi",
  "trip",
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

export const NO_ALLIANCE = "ZNo Alliance"; // leading z is a hack to force this to end of the sort

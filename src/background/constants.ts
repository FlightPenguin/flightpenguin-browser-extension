export const EXTENSION_URL = "chrome-extension://nofndgfpjopdpbcejgdpikmpdehlekac/index.html";

export const PROVIDERS_NEEDING_RETURNS = [
  // force expansion
  "expedia",
];
export const PROVIDERS_SUPPORTING_POINTS_SEARCH = ["expedia"];
export const SUPPORTED_PROVIDERS = [
  // force expansion
  "cheapoair",
  "expedia",
  "kiwi",
  // "southwest",
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

export const FIREBASE_CONFIG = {
  appId: `1:${process.env.FIREBASE_PROJECT_NUMBER}:web:f9f968ca6c2c8ce76ea2e5`,
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: "firebase.flightpenguin.com",
  measurementId: "G-QBJMPED0J4",
  messagingSenderId: `${process.env.FIREBASE_PROJECT_NUMBER}`,
  projectId: `${process.env.FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
};

import { Airport } from "../../SearchForm/api/airports/Airport";
import { STORAGE_NEARBY_AIRPORTS_KEY_NAME } from "./constants";

export const getNearestRelevantAirport = (): Airport => {
  const rawAirports = localStorage.getItem(STORAGE_NEARBY_AIRPORTS_KEY_NAME);
  return rawAirports
    ? JSON.parse(rawAirports)["options"][0]
    : { value: "", label: "", key: "", location: "", name: "" };
};

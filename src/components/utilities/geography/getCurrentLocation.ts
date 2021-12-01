import { STORAGE_COORDINATES_KEY_NAME } from "./constants";

export const getCurrentLocation = (): GeolocationPosition | null => {
  const rawPosition = localStorage.getItem(STORAGE_COORDINATES_KEY_NAME);
  return rawPosition ? (JSON.parse(rawPosition) as GeolocationPosition) : null;
};

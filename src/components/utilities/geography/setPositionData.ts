import { STORAGE_COORDINATES_KEY_NAME, STORAGE_NEARBY_AIRPORTS_KEY_NAME } from "./constants";
import { getNearbyAirportData } from "./getNearbyAirportData";

const setLocalStorageForAirports = async (position: GeolocationPosition): Promise<void> => {
  const nearbyAirports = await getNearbyAirportData({ position: position, page: 0 });
  if (nearbyAirports.options.length) {
    localStorage.setItem(STORAGE_NEARBY_AIRPORTS_KEY_NAME, JSON.stringify(nearbyAirports));
  }
};

const getPositionData = async (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    return navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 1000, // 1s
      maximumAge: 7200000, // 2h
    });
  });
};

export const setPositionData = async (): Promise<void> => {
  const position = await getPositionData();
  await setLocalStorageForAirports(position);
};

import { STORAGE_COORDINATES_KEY_NAME, STORAGE_NEARBY_AIRPORTS_KEY_NAME } from "./constants";
import { getNearbyAirportData } from "./getNearbyAirportData";

const setLocalStorage = async (point: GeolocationPosition): Promise<void> => {
  localStorage.setItem(STORAGE_COORDINATES_KEY_NAME, JSON.stringify(point));

  const nearbyAirports = await getNearbyAirportData({ coordinates: point, page: 0 });
  if (nearbyAirports.options.length) {
    localStorage.setItem(STORAGE_NEARBY_AIRPORTS_KEY_NAME, JSON.stringify(nearbyAirports));
  }
};

const clearLocalStorage = (error: GeolocationPositionError): void => {
  localStorage.removeItem(STORAGE_COORDINATES_KEY_NAME);
  localStorage.removeItem(STORAGE_NEARBY_AIRPORTS_KEY_NAME);
  throw error;
};

export const setPositionData = (): void => {
  navigator.geolocation.getCurrentPosition(setLocalStorage, clearLocalStorage, {
    enableHighAccuracy: false,
    timeout: 1000, // 1s
    maximumAge: 7200000, // 2h
  });
};

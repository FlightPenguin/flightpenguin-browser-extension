import axios from "axios";

import { getAuthToken } from "../../../auth/getAuthToken";
import { API_HOST } from "../../../background/constants";
import { Airport } from "../../SearchForm/api/airports/Airport";

interface GetNearbyAirportDataProps {
  latitude: number;
  longitude: number;
  page: number;
}

export const getNearbyAirportData = async ({
  latitude,
  longitude,
  page,
}: GetNearbyAirportDataProps): Promise<Airport | null> => {
  const accessToken = await getAuthToken(false);
  try {
    const response = await axios.get(
      `${API_HOST}/api/airport/location?latitude=${latitude}&longitude=${longitude}&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        timeout: 3000,
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      const airports = response.data.map((record: any) => {
        return {
          key: record.iataCode,
          label: record.iataCode,
          name: record.displayName,
          location: record.displayLocation,
          value: record.iataCode,
        };
      }) as Airport[];
      return airports[0];
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const CACHE_KEY = "fp-local-airport";

export const setNearbyAirportCache = (airport: Airport): void => {
  const cacheValue = JSON.stringify({ airport });
  localStorage.setItem(CACHE_KEY, cacheValue);
};

export const getNearbyAirportFromCache = () => {
  const cacheValue = JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  if (!!cacheValue && cacheValue.airport) {
    return cacheValue.airport;
  }
  return null;
};

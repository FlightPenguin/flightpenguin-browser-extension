import { getAuthToken } from "../../../auth/getAuthToken";
import ORIGIN from "../../../config";
import { Airport } from "../../SearchForm/api/airports/Airport";

interface GetNearbyAirportDataProps {
  position: GeolocationPosition;
  page: number;
}

export const getNearbyAirportData = async ({
  position,
  page,
}: GetNearbyAirportDataProps): Promise<{ options: Airport[] }> => {
  const accessToken = await getAuthToken();
  const response = await fetch(
    `${ORIGIN}/api/airport/location?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&page=${page}`,
    {
      method: "GET",
      credentials: "include",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }),
    },
  );

  if (response.status === 200) {
    const rawAirports = await response.json();
    const airports = rawAirports.map((record: any) => {
      return {
        key: record.iataCode,
        label: record.iataCode,
        name: record.displayName,
        location: record.displayLocation,
        value: record.iataCode,
      };
    }) as Airport[];
    return { options: airports };
  } else {
    throw new Error(`${response.status}: ${response.json()}`);
  }
};
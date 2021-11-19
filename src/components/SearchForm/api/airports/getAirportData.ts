import { getAuthToken } from "../../../../auth/getAuthToken";
import ORIGIN from "../../../../config";
import { Airport } from "./Airport";

interface GetAirportDataProps {
  search: string;
  page: number;
}

export const getAirportData = async ({ search, page }: GetAirportDataProps): Promise<{ options: Airport[] }> => {
  if (search.length === 0) {
    return { options: [] };
  }

  const accessToken = await getAuthToken();
  const response = await fetch(`http://localhost:3000/api/airport/search?search=${search}&page=${page}`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    }),
  });

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

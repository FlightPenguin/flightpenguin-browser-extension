import { getAuthToken } from "../../../../auth/getAuthToken";
import { API_HOST } from "../../../../background/constants";
import { Airport } from "./Airport";

interface GetAirportDataProps {
  search: string;
  page: number;
}

export const getAirportData = async ({
  search,
  page,
}: GetAirportDataProps): Promise<{ options: Airport[]; status: boolean }> => {
  if (search.length === 0) {
    return { options: [], status: true };
  }

  const accessToken = await getAuthToken(false);
  const response = await fetch(`${API_HOST}/api/airport/search?search=${search}&page=${page}`, {
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
    return { options: airports, status: true };
  }
  return { options: [], status: false };
};

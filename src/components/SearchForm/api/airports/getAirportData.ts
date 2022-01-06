import axios from "axios";

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
  const response = await axios.get(`${API_HOST}/api/airport/search?search=${search}&page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    timeout: 3000,
    withCredentials: true,
  });

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
    return { options: airports, status: true };
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.Sentry.captureBreadcrumb({
    message: "Failed airport search",
    category: "form",
    data: {
      searchText: search,
      page: page,
      statusCode: response.status,
      reason: response.statusText,
    },
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.Sentry.captureException(new Error("Airport search failed"));
  return { options: [], status: false };
};

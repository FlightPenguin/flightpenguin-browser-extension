import axios from "axios";

import { getAuthToken } from "../../../../auth/getAuthToken";
import { API_HOST } from "../../../../background/constants";
import { HttpError } from "../../../../shared/errors";
import { Airport } from "./Airport";

interface GetAirportDataProps {
  search: string;
  page: number;
  onAuthError: () => void;
  retry401?: boolean;
}

export const getAirportData = async ({
  search,
  page,
  onAuthError,
  retry401 = true,
}: GetAirportDataProps): Promise<{ options: Airport[]; status: boolean }> => {
  if (search.length === 0) {
    return { options: [], status: true };
  }

  const accessToken = await getAuthToken(false);
  if (!accessToken) {
    onAuthError();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Sentry.captureException(new Error("Airport search failed - not logged in"));
    return { options: [], status: false };
  }

  try {
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
    window.Sentry.captureException(new HttpError("Airport search failed", response.status, response.statusText));
    return { options: [], status: false };
  } catch (error) {
    console.log("in error handling");
    const data: { [keyof: string]: string | number } = { searchText: search, page: page };

    if (error.response) {
      data["response"] = error.response;
      if (error.response.status === 401) {
        if (retry401) {
          chrome.identity.removeCachedAuthToken({ token: accessToken });
          return await getAirportData({ search, page, onAuthError, retry401: false });
        }
      }
    }

    onAuthError();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Sentry.captureException(error);
    return { options: [], status: false };
  }
};

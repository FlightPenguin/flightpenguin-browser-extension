import axios from "axios";

import { API_HOST } from "../background/constants";
import { APIResponse } from "../shared/types/APIResponse";
import { getAuthToken } from "./getAuthToken";

interface GetSubscriptionValidityProps {
  accessToken?: string;
}

export const getSubscriptionValidity = async ({ accessToken }: GetSubscriptionValidityProps): Promise<APIResponse> => {
  const headers: { [keyof: string]: string } = {
    "Content-Type": "application/json",
  };

  if (!accessToken) {
    accessToken = await getAuthToken(true);
    headers["auth-source"] = "firebase";
  }
  headers["Authorization"] = `Bearer ${accessToken}`;

  let response;
  try {
    response = await axios.get(`${API_HOST}/api/subscription/status`, {
      headers,
      timeout: 5000,
      withCredentials: true,
    });
  } catch (error) {
    if (error?.response?.status === 401) {
      response = error.response;
    } else {
      console.log("throw me");
      throw error;
    }
  }

  return {
    status: response.status === 200,
    data:
      response.status === 200
        ? (response.data as { [keyof: string]: unknown })
        : { code: response.status, reason: response.statusText },
  };
};

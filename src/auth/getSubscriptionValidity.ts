import axios from "axios";

import { API_HOST } from "../background/constants";
import { APIResponse } from "../shared/types/APIResponse";

export const getSubscriptionValidity = async (accessToken: string): Promise<APIResponse> => {
  const response = await axios.get(`${API_HOST}/api/subscription/status`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    timeout: 3000,
    withCredentials: true,
  });

  return {
    status: response.status === 200,
    data:
      response.status === 200
        ? (response.data as { [keyof: string]: unknown })
        : { code: response.status, reason: response.statusText },
  };
};

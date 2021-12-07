import { API_HOST } from "../background/constants";
import { APIResponse } from "../shared/types/APIResponse";

export const getSubscriptionValidity = async (accessToken: string): Promise<APIResponse> => {
  const response = await fetch(`${API_HOST}/api/subscription/status`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    }),
  });

  return {
    status: response.ok,
    data: response.ok
      ? ((await response.json()) as { [keyof: string]: unknown })
      : { code: response.status, reason: response.statusText },
  };
};

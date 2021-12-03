import { API_HOST } from "../background/constants";

export function getSubscriptionValidity(accessToken) {
  return fetch(`${API_HOST}/api/subscription/status`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    }),
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}

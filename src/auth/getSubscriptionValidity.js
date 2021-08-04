import ORIGIN from "../config";

export function getSubscriptionValidity(accessToken) {
  return fetch(`${ORIGIN}/api/subscription/status`, {
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

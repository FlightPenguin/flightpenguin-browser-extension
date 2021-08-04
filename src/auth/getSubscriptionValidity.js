export function getSubscriptionValidity(accessToken) {
  return fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
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

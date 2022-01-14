import { HttpError } from "shared/errors";

export function getUserInfo(accessToken) {
  return fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json", {
    method: "GET",
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
    }),
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new HttpError(`Unable to retrieve google user info`, response.status, response.statusText);
    }
  });
}

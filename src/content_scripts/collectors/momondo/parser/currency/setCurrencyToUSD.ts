import { getCSRFToken } from "./getCSRFToken";

export const setCurrencyToUSD = async (): Promise<boolean> => {
  const csrfToken = getCSRFToken();

  const response = await fetch(`https://${window.location.hostname}/i/api/account/currency/v1/set`, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "x-csrf": csrfToken,
    },
    body: JSON.stringify({
      currencyCode: "USD",
      store: false,
    }),
  });
  return response.ok;
};

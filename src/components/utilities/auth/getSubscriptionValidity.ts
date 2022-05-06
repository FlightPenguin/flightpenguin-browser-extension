import axios from "axios";

import { API_HOST } from "../../../background/constants";
import { APIResponse } from "../../../shared/types/APIResponse";
import { getFirebaseToken } from "./getFirebaseToken";

interface GetSubscriptionValidityProps {
  accessToken?: string;
  emailConsent?: boolean | undefined;
}

export const getSubscriptionValidity = async ({
  accessToken,
  emailConsent,
}: GetSubscriptionValidityProps): Promise<APIResponse> => {
  const headers: { [keyof: string]: string } = {
    "Content-Type": "application/json",
  };

  if (!accessToken) {
    accessToken = await getFirebaseToken(true);
    headers["auth-source"] = "firebase";
  }
  headers["Authorization"] = `Bearer ${accessToken}`;

  const url = getUrl(emailConsent);

  let response;
  try {
    response = await axios.get(url, {
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

const getUrl = (emailConsent: boolean | undefined): string => {
  const url = new URL(`${API_HOST}/api/subscription/status`);
  if (emailConsent) {
    url.searchParams.append("emailConsent", (!!emailConsent).toString());
  }
  return url.toString();
};

import { parse } from "psl";

export const isReferrerDomainMomondo = (): boolean => {
  if (!document.referrer) {
    return false;
  }
  const referrerUrl = new URL(document.referrer);
  const parsedReferrerDomain = parse(referrerUrl.hostname);

  if (parsedReferrerDomain?.error) {
    return false;
  }

  return parsedReferrerDomain.domain === "momondo.com";
};

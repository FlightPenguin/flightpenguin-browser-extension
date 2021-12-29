import { parse } from "psl";

export const isReferrerDomainIdentical = (): boolean => {
  if (!document.referrer) {
    return false;
  }
  const referrerUrl = new URL(document.referrer);
  const parsedReferrerDomain = parse(referrerUrl.hostname);

  const parsedCurrentDomain = parse(window.location.hostname);

  if (parsedCurrentDomain?.error || parsedReferrerDomain?.error) {
    return false;
  }

  return parsedReferrerDomain.domain === parsedCurrentDomain.domain;
};

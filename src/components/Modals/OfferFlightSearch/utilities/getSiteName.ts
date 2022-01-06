import { parse } from "psl";

export const getSiteName = (): string => {
  const openGraphName = document.querySelector("meta[property='og:site_name']") as HTMLMetaElement | undefined;
  if (openGraphName && openGraphName?.content) {
    return openGraphName.content;
  }
  const domainInfo = parse(window.location.hostname);
  if ("domain" in domainInfo && !!domainInfo.domain) {
    return domainInfo.domain;
  }
  return window.location.hostname;
};

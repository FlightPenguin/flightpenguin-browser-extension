//?sid=1&locatorkey=c20cc385-4cfb-4637-928e-c04d7a3112c1&cid=3150&ffcid=-1&cntIndex=0&isExitIntent=false&showupsellpopup=true

import { MissingFieldParserError } from "../../../../shared/errors";

export const getBookingUrl = (cheapoAirId: string): string => {
  const url = new URL("https://www.cheapoair.com/air/payment");
  const idTokens = getIdParts(cheapoAirId);

  url.searchParams.append("isExitIntent", "true");
  url.searchParams.append("ffcid", "-1");
  url.searchParams.append("showupsellpopup", "false");
  url.searchParams.append("sid", `${Math.random() * 10 + 1}`);
  url.searchParams.append("locatorkey", idTokens.locatorkey);
  url.searchParams.append("cid", idTokens.cid);
  url.searchParams.append("cntIndex", idTokens.cntIndex);

  return url.toString();
};

const getIdParts = (cheapoAirId: string): { locatorkey: string; cid: string; cntIndex: string } => {
  const tokens = cheapoAirId.split("-");
  const cntIndex = tokens.pop();
  const cid = tokens.pop();
  const locatorkey = tokens.join("-");

  if (!cntIndex || !cid || !locatorkey) {
    throw new MissingFieldParserError(`Incorrectly formatted id: ${cheapoAirId}`);
  }

  return { locatorkey, cid, cntIndex };
};

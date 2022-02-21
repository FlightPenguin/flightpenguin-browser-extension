import { SearchType } from "../../background/constants";
import { sendNoFlightsEvent } from "../events";
import { pause } from "../pause";

interface PollForNoResultsInput {
  interval?: number; // milliseconds
  maxChecks?: number;
  providerName: string;
  pollForNoResultsCheck: () => boolean;
  searchType: SearchType;
}

export const pollForNoResults = async ({
  pollForNoResultsCheck,
  providerName,
  searchType,
  interval = 10000,
  maxChecks = 12,
}: PollForNoResultsInput): Promise<void> => {
  let noResults = false;
  let checkNo = 0;

  console.log("start polling");
  while (noResults || checkNo <= maxChecks) {
    await pause(interval);
    const intervalResult = pollForNoResultsCheck();
    checkNo += 1;
    if (intervalResult) {
      console.debug(`Found no results for ${providerName}`);
      sendNoFlightsEvent(providerName, searchType);
      noResults = intervalResult;
    } else {
      console.debug(`completed poll ${checkNo}`);
    }
  }
};

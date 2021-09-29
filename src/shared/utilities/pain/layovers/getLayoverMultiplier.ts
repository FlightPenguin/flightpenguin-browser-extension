import { getTimeDetails } from "../../../../utilityFunctions";
import { Layover } from "../../../types/ProcessedFlightSearchResult";
import { getFauxDate } from "./getFauxDate";
import { isAirportChange } from "./isAirportChange";
import { isAwfulCarrier } from "./isAwfulCarrier";
import { isLong } from "./isLong";
import { isOvernight } from "./isOvernight";
import { isShort } from "./isShort";

export const getLayoverMultiplier = (layover: Layover): number => {
  let multiplier = 1;

  if (isAwfulCarrier(layover)) {
    // riding frontier et al sucks.
    multiplier += 2.5;
  }

  if (!layover.isLayoverStop) {
    return multiplier;
  }

  multiplier += 1;

  if (isAirportChange(layover)) {
    // Changing airports is an awful experience.  Massive penalty!
    multiplier += 4;
  }

  const startTimeDetails = getTimeDetails(layover.fromTime);
  const fauxStartDate = getFauxDate(startTimeDetails);

  const endTimeDetails = getTimeDetails(layover.toTime);
  const fauxEndDate = getFauxDate(endTimeDetails);

  const overnight = isOvernight(startTimeDetails, endTimeDetails);
  if (overnight) {
    // overnight layovers kinda suck and should be a touch worse than a normal layover...
    multiplier += 0.15;
  }

  if (isShort(fauxStartDate, fauxEndDate, overnight)) {
    // Hoofing it around in a large airport in a short time, especially if delays hit can ruin a flight/connection.
    multiplier += 1;
  }

  if (isLong(fauxStartDate, fauxEndDate, overnight)) {
    // Obscenely long durations should be penalized hard
    multiplier += 2;
  }

  return multiplier;
};

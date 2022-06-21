import { TripSourceInput } from "../../../../../../shared/types/TripSource";
import { getBookingPartnerName } from "./getBookingPartnerName";
import { getFare } from "./getFare";
import { getIsFirstParty } from "./getIsFirstParty";

export const getTripSourceInput = (container: HTMLLIElement, id: string): TripSourceInput => {
  const displayNames = getBookingPartnerName(container);
  const fare = getFare(container);
  const isFirstParty = getIsFirstParty(container);

  return {
    displayNames,
    fare,
    isFirstParty,
    id,
    name: "momondo",
  };
};

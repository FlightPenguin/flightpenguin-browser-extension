import { SearchType } from "../../../background/constants";
import { ParserError } from "../../errors";

export const getModalStorageKey = (flightId: string, searchType: SearchType): string => {
  if (!flightId || !searchType) {
    throw new ParserError("Invalid input for getModalStorageKey");
  }
  return `fp-flight-modal-${searchType.toLowerCase()}-${flightId}`;
};

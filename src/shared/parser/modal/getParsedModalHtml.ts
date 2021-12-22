import { SearchType } from "../../../background/constants";
import { MissingElementLookupError, ParserError } from "../../errors";
import { getModalStorageKey } from "./getModalStorageKey";

export const getParsedModalHtml = (flightId: string, searchType: SearchType): Document => {
  if (!flightId || !searchType) {
    throw new ParserError("Invalid input for getParsedModalHtml");
  }

  const storageKey = getModalStorageKey(flightId, searchType);
  const rawHtml = sessionStorage.getItem(storageKey);
  if (!rawHtml) {
    throw new MissingElementLookupError("Unable to extract flight card modal data");
  }
  const parser = new DOMParser();
  return parser.parseFromString(rawHtml, "text/html");
};

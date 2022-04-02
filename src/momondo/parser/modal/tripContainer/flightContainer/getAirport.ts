import { MissingElementLookupError, MissingFieldParserError } from "../../../../../shared/errors";
import { LocationInput } from "../../../../../shared/types/newtypes/Location";

const ELEMENT_SELECTOR = "span[class*='station']";

export const getAirport = (segmentContainer: HTMLDivElement): LocationInput => {
  const element = segmentContainer.querySelector(ELEMENT_SELECTOR);
  if (!element) {
    throw new MissingElementLookupError("Unable to find airport name/code element");
  }

  const rawText = element.textContent;
  if (!rawText) {
    throw new MissingFieldParserError("Unable to extract text from airport element");
  }

  const [namePrimitive, codePrimitive] = rawText.split("(");
  return { name: namePrimitive.trim(), code: codePrimitive.split(")")[0].trim(), type: "AIRPORT" } as LocationInput;
};

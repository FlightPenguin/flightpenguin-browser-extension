import { MissingElementLookupError, MissingFieldParserError } from "../../../../../../shared/errors";

const TEXT_SELECTOR = "div[class*='booking-site']";
const NAME_JOIN_REGEX = /\s+(?:and|\+)\s+/i;

export const getBookingPartnerName = (container: HTMLLIElement): string[] => {
  const textElement = container.querySelector(TEXT_SELECTOR) as HTMLDivElement;
  if (!textElement) {
    throw new MissingElementLookupError("Unable to locate partner name container");
  }

  const text = textElement.textContent;
  if (!text) {
    throw new MissingFieldParserError("Unable to extract name");
  }

  const names = text.trim().split(NAME_JOIN_REGEX);
  return Array.from(
    new Set(
      names.map((name) => {
        return name.trim();
      }),
    ),
  );
};

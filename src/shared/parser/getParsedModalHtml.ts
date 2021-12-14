import { MissingElementLookupError } from "../errors";

export const getParsedModalHtml = (flightCard: HTMLDivElement): Document => {
  const rawText = flightCard.dataset.fpModalHtml;
  if (!rawText) {
    throw new MissingElementLookupError("Unable to extract flight card modal data");
  }
  const parser = new DOMParser();
  return parser.parseFromString(rawText, "text/html");
};

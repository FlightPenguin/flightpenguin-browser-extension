import { MissingElementLookupError } from "../../../shared/errors";

export const getParsedModalHtml = (flightCard: HTMLDivElement) => {
  const rawText = flightCard.dataset.fpModalHtml;
  if (!rawText) {
    throw new MissingElementLookupError("Unable to extract flight card modal data");
  }
  const parser = new DOMParser();
  return parser.parseFromString(rawText, "text/html");
};

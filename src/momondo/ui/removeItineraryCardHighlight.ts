import { clearHighlightFromElement } from "../../shared/ui/manageSelectionHighlights";

export const removeItineraryCardHighlight = (): void => {
  const previousDepSelection = document.querySelector("[data-selected='true']") as HTMLElement;
  if (previousDepSelection) {
    clearHighlightFromElement(previousDepSelection);
  }
};

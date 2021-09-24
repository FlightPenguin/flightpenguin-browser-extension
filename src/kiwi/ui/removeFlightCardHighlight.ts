import { clearHighlightFromElement } from "../../shared/ui/manageSelectionHighlights";

export const removeFlightCardHighlight = () => {
  const previousDepSelection = document.querySelector("[data-selected='true']") as HTMLElement;
  if (previousDepSelection) {
    clearHighlightFromElement(previousDepSelection);
  }
};

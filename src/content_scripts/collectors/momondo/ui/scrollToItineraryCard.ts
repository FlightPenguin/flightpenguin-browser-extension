import { stopScrollingCheck } from "../../../../shared/ui/stopScrolling";

export const scrollToItineraryCard = async (itineraryCard: HTMLDivElement, force = false): Promise<void> => {
  if (!force && (await stopScrollingCheck(false))) {
    return;
  }
  itineraryCard.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
};

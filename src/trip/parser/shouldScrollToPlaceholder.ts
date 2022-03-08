import { stopScrollingCheck } from "../../shared/ui/stopScrolling";

const VISITED_FLIGHT_CARD_SELECTOR = "div[data-fpid]";

export const shouldScrollToPlaceholder = (flightCard: HTMLDivElement, checkForScroll: boolean): boolean => {
  /* Unfortunately, nodes are sometimes deleted and then readded with placeholder values by trip.com as what appears
     to be a rendering performance management tool for them.  So, the flight is updated with new info in their vdom,
     but not in the dom and so we don't get that info.  We should check if the dom has a rendered element that has been
     visited with a higher index than this card.  If so, go scroll to it so the observer says hello...
   */

  const stopCheck = stopScrollingCheck(false);
  if (checkForScroll && stopCheck) {
    return false;
  }

  const lastVisited = Array.from(
    document.querySelectorAll(VISITED_FLIGHT_CARD_SELECTOR) as NodeListOf<HTMLDivElement>,
  ).slice(-1)[0];
  return (
    !!lastVisited &&
    !!lastVisited.dataset.index &&
    !!flightCard &&
    !!flightCard.dataset.index &&
    Number(lastVisited.dataset.index) > Number(flightCard.dataset.index)
  );
};

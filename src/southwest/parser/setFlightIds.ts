import { standardizeTimeString } from "../../shared/helpers";

const CONTAINER_SELECTOR = ".transition-content.price-matrix--details-area ul";
const TIME_CONTAINER_SELECTOR = ".time--value";

export const setFlightIds = (): void => {
  const [departureContainer, returnContainer] = document.querySelectorAll(
    CONTAINER_SELECTOR,
  ) as NodeListOf<HTMLUListElement>;
  setContainerFlightIds(departureContainer);
  setContainerFlightIds(returnContainer);
};

const setContainerFlightIds = (container: HTMLUListElement): void => {
  const flightCards = Array.from(container.childNodes as NodeListOf<HTMLLIElement>);
  flightCards.forEach((flightCard) => {
    const [fromTimeRaw, toTimeRaw] = [...flightCard.querySelectorAll(TIME_CONTAINER_SELECTOR)].map(
      (element) => element.textContent,
    );
    const fromTime = standardizeTimeString(fromTimeRaw).replace("departs", "");
    const toTime = standardizeTimeString(toTimeRaw).replace("arrives", "");
    flightCard.dataset.fpid = [fromTime, toTime, "Southwest"].join("-");
  });
};

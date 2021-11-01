import { standardizeTimeString } from "../../shared/helpers";

const CONTAINER_SELECTOR = ".transition-content.price-matrix--details-area ul";
const TIME_CONTAINER_SELECTOR = ".time--value";
const NEXT_DAY_SELECTOR = ".flight-next-day-indicator";

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
    const [departureContainer, returnContainer] = flightCard.querySelectorAll(TIME_CONTAINER_SELECTOR);

    let fromTime = standardizeTimeString(departureContainer.textContent).replace("departs", "");
    if (departureContainer.parentElement?.querySelector(NEXT_DAY_SELECTOR)) {
      fromTime = `${fromTime}+1`;
    }

    let toTime = standardizeTimeString(returnContainer.textContent).replace("arrives", "");
    if (returnContainer.parentElement?.querySelector(NEXT_DAY_SELECTOR)) {
      toTime = `${toTime}+1`;
    }
    flightCard.dataset.fpid = [fromTime, toTime, "Southwest"].join("-");
  });
};

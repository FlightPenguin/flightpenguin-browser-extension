import { showFlightPenguinPopup } from "./showFlightPenguinPopup";

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    showFlightPenguinPopup();
  }
};

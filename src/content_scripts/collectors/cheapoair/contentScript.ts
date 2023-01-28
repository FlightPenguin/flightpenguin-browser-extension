import { updateBookingPage } from "./booking/updateBookingPage";
import { initMessageListener } from "./listener";
import { CheapoairModalObserver } from "./parser/modalObserver";

const modalObserver = new CheapoairModalObserver();

initMessageListener(modalObserver);
updateBookingPage(modalObserver);

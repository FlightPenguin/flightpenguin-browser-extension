import { initializeSentry } from "../../shared/initializeSentry";

initializeSentry();

import { captureException } from "@sentry/browser";

import { sendAnalyticsPageView } from "../../shared/events";
import { showFlightPenguinPopup } from "./showFlightPenguinPopup";

try {
  showFlightPenguinPopup();
  sendAnalyticsPageView();
} catch (err) {
  console.error(err);
  captureException(err);
}

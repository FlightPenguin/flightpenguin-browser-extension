import { initializeSentry } from "../../shared/initializeSentry";

initializeSentry();

import * as Sentry from "@sentry/browser";

import { sendAnalyticsPageView } from "../../shared/events";
import { showFlightPenguinPopup } from "./showFlightPenguinPopup";

try {
  showFlightPenguinPopup();
  sendAnalyticsPageView();
} catch (err) {
  Sentry.captureException(err);
  console.error(err);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: `${process.env.EXTENSION_ENV}`,
});

import { showFlightPenguinPopup } from "./showFlightPenguinPopup";

const paintableStates = ["interactive", "complete"];

try {
  if (paintableStates.includes(document.readyState)) {
    console.log("LAUNCH");
    showFlightPenguinPopup();
  } else {
    console.log("ONREADY");
    document.onreadystatechange = () => {
      if (paintableStates.includes(document.readyState)) {
        console.log("READY");
        showFlightPenguinPopup();
      }
    };
  }
} catch (err) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.Sentry.captureException(err);
  console.error(err);
}

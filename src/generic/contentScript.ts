// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: `${process.env.EXTENSION_ENV}`,
});

import { showFlightPenguinPopup } from "./showFlightPenguinPopup";

try {
  showFlightPenguinPopup();
} catch (err) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.Sentry.captureException(err);
  console.error(err);
}
// document.onreadystatechange = () => {
//   if (document.readyState === "complete") {
//     try {
//       showFlightPenguinPopup();
//     } catch (err) {
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       window.Sentry.captureException(err);
//       console.error(err);
//     }
//   }
// };

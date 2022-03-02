// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: `${process.env.EXTENSION_ENV}`,
  release: `${process.env.SENTRY_PROJECT}@${process.env.VERSION}`,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  integrations: [new window.Sentry.Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

import { updateBookingPage } from "./booking/updateBookingPage";
import { initMessageListener } from "./listener";
import { CheapoairModalObserver } from "./parser/modalObserver";

const modalObserver = new CheapoairModalObserver();

initMessageListener(modalObserver);
updateBookingPage(modalObserver);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: `${process.env.EXTENSION_ENV}`,
  release: `${process.env.SENTRY_PROJECT}@${process.env.VERSION}`,
});

import { getExtensionUrl } from "../shared/utilities/getExtensionUrl";

try {
  window.location.href = getExtensionUrl();
} catch (err) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.Sentry.captureException(err);
  console.error(err);
}

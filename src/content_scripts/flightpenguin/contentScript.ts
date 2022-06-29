import { initializeSentry } from "../../shared/initializeSentry";

initializeSentry();

import * as Sentry from "@sentry/browser";

import { getExtensionUrl } from "../../shared/utilities/getExtensionUrl";

try {
  window.location.href = getExtensionUrl();
} catch (err) {
  Sentry.captureException(err);
  console.error(err);
}

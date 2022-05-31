import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

export const initializeSentry = (sampleRate = 1.0): void => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enabled: `${process.env.EXTENSION_ENV}` !== "development",
    environment: `${process.env.EXTENSION_ENV}`,
    integrations: [new BrowserTracing()],
    release: `${process.env.SENTRY_PROJECT}@${process.env.VERSION}`,
    tracesSampleRate: sampleRate,
  });
};

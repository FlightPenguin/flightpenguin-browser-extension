import { init } from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

export const initializeSentry = (sampleRate = 1.0): void => {
  try {
    init({
      dsn: process.env.SENTRY_DSN,
      enabled: `${process.env.EXTENSION_ENV}` !== "development",
      environment: `${process.env.EXTENSION_ENV}`,
      integrations: [new Integrations.BrowserTracing()],
      release: `${process.env.SENTRY_PROJECT}@${process.env.VERSION}`,
      tracesSampleRate: sampleRate,
    });
  } catch (err) {
    console.error(err);
  }
};

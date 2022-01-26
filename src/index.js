import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { Provider as BumbagProvider, ToastManager } from "bumbag";
import React from "react";
import ReactDom from "react-dom";
import { ErrorBoundary } from "react-error-boundary";

import { FlightPenguinTheme } from "./components/utilities/bumbag/theme";
import { ErrorPage } from "./pages/Error/index";
import { SearchPage } from "./pages/Search/index";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  environment: `${process.env.EXTENSION_ENV}`,
  release: `${process.env.SENTRY_PROJECT}@${process.env.VERSION}`,
  tracesSampleRate: 1.0,
});

const root = document.getElementById("react-root");

if (root) {
  ReactDom.render(
    <BumbagProvider theme={FlightPenguinTheme}>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <SearchPage />
      </ErrorBoundary>
      <ToastManager />
    </BumbagProvider>,
    root,
  );
}

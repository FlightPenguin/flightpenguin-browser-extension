import { initializeSentry } from "shared/initializeSentry";

initializeSentry();

import { Provider as BumbagProvider, ToastManager } from "bumbag";
import React from "react";
import ReactDom from "react-dom";
import { ErrorBoundary } from "react-error-boundary";

import { FlightPenguinTheme } from "./components/utilities/bumbag/theme";
import { ErrorPage } from "./pages/Error/index";
import { SearchPage } from "./pages/Search/index";

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

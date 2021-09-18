import { Provider as BumbagProvider } from "bumbag";
import React from "react";
import ReactDom from "react-dom";

import { FlightPenguinTheme } from "./components/utilities/bumbag/theme";
import { SearchPage } from "./pages/Search/index";

const root = document.getElementById("react-root");

if (root) {
  ReactDom.render(
    <BumbagProvider theme={FlightPenguinTheme}>
      <SearchPage />
    </BumbagProvider>,
    root,
  );
}

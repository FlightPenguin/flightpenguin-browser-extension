import { Provider as BumbagProvider } from "bumbag";
import * as React from "react";
import ReactDom from "react-dom";

import { OfferFlightSearchModal } from "../components/Modals/";
import { FlightPenguinTheme } from "../components/utilities/bumbag/theme";
import { isScraperFlag } from "../shared/utilities/isScraperFlag";

export const showFlightPenguinPopup = (): void => {
  if (!isScraperFlag()) {
    const div = document.createElement("div");
    div.setAttribute("id", "fp-offer-search");
    ReactDom.render(
      <BumbagProvider theme={FlightPenguinTheme}>
        <OfferFlightSearchModal />,
      </BumbagProvider>,
      document.body.appendChild(div),
    );
  }
};

import { Provider as BumbagProvider } from "bumbag";
import * as React from "react";
import ReactDom from "react-dom";

import { OfferFlightSearchModal } from "../components/Modals/";
import { FlightPenguinTheme } from "../components/utilities/bumbag/theme";

export const showFlightPenguinPopup = (): void => {
  const div = document.createElement("div");
  div.setAttribute("id", "fp-offer-search");
  ReactDom.render(
    <BumbagProvider theme={FlightPenguinTheme}>
      <OfferFlightSearchModal />,
    </BumbagProvider>,
    document.body.appendChild(div),
  );
};

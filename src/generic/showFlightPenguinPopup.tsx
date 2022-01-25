import { Provider as BumbagProvider } from "bumbag";
import * as React from "react";
import ReactDom from "react-dom";

import { OfferFlightSearchModal } from "../components/Modals/";
import { FlightPenguinTheme } from "../components/utilities/bumbag/theme";
import { isReferrerDomainIdentical } from "../shared/utilities/isReferrerDomainIdentical";
import { suppressOfferFlightPenguinPopup } from "../shared/utilities/suppressOfferFlightPenguinPopup";

export const showFlightPenguinPopup = (): void => {
  const suppress = sessionStorage.getItem("hasOfferedFlightPenguinSwitch");

  if (isReferrerDomainIdentical()) {
    suppressOfferFlightPenguinPopup();
  } else if (!suppress) {
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

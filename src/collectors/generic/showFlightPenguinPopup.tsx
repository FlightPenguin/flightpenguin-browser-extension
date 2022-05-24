import { Provider as BumbagProvider } from "bumbag";
import * as React from "react";
import ReactDom from "react-dom";

import { OfferFlightSearchModal } from "../../components/Modals";
import { FlightPenguinTheme } from "../../components/utilities/bumbag/theme";
import { isReferrerDomainIdentical } from "../../shared/utilities/isReferrerDomainIdentical";
import { hasSuppressionFlag as hasActiveCollectorSuppressionFlag } from "./activeCollectorSuppression/hasSuppressionFlag";
import { suppressOfferFlightPenguinPopup } from "./activeCollectorSuppression/suppressOfferFlightPenguinPopup";
import { isReferrerDomainMomondo } from "./isReferrerDomainMomondo";
import { hasSuppressionFlag as hasRecentDisplaySuppressionFlag } from "./recentDisplaySuppression/hasSuppressionFlag";

export const showFlightPenguinPopup = (): void => {
  let suppress = hasActiveCollectorSuppressionFlag() || hasRecentDisplaySuppressionFlag();
  if ((!suppress && isReferrerDomainIdentical()) || isReferrerDomainMomondo()) {
    suppress = true;
    suppressOfferFlightPenguinPopup();
  }

  if (!suppress) {
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

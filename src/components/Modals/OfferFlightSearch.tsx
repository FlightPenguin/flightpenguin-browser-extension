import { ActionButtons, Card, Modal } from "bumbag";
import React, { useEffect, useState } from "react";

import { sendOpenExtension } from "../../shared/events/sendOpenExtension";
import { hasVisitedRecently } from "./utilities/hasVisitedRecently";

export const OfferFlightSearchModal = (): React.ReactElement => {
  const [hasSeenOffer, setHasSeenOffer] = useState(hasVisitedRecently());

  const modal = Modal.useState();
  useEffect(() => {
    modal.setVisible(true);
  }, []);

  return (
    <>
      <Modal.Disclosure {...modal} />
      {!hasSeenOffer && (
        <Modal {...modal} hideOnClickOutside={false} hideOnEsc={false}>
          <Card
            footer={
              <ActionButtons
                cancelText="Yes"
                cancelProps={{ palette: "primary" }}
                justifyContent="flex-end"
                onClickCancel={() => {
                  sendOpenExtension();
                }}
                onClickSubmit={() => {
                  setHasSeenOffer(true);
                  sessionStorage.setItem("hasOfferedFlightPenguinSwitch", "true");
                  modal.setVisible(false);
                }}
                submitProps={{ palette: "default", variant: "outline" }}
                submitText="No"
              />
            }
            maxWidth="768px"
            title={`Would you like to search with Flight Penguin instead?`}
          >
            Built by some of the same people who created Hipmunk, Flight Penguin is a Chrome extension you've already
            installed. Leverage our time bar layout, sensible automatic flight rankings, and comprehensive search to get
            the best possible flight.
          </Card>
        </Modal>
      )}
    </>
  );
};

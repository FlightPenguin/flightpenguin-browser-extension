import { Box, Flex, Icon, Image, Modal, Show, Text } from "bumbag";
import React, { useEffect, useState } from "react";

import { sendOpenExtension } from "../../../shared/events/sendOpenExtension";
import { hasVisitedRecently } from "../utilities/hasVisitedRecently";
import { getSiteLogoPath } from "./utilities/getSiteLogoPath";
import { getSiteName } from "./utilities/getSiteName";

type Unit = "px" | "em" | "rem" | "%" | "ch" | "vw" | "vh";
type UnitWithValue = `${number}${Unit}`;
type SpacingUnit =
  | UnitWithValue
  | `major-${number}`
  | `minor-${number}`
  | `-major-${number}`
  | `-minor-${number}`
  | "inherit"
  | "initial"
  | "revert"
  | "unset";

/* TODO:
 * Hide on HasSeenOffer
 * Center content
 * Load faster (e.g. not onReady)
 */
export const OfferFlightSearchModal = (): React.ReactElement => {
  const [hasSeenOffer, setHasSeenOffer] = useState(hasVisitedRecently());
  const [loadingSelection, setLoadingSelection] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const modal = Modal.useState();
  useEffect(() => {
    modal.setVisible(true);
  }, []);

  const siteName = getSiteName();
  const siteLogo = getSiteLogoPath();
  const iconSize: { [key: string]: SpacingUnit } = { default: "128px", "max-tablet": "64px" };

  return (
    <>
      <Modal.Disclosure {...modal} />
      <Modal {...modal} hideOnClickOutside={false} hideOnEsc={false}>
        <Box height="100vh" width="100vw" backgroundColor="white">
          <Box
            alignX="center"
            alignY="center"
            maxWidth="768px"
            display={imageLoaded ? "block" : "none"}
            padding="major-5"
          >
            <Box>
              <Image
                width="100%"
                height="100%"
                alt="Searching..."
                src={chrome.runtime.getURL("/images/choice.svg")}
                onLoad={() => {
                  // consistently slowest loading image in testing...
                  setImageLoaded(true);
                }}
              />
            </Box>
            <Box paddingTop="major-2" minWidth="240px" textAlign="center">
              <Text fontWeight="bold" fontSize={{ default: "4vw", "min-fullHD": "56px", mobile: "20px" }}>
                Which search provider?
              </Text>
              <Flex justifyContent="space-between" paddingTop="major-2">
                <Box
                  cursor={loadingSelection ? "wait" : "pointer"}
                  width={iconSize}
                  height={iconSize}
                  tabIndex={0}
                  onClick={() => {
                    if (!loadingSelection) {
                      setLoadingSelection(true);
                      sendOpenExtension();
                    }
                  }}
                  onKeyPress={(event) => {
                    if (!loadingSelection && event.charCode === 13) {
                      setLoadingSelection(true);
                      sendOpenExtension();
                    }
                  }}
                >
                  <Image
                    width="100%"
                    alt="Search with Flight Penguin"
                    src={chrome.runtime.getURL("/src/icons/icon128.png")}
                  />
                  <Box textAlign="center" width="100%">
                    <Text fontWeight="700">Flight Penguin</Text>
                  </Box>
                </Box>
                <Box
                  cursor={loadingSelection ? "wait" : "pointer"}
                  width={iconSize}
                  height={iconSize}
                  tabIndex={0}
                  onClick={() => {
                    if (!loadingSelection) {
                      setLoadingSelection(true);
                      setHasSeenOffer(true);
                      sessionStorage.setItem("hasOfferedFlightPenguinSwitch", "true");
                      modal.setVisible(false);
                    }
                  }}
                  onKeyPress={(event) => {
                    if (!loadingSelection && event.charCode === 13) {
                      setLoadingSelection(true);
                      setHasSeenOffer(true);
                      sessionStorage.setItem("hasOfferedFlightPenguinSwitch", "true");
                      modal.setVisible(false);
                    }
                  }}
                >
                  <Image
                    height={iconSize}
                    alt={`Search with ${siteName}`}
                    src={siteLogo ? siteLogo : chrome.runtime.getURL("/images/aircraft.svg")}
                  />
                  <Box textAlign="center" width="100%">
                    <Text fontWeight="700">{siteName}</Text>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

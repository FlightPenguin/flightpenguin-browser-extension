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
 * Load faster (e.g. not onReady)
 */
export const OfferFlightSearchModal = (): React.ReactElement => {
  const [hasSeenOffer, setHasSeenOffer] = useState(hasVisitedRecently());
  const [loadingSelection, setLoadingSelection] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const modal = Modal.useState({ animated: true });
  useEffect(() => {
    modal.setVisible(true);
  }, []);

  const siteName = getSiteName();
  const iconSize: { [key: string]: SpacingUnit } = { default: "128px", "max-tablet": "64px" };

  return (
    <>
      <Modal.Disclosure {...modal} />
      {!hasSeenOffer && (
        <Modal {...modal} fade expand hideOnClickOutside={false} hideOnEsc={false}>
          <Box height="100vh" width="100vw" backgroundColor="white" display="flex" alignX="center" alignY="center">
            <Box maxWidth="768px" display={imageLoaded ? "flex" : "none"} flexDirection="column" padding="major-5">
              <Box width="100%">
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
              <Box paddingTop="major-2" minWidth="240px" width="100%" textAlign="center" borderRadius="10%">
                <Text fontWeight="bold" fontSize={{ default: "4vw", "min-fullHD": "56px", mobile: "20px" }}>
                  Which search provider?
                </Text>
                <Flex justifyContent="space-between" paddingTop="major-2">
                  <Box
                    altitude="200"
                    padding="minor-3"
                    cursor={loadingSelection ? "wait" : "pointer"}
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
                    _hover={{ border: "2px solid black", borderRadius: "10%" }}
                    _focus={{ border: "2px solid black", borderRadius: "10%" }}
                  >
                    <Image
                      height={iconSize}
                      width={iconSize}
                      alt="Search with Flight Penguin"
                      src={chrome.runtime.getURL("/src/icons/icon128.png")}
                    />
                    <Box textAlign="center" width="100%">
                      <Text fontWeight="700">Flight Penguin</Text>
                    </Box>
                  </Box>
                  <Box
                    altitude="200"
                    borderRadius="10%"
                    padding="minor-3"
                    cursor={loadingSelection ? "wait" : "pointer"}
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
                    _hover={{ border: "2px solid black", borderRadius: "10%" }}
                    _focus={{ border: "2px solid black", borderRadius: "10%" }}
                  >
                    <Image height={iconSize} width={iconSize} src={chrome.runtime.getURL("/images/aircraft.svg")} />
                    <Box textAlign="center" width="100%">
                      <Text fontWeight="700">{siteName}</Text>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

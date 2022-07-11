import { Badge, Box, Button, Card } from "bumbag";
import { Modal } from "bumbag/src/Modal";
import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import * as browser from "webextension-polyfill";

import { sendSocialShareClick } from "../../../../shared/events/analytics/socialShareClick";

interface ModalProps {
  button?: {
    text?: string;
    palette?: string;
    variant?: string;
  };
}

export const SocialMediaShareModal = ({ button }: ModalProps): React.ReactElement => {
  const socialTitle =
    "I've been using Flight Penguin to search for flights. " +
    "It's a browser extension that helps me find cheaper, " +
    "more comfortable flights.  Give it a try today!";

  return (
    <Modal.State>
      <Modal.Disclosure use={Box}>
        <Button iconAfter="solid-share" palette={button?.palette || "default"} variant={button?.variant || "default"}>
          {button?.text || "Share on social media"}
        </Button>
      </Modal.Disclosure>
      <Modal>
        <Box>
          <Modal.Disclosure use={Box}>
            <Badge isAttached size="large" palette="danger">
              x
            </Badge>
          </Modal.Disclosure>
          <Card standalone maxWidth="480px">
            <Card.Header>
              <Card.Title>Help us out</Card.Title>
            </Card.Header>
            <Card.Content>
              Spread the word about how much you like Flight Penguin on your favorite social media platforms.
              <Box display="flex" flexWrap="wrap" justifyContent="space-between" paddingTop="major-2" flexBasis="25%">
                <Box height="32px" width="32px">
                  <FacebookShareButton
                    beforeOnClick={() => {
                      sendSocialShareClick("facebook");
                    }}
                    tabIndex={0}
                    title={socialTitle}
                    url={getSocialUrl("facebook")}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </Box>

                <Box height="32px" width="32px">
                  <TwitterShareButton
                    beforeOnClick={() => {
                      sendSocialShareClick("twitter");
                    }}
                    tabIndex={0}
                    title={socialTitle}
                    url={getSocialUrl("twitter")}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </Box>

                <Box height="32px" width="32px">
                  <LinkedinShareButton
                    beforeOnClick={() => {
                      sendSocialShareClick("linkedin");
                    }}
                    tabIndex={0}
                    title={socialTitle}
                    url={getSocialUrl("linkedin")}
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </Box>

                <Box height="32px" width="32px">
                  <RedditShareButton
                    beforeOnClick={() => {
                      sendSocialShareClick("reddit");
                    }}
                    tabIndex={0}
                    title={socialTitle}
                    url={getSocialUrl("reddit")}
                  >
                    <RedditIcon size={32} round />
                  </RedditShareButton>
                </Box>

                <Box height="32px" width="32px">
                  <PinterestShareButton
                    beforeOnClick={() => {
                      sendSocialShareClick("pinterest");
                    }}
                    media={browser.runtime.getURL("./icons/logo.png")}
                    tabIndex={0}
                    title={socialTitle}
                    url={getSocialUrl("pinterest")}
                  >
                    <PinterestIcon size={32} round />
                  </PinterestShareButton>
                </Box>

                <Box height="32px" width="32px">
                  <WhatsappShareButton
                    beforeOnClick={() => {
                      sendSocialShareClick("whatsapp");
                    }}
                    tabIndex={0}
                    title={socialTitle}
                    url={getSocialUrl("whatsapp")}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </Box>

                <Box height="32px" width="32px">
                  <TelegramShareButton
                    beforeOnClick={() => {
                      sendSocialShareClick("telegram");
                    }}
                    tabIndex={0}
                    title={socialTitle}
                    url={getSocialUrl("telegram")}
                  >
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                </Box>
              </Box>
            </Card.Content>
          </Card>
        </Box>
      </Modal>
    </Modal.State>
  );
};

const getSocialUrl = (sourceName: string) => {
  return `https://flightpenguin.com/`;
};

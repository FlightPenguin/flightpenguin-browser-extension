import { Badge, Box, Button, Card, Paragraph } from "bumbag";
import { Modal } from "bumbag/src/Modal";
import { User } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";

import { sendShareLinkCopied } from "../../../../shared/events/analytics/shareLinkCopied";
import { getEmailHash } from "../../../../shared/utilities/getEmailHash";

interface ModalProps {
  button?: {
    text?: string;
    palette?: string;
    variant?: string;
  };
  user: User | null;
}

export const InviteModal = ({ button, user }: ModalProps): React.ReactElement => {
  const [shareableLink, setSharableLink] = useState<string | null>(null);
  const [shareLinkText, setShareLinkText] = useState<string>("Get sharable link");

  const fetchLink = useCallback(async () => {
    const value = await getShareLinkUrl(user);
    setSharableLink(value);
  }, [setSharableLink, user]);

  useEffect(() => {
    fetchLink();
  }, [fetchLink]);

  return (
    <Modal.State>
      <Modal.Disclosure use={Box}>
        <Button
          iconAfter="solid-user-plus"
          palette={button?.palette || "default"}
          variant={button?.variant || "default"}
        >
          {button?.text || "Invite a friend"}
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
              <Card.Title>Invite a friend</Card.Title>
            </Card.Header>
            <Card.Content>
              <Paragraph>
                Help Flight Penguin by inviting your friends and family to search for flights using our browser
                extension.
              </Paragraph>
            </Card.Content>
            <Card.Footer>
              <Box display="flex" flexDirection="row" justifyContent="space-between">
                {shareableLink && (
                  <Button
                    aria-label="Retrieve referral link to share with friends"
                    variant="outlined"
                    palette="primary"
                    onClick={() => {
                      navigator.clipboard.writeText(shareableLink);
                      setShareLinkText("Copied to clipboard");
                      setTimeout(() => {
                        setShareLinkText("Get sharable link");
                      }, 30000);
                      sendShareLinkCopied();
                    }}
                  >
                    {shareLinkText}
                  </Button>
                )}
              </Box>
            </Card.Footer>
          </Card>
        </Box>
      </Modal>
    </Modal.State>
  );
};

const getShareLinkUrl = async (user: User | null): Promise<string> => {
  if (!user || !user.email) {
    return "https://flightpenguin.com";
  }

  try {
    const hash = await getEmailHash({ email: user.email });
    return `https://flightpenguin.com/?referralCode=${hash}`;
  } catch (e) {
    return "https://flightpenguin.com";
  }
};

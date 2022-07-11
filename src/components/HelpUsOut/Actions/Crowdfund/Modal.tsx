import { Badge, Box, Button, Card } from "bumbag";
import { Modal } from "bumbag/src/Modal";
import React from "react";

interface ModalProps {
  button?: {
    text?: string;
    palette?: string;
    variant?: string;
  };
}

export const CrowdfundModal = ({ button }: ModalProps): React.ReactElement => {
  return (
    <Modal.State>
      <Modal.Disclosure use={Box}>
        <Button
          iconAfter="solid-business-time"
          palette={button?.palette || "default"}
          variant={button?.variant || "default"}
        >
          {button?.text || "Become an owner"}
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
              <Card.Title>Become an owner</Card.Title>
            </Card.Header>
            <Card.Content>
              We're offering our early users a chance to invest in Flight Penguin. People like you have been helping us
              grow more than 20% a month since the start of the year, and we're just getting started. Details about our
              progress and the raise are available on our crowdfunding page.
            </Card.Content>
            <Card.Footer>
              <Button
                aria-label="Learn more about Flight Penguin's crowdfunding campaign"
                use="a"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                href="https://wefunder.com/flightpenguin"
                target="_blank"
                variant="outlined"
                palette="primary"
              >
                Learn more
              </Button>
            </Card.Footer>
          </Card>
        </Box>
      </Modal>
    </Modal.State>
  );
};

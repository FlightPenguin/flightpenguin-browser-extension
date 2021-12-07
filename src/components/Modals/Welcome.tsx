import { Alert, Box, Button, Card, Image, Link, Modal } from "bumbag";
import React, { useEffect, useState } from "react";

import { getSubscriptionValidity } from "../../auth";
import { getAuthToken } from "../../auth/getAuthToken";
import { focusPrimaryTab } from "../../shared/utilities/windows/focusPrimaryTab";

interface WelcomeModalProps {
  onSuccess: () => void;
}

export const WelcomeModal = ({ onSuccess }: WelcomeModalProps): React.ReactElement => {
  const [authError, setAuthError] = useState(false);

  const modal = Modal.useState();
  useEffect(() => {
    modal.setVisible(true);
  }, []);

  return (
    <>
      <Modal.Disclosure {...modal} />

      <Modal {...modal} hideOnClickOutside={false} hideOnEsc={false}>
        <Card standalone maxWidth="480px">
          <Card.Header>
            <Card.Title>Now boarding...</Card.Title>
          </Card.Header>
          <Card.Content>
            {authError && (
              <Alert title="Error" type="danger" marginTop="major-1" marginBottom="major-3">
                An error occurred during the sign in process. Please try again. If this continues,{" "}
                <Link href="mailto:support@flightpenguin.com?subject=I%20cannot%20sign%20in...">
                  email our support team
                </Link>
                .
              </Alert>
            )}
            It's time to take the pain out of flight search. You've installed the extension, now we just need you to
            sign in with Google to get started.
            <Box alignX="center" marginTop="major-1">
              <Image src="/images/welcome.svg" alt="Welcome" maxWidth="360px" border="default" />
            </Box>
          </Card.Content>
          <Card.Footer>
            <Button
              onClick={async () => {
                const token = await getAuthToken(true);
                const apiResponse = await getSubscriptionValidity(token);
                await focusPrimaryTab();
                if (apiResponse.status && apiResponse.data && apiResponse.data.status) {
                  onSuccess();
                } else {
                  setAuthError(true);
                }
              }}
              palette="primary"
            >
              Login with Google
            </Button>
          </Card.Footer>
        </Card>
      </Modal>
    </>
  );
};

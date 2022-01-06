import { Alert, Box, Button, Card, Image, Link, Modal } from "bumbag";
import React, { useEffect, useState } from "react";

import { getSubscriptionValidity, getUserInfo } from "../../auth";
import { getAuthToken } from "../../auth/getAuthToken";
import { AnalyticsManager } from "../../background/AnalyticsManager";
import { focusPrimaryTab } from "../../shared/utilities/windows/focusPrimaryTab";

interface LoginModalProps {
  onSuccess: () => void;
}

export const LoginModal = ({ onSuccess }: LoginModalProps): React.ReactElement => {
  const analytics = new AnalyticsManager(`${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`, false);
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
            <Card.Title>Your boarding pass please...</Card.Title>
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
            It looks like we need you to sign in again.
            <Box alignX="center" marginTop="major-1">
              <Image src="/images/login.svg" alt="Login" maxWidth="360px" border="default" />
            </Box>
          </Card.Content>
          <Card.Footer>
            <Button
              onClick={async () => {
                const token = await getAuthToken(true);
                const userInfo = await getUserInfo(token);
                const userId = userInfo?.id;
                if (userId) {
                  analytics.identify({ userId: userInfo.id });
                }
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

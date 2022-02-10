import { Alert, Box, Button, Card, Image, Link, Modal } from "bumbag";
import { Auth, GoogleAuthProvider } from "firebase/auth";
import React, { useEffect, useState } from "react";

import { AnalyticsManager } from "../../background/AnalyticsManager";
import { loginWithGooglePopup } from "../utilities/auth/social/loginWithGooglePopup";

interface LoginModalProps {
  firebaseAuth: Auth;
  googleProvider: GoogleAuthProvider;
  onSuccess: () => void;
}

export const LoginModal = ({ firebaseAuth, googleProvider, onSuccess }: LoginModalProps): React.ReactElement => {
  const analytics = new AnalyticsManager(`${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`, false);
  const [authError, setAuthError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const modal = Modal.useState();
  useEffect(() => {
    modal.setVisible(true);
  }, []);

  useEffect(() => {
    if (authError) {
      chrome.identity.clearAllCachedAuthTokens(() => {
        console.debug("Cleared auth tokens due to auth error in login modal");
      });
    }
  }, [authError]);

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
              disabled={disabled}
              onClick={async () => {
                setDisabled(true);
                try {
                  loginWithGooglePopup(
                    firebaseAuth,
                    googleProvider,
                    analytics,
                    () => {
                      setDisabled(false);
                      setAuthError(false);
                      onSuccess();
                    },
                    () => {
                      setDisabled(false);
                      setAuthError(true);
                    },
                  );
                } catch (error) {
                  setDisabled(false);
                  setAuthError(true);
                  throw error;
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

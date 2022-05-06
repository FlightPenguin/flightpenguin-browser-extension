import { Alert, Box, Button, Card, Checkbox, Image, Link, Modal } from "bumbag";
import { Auth, GoogleAuthProvider } from "firebase/auth";
import React, { useEffect, useState } from "react";

import { AnalyticsManager } from "../../background/AnalyticsManager";
import { loginWithGooglePopup } from "../utilities/auth/social/google/loginWithGooglePopup";

interface WelcomeModalProps {
  firebaseAuth: Auth;
  googleProvider: GoogleAuthProvider;
  onSuccess: () => void;
}

export const WelcomeModal = ({ firebaseAuth, googleProvider, onSuccess }: WelcomeModalProps): React.ReactElement => {
  const analytics = new AnalyticsManager(`${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`, false);
  const [authError, setAuthError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [emailConsent, setEmailConsent] = useState(false);
  console.log(emailConsent);

  const modal = Modal.useState();
  useEffect(() => {
    modal.setVisible(true);
  }, []);

  useEffect(() => {
    if (authError) {
      chrome.identity.clearAllCachedAuthTokens(() => {
        console.debug("Cleared auth tokens due to auth error in welcome modal");
      });
    }
  }, [authError]);

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
            <Checkbox
              paddingTop="major-2"
              label="Flight Penguin can send me news and updates about the company and product via email."
              checked={emailConsent}
              onChange={(e) => setEmailConsent((e.target as HTMLInputElement).checked)}
            />
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
                    emailConsent,
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

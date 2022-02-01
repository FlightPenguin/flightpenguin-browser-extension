import { Box, Button, Card, Image, Link, PageWithHeader } from "bumbag";
import React, { useState } from "react";

import NavigationBar from "../../components/NavigationBar";

export const ErrorPage = (): React.ReactElement => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <PageWithHeader header={<NavigationBar />} overflow="hidden">
      <Box alignX="center">
        <Box maxWidth="768px" marginTop="major-5" display={imageLoaded ? "flex" : "none"}>
          <Card standalone width="100%">
            <Card.Content>
              <Box width="100%">
                <Image
                  width="100%"
                  height="100%"
                  alt="Searching..."
                  src={chrome.runtime.getURL("/images/warning.svg")}
                  onLoad={() => {
                    setImageLoaded(true);
                  }}
                />
              </Box>
              An unexpected error occurred. Our team has already been notified and will investigate the cause of this
              issue. Please wait a short while and try again soon. If this error persists, contact our{" "}
              <Link href="mailto:support@flightpenguin.com">support team</Link>.
            </Card.Content>
            <Card.Footer alignX="center">
              <Button
                palette="primary"
                onClick={() => {
                  location.reload(true);
                }}
              >
                Back to search
              </Button>
            </Card.Footer>
          </Card>
        </Box>
      </Box>
    </PageWithHeader>
  );
};

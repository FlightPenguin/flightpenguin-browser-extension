import { Box, Card, Image } from "bumbag";
import React, { useState } from "react";

export const SizeAlert = (): React.ReactElement => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Box alignX="center">
      <Box maxWidth="768px" marginTop="major-5" display={imageLoaded ? "flex" : "none"}>
        <Card standalone width="100%">
          <Card.Header alignX="center">
            <Card.Title>Screen too small</Card.Title>
          </Card.Header>
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
            Flight Penguin provides a highly visual way to compare flights. This requires a minimum amount of screen
            space. If you're using a rotatable device, try rotating into landscape mode. Otherwise, change your
            resolution, connect to a larger monitor, or zoom out.
          </Card.Content>
        </Card>
      </Box>
    </Box>
  );
};

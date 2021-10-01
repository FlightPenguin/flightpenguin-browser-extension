import { Box, Button, Card } from "bumbag";
import React, { useState } from "react";

interface UpdateNotificationAlertProps {
  width: string;
  marginTop?: string;
  marginBottom?: string;
  alignX?: "center" | "left" | "right";
}

export const UpdateNotificationAlert = ({
  width,
  marginTop = "0px",
  marginBottom = "0px",
  alignX = "center",
}: UpdateNotificationAlertProps): React.ReactElement => {
  const [update, setUpdate] = useState(false);

  return (
    <Box alignX={alignX}>
      <Box width={width} marginTop={marginTop} marginBottom={marginBottom}>
        <Card standalone width="100%">
          <Card.Header>
            <Card.Title>Update available</Card.Title>
          </Card.Header>
          <Card.Content>A new update for Flight Penguin is now available.</Card.Content>
          <Card.Footer>
            <Button
              palette="primary"
              variant="outlined"
              disabled={update}
              onClick={() => {
                setUpdate(true);
                chrome.runtime.sendMessage({
                  event: "UPDATE_NOW",
                });
              }}
            >
              Update now
            </Button>
          </Card.Footer>
        </Card>
      </Box>
    </Box>
  );
};

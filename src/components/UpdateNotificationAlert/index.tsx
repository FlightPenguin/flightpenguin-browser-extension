import { Box, Button, Card } from "bumbag";
import React, { useState } from "react";
import * as browser from "webextension-polyfill";

export const UpdateNotificationAlert = (): React.ReactElement => {
  const [update, setUpdate] = useState(false);

  return (
    <Box
      display="flex"
      className="search-form-wrapper"
      boxSizing="border-box"
      paddingTop="major-6"
      justifyContent="center"
    >
      <Card standalone minWidth="360px" maxWidth="768px" width="100%">
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
              browser.runtime.sendMessage({
                event: "UPDATE_NOW",
              });
            }}
          >
            Update now
          </Button>
        </Card.Footer>
      </Card>
    </Box>
  );
};

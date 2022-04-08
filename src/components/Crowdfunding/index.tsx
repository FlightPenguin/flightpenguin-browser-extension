import { Box, Button, Callout } from "bumbag";
import React from "react";

export const Crowdfunding = (): React.ReactElement => {
  return (
    <Box
      box-sizing="border-box"
      display="flex"
      id="crowdfunding-footer"
      justifyContent="center"
      paddingTop="major-6"
      width="100%"
    >
      <Callout
        iconProps={{ icon: "solid-seedling" }}
        title="Interested in helping us grow?"
        maxWidth="768px"
        footer={
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
        }
      >
        Flight Penguin is raising a crowdfunding round through Wefunder. As an investor, you can help us stay focused on
        our long term goal of building the best flight search engine possible with no ads or agreements with airlines.
      </Callout>
    </Box>
  );
};

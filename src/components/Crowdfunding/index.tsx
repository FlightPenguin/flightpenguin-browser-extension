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
        iconProps={{ icon: "solid-business-time" }}
        title="Want to own part of Flight Penguin?"
        minWidth="360px"
        maxWidth="768px"
        width="100%"
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
        We're offering our early users a chance to invest in Flight Penguin. People like you have been helping us grow
        more than 20% a month since the start of the year, and we're just getting started. Details about our progress
        and the raise are available on our crowdfunding page.
      </Callout>
    </Box>
  );
};

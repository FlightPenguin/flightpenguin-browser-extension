import { Box, Text } from "bumbag";
import React from "react";

import { DisplayableTrip } from "../../../../shared/types/newtypes/DisplayableTrip";
import { PaymentType } from "../../../constants";
import { getPointsValue } from "../../../utilities/forms/getPointsValue";

interface TripLegendProps {
  legendWidth: number;
  displayableTrip: DisplayableTrip;
  paymentType: PaymentType;
}

export const TripLegend = ({ displayableTrip, legendWidth, paymentType }: TripLegendProps): React.ReactElement => {
  const fareValue =
    paymentType === "CASH"
      ? `$${displayableTrip.getLowestFare()}`
      : `${getPointsValue(displayableTrip.getLowestFare(), paymentType)} pts`;

  return (
    <Box
      alignItems="center"
      boxSizing="border-box"
      data-name="flight-legend"
      display="flex"
      flexDirection="row"
      justifyContent={legendWidth >= 150 ? "start" : "center"}
      padding="major-1"
      width={`${legendWidth}px`}
    >
      <Box boxSizing="border-box" data-name="flight-price" paddingRight={legendWidth >= 150 ? "major-1" : "0px"}>
        <Text
          fontSize={paymentType === "CASH" ? "clamp(1rem, 2vw, 2rem)" : "clamp(1rem, 1.33vw, 1.5rem)"}
          fontWeight="700"
        >
          {fareValue}
        </Text>
      </Box>

      {legendWidth >= 150 && (
        <Box data-name="airlines" display="flex" width="65%">
          <Text
            data-name="primary-airline"
            whiteSpace="normal"
            fontSize="clamp(.5rem, 1.25vw, 1rem)"
            maxWidth="100%"
            textOverflow="ellipsis"
            display="block"
            overflow="hidden"
            maxHeight="80px"
          >
            {displayableTrip.getTrip().getDisplayCarriers()}
          </Text>
        </Box>
      )}
    </Box>
  );
};

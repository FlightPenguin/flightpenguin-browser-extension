import { Box, Text } from "bumbag";
import React from "react";

import { ProcessedFlightSearchResult } from "../../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../../shared/types/ProcessedItinerary";
import { PaymentType } from "../../../constants";
import { getPointsValue } from "../../../utilities/forms/getPointsValue";

interface FlightLegendProps {
  legendWidth: number;
  itinerary: ProcessedItinerary;
  flight: ProcessedFlightSearchResult;
  paymentType: PaymentType;
}

export const FlightLegend = ({
  flight,
  itinerary,
  legendWidth,
  paymentType,
}: FlightLegendProps): React.ReactElement => {
  const fareValue =
    paymentType === "CASH" ? `$${itinerary.fareNumber}` : `${getPointsValue(itinerary.fareNumber, paymentType)} pts`;

  return (
    <Box
      data-name="flight-legend"
      display="flex"
      boxSizing="border-box"
      whiteSpace="nowrap"
      alignX="center"
      width={`${legendWidth}px`}
      padding="major-1"
    >
      <Box data-name="flight-price">
        <Text fontSize={paymentType.toUpperCase() === "CASH" ? "500" : "250"} fontWeight="700">
          {fareValue}
        </Text>
      </Box>
      <Box
        data-name="airlines"
        display="flex"
        flexDirection="column"
        width="265px"
        paddingLeft="10px"
        whiteSpace="normal"
      >
        <Text
          data-name="primary-airline"
          whiteSpace="normal"
          maxWidth="185px"
          textOverflow="ellipsis"
          display="block"
          overflow="hidden"
          maxHeight="80px"
        >
          {flight.operatingAirline.display}
        </Text>
      </Box>
    </Box>
  );
};

//UnitedDelta Charlie Echo Something Chicken GoFish Stupid More Text More Fail Keep it Coming Stupid Head
//UnitedDeltaCharlieEchoSomethingChickenGoFishStupidMoreTextMoreFailKeepitComingStupidHead

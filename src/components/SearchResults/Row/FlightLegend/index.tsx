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
            {flight.operatingAirline.display}
          </Text>
        </Box>
      )}
    </Box>
  );
};

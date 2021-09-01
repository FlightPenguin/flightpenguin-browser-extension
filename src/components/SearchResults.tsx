import { Box } from "bumbag";
import React, { useState } from "react";

import { sendHighlightTab } from "../shared/events/sendHighlightTab";
import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../shared/types/ProcessedItinerary";
import { TimelineContainer } from "./TimelineContainer";
import { FlightSelection } from "./types/FlightSelection";

interface SearchResultProps {
  itineraries: { [keyof: string]: ProcessedItinerary };
  departureFlights: ProcessedFlightSearchResult[];
  returnFlights: ProcessedFlightSearchResult[];
  formData: FlightSearchFormData;
}

export const SearchResults = ({
  itineraries,
  departureFlights,
  returnFlights,
  formData,
}: SearchResultProps): React.ReactElement => {
  const [departureFlightDetails, setDepartureFlightDetails] = useState<FlightSelection | null>(null);
  const [returnFlightDetails, setReturnFlightDetails] = useState<FlightSelection | null>(null);

  return (
    <Box paddingTop="400px" display="flex" position="relative" justifyContent="center">
      <TimelineContainer
        flightType="DEPARTURE"
        itineraries={itineraries}
        flights={departureFlights}
        formData={formData}
        onSelection={(details) => {
          setDepartureFlightDetails(details);

          if (!formData.roundtrip) {
            sendHighlightTab(details.flightPenguinId, "");
          }
        }}
      />

      {departureFlightDetails && (
        <TimelineContainer
          flightType="RETURN"
          itineraries={itineraries}
          flights={returnFlights}
          formData={formData}
          onSelection={(details) => {
            setReturnFlightDetails(details);

            sendHighlightTab(departureFlightDetails?.flightPenguinId, details.flightPenguinId);
          }}
        />
      )}
    </Box>
  );
};

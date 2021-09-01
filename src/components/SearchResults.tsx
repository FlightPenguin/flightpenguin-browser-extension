import { Box } from "bumbag";
import React, { useState } from "react";

import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { Itinerary } from "../shared/types/Itinerary";
import { TimelineContainer } from "./TimelineContainer";
import { FlightSelection } from "./types/FlightSelection";

interface SearchResultProps {
  itineraries: Itinerary[];
  formData: FlightSearchFormData;
}

export const SearchResults = ({ itineraries, formData }: SearchResultProps): React.ReactElement => {
  const [departureFlightDetails, setDepartureFlightDetails] = useState<FlightSelection | null>(null);
  const [returnFlightDetails, setReturnFlightDetails] = useState<FlightSelection | null>(null);

  return (
    <Box paddingTop="400px" display="flex" position="relative" justifyContent="center">
      <TimelineContainer
        flightType={"DEPARTURE"}
        itineraries={itineraries}
        formData={formData}
        onSelection={(details) => {
          setDepartureFlightDetails(details);
        }}
      />

      {departureFlightDetails && (
        <TimelineContainer
          flightType={"RETURN"}
          itineraries={itineraries}
          formData={formData}
          onSelection={(details) => {
            setReturnFlightDetails(details);
          }}
        />
      )}
    </Box>
  );
};

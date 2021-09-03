import { Box } from "bumbag";
import React, { useEffect, useState } from "react";

import { sendHighlightTab } from "../../shared/events/sendHighlightTab";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../shared/types/ProcessedItinerary";
import { TimelineContainer } from "./Container";
import { FlightSelection } from "./FlightSelection";

export const SearchResults = (): React.ReactElement => {
  const [itineraries, setItineraries] = useState<{ [keyof: string]: ProcessedItinerary }>({});
  const [departureFlights, setDepartureFlights] = useState<ProcessedFlightSearchResult[]>([]);
  const [returnFlights, setReturnFlights] = useState<ProcessedFlightSearchResult[]>([]);
  const [formData, setFormData] = useState<FlightSearchFormData | null>(null);

  const [departureFlightDetails, setDepartureFlightDetails] = useState<FlightSelection | null>(null);
  const [returnFlightDetails, setReturnFlightDetails] = useState<FlightSelection | null>(null);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      switch (message.event) {
        case "FLIGHT_RESULTS_FOR_CLIENT":
          setDepartureFlights([...departureFlights, ...message.flights.departureList]);
          setItineraries({ ...itineraries, ...message.flights.itins });
          setFormData(message.formData);

          break;
        case "RETURN_FLIGHTS_FOR_CLIENT":
          setReturnFlights([...departureFlights, ...message.flights.departureList]);
          setItineraries({ ...itineraries, ...message.flights.itins });

          break;
        default:
          break;
      }
    });
  }, [setItineraries, setDepartureFlights, setReturnFlights, setFormData]);

  useEffect(() => {
    window.addEventListener("beforeunload", function () {
      // send message to bg that the page is being unloaded
      chrome.runtime.sendMessage({
        event: "INDEX_UNLOAD",
      });
    });
  });

  return (
    <Box className="search-results-container">
      {!!formData && !!itineraries && !!departureFlights.length && (
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
      )}

      {!!departureFlightDetails && !!formData && !!itineraries && !!returnFlights.length && (
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

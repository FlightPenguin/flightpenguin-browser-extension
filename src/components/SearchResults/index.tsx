import { Box } from "bumbag";
import { parseISO } from "date-fns";
import React, { useEffect, useState } from "react";

import { sendHighlightTab } from "../../shared/events/sendHighlightTab";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../shared/types/ProcessedItinerary";
import { TimelineContainer } from "./Container";
import { FlightSelection } from "./FlightSelection";

export const SearchResults = (): React.ReactElement => {
  const [flights, setFlights] = useState<{
    itineraries: { [keyof: string]: ProcessedItinerary };
    departureFlights: ProcessedFlightSearchResult[];
    returnFlights: ProcessedFlightSearchResult[];
    formData: FlightSearchFormData | null;
    lastUpdatedAt: Date | null;
    departuresComplete: boolean;
  }>({
    itineraries: {},
    departureFlights: [],
    returnFlights: [],
    formData: null,
    lastUpdatedAt: null, // helper to make sure we ignore out of order updates.
    departuresComplete: false,
  });
  const [departureFlightDetails, setDepartureFlightDetails] = useState<FlightSelection | null>(null);
  const [returnFlightDetails, setReturnFlightDetails] = useState<FlightSelection | null>(null);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      switch (message.event) {
        case "FLIGHT_RESULTS_FOR_CLIENT":
        case "RETURN_FLIGHTS_FOR_CLIENT":
          if (!flights.lastUpdatedAt || parseISO(message.flights.updatedAt) > flights.lastUpdatedAt) {
            setFlights({
              itineraries: message.flights.itins,
              departureFlights: message.flights.departureList,
              formData: message.formData,
              returnFlights: message.flights.returnList,
              lastUpdatedAt: parseISO(message.flights.updatedAt),
              departuresComplete: message.complete,
            });
          }
          break;
        default:
          break;
      }
    });
  }, [flights, setFlights]);

  useEffect(() => {
    window.addEventListener("beforeunload", function () {
      // send message to bg that the page is being unloaded
      chrome.runtime.sendMessage({
        event: "INDEX_UNLOAD",
      });
    });
  });

  return (
    <Box className="search-results-container" alignX="center">
      {!!flights.formData && !!Object.keys(flights.itineraries).length && !!flights.departureFlights.length && (
        <TimelineContainer
          flightType="DEPARTURE"
          itineraries={flights.itineraries}
          flights={flights.departureFlights}
          formData={flights.formData}
          loading={!departureFlightDetails && !flights.departuresComplete}
          onSelection={(details) => {
            setDepartureFlightDetails(details);

            if (!flights.formData?.roundtrip) {
              sendHighlightTab(details.flightPenguinId, "");
            }
          }}
        />
      )}

      {!!departureFlightDetails &&
        !!flights.formData &&
        !!Object.keys(flights.itineraries).length &&
        !!flights.returnFlights.length && (
          <>
            <Box height="100px" />
            <TimelineContainer
              flightType="RETURN"
              itineraries={flights.itineraries}
              flights={flights.returnFlights}
              formData={flights.formData}
              loading={false}
              onSelection={(details) => {
                setReturnFlightDetails(details);

                sendHighlightTab(departureFlightDetails?.flightPenguinId, details.flightPenguinId);
              }}
            />
          </>
        )}
    </Box>
  );
};

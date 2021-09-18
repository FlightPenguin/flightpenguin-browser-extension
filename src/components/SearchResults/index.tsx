import { useDebounce } from "@react-hook/debounce";
import { Box } from "bumbag";
import React, { useEffect, useState } from "react";

import { sendHighlightTab } from "../../shared/events";
import { sendClearSelections } from "../../shared/events/sendClearSelections";
import { sendIndexUnload } from "../../shared/events/sendIndexUnload";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../shared/types/ProcessedItinerary";
import TimelineContainer from "./Container";
import { FlightSelection } from "./FlightSelection";

interface SearchResultsProps {
  formData: FlightSearchFormData;
}

export const SearchResults = ({ formData }: SearchResultsProps): React.ReactElement => {
  const [flights, setFlights] = useDebounce<{
    itineraries: { [keyof: string]: ProcessedItinerary };
    departureFlights: ProcessedFlightSearchResult[];
    returnFlights: ProcessedFlightSearchResult[];
  }>(
    {
      itineraries: {},
      departureFlights: [],
      returnFlights: [],
    },
    500,
    true,
  );

  const [departuresComplete, setDeparturesComplete] = useState(false);
  const [returnsComplete, setReturnsComplete] = useState(false);
  const [departureFlightDetails, setDepartureFlightDetails] = useState<FlightSelection | null>(null);
  const [returnFlightDetails, setReturnFlightDetails] = useState<FlightSelection | null>(null);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      console.debug(message);
      switch (message.event) {
        case "FLIGHT_RESULTS_FOR_CLIENT":
        case "RETURN_FLIGHTS_FOR_CLIENT":
          setFlights({
            itineraries: message.flights.itins,
            departureFlights: message.flights.departureList,
            returnFlights: message.flights.returnList,
          });
          break;
        case "SCRAPING_COMPLETED":
          if (message.searchType === "RETURN") {
            setReturnsComplete(true);
          } else {
            setDeparturesComplete(true);
          }
          break;
        default:
          break;
      }
    });
  }, [setFlights]);

  useEffect(() => {
    window.addEventListener("beforeunload", function () {
      sendIndexUnload();
    });
  });

  return (
    <Box className="search-results-container" alignX="center" paddingTop="50px">
      <TimelineContainer
        flightType="DEPARTURE"
        itineraries={flights.itineraries}
        flights={flights.departureFlights}
        formData={formData}
        loading={!departuresComplete}
        onSelection={(details) => {
          setDepartureFlightDetails(details);

          if (!formData?.roundtrip) {
            sendHighlightTab(details.flightPenguinId, "");
          }
        }}
        onClear={() => {
          sendClearSelections();
          setDepartureFlightDetails(null);
          setFlights({ ...flights, returnFlights: [] });
          setReturnsComplete(false);
        }}
      />

      {!!departureFlightDetails && formData.roundtrip && (
        <>
          <Box height="50px" />
          <TimelineContainer
            flightType="RETURN"
            itineraries={flights.itineraries}
            flights={flights.returnFlights}
            formData={formData}
            loading={!returnsComplete}
            onSelection={(details) => {
              setReturnFlightDetails(details);

              sendHighlightTab(departureFlightDetails?.flightPenguinId, details.flightPenguinId);
            }}
            onClear={() => {
              setReturnFlightDetails(null);
            }}
          />
        </>
      )}
    </Box>
  );
};

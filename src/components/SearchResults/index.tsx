import { useDebounce } from "@react-hook/debounce";
import { Alert, Box, Button } from "bumbag";
import isEqual from "lodash.isequal";
import React, { useEffect, useState } from "react";

import { AnalyticsManager } from "../../background/AnalyticsManager";
import { sendHighlightTab } from "../../shared/events";
import { sendClearSelections } from "../../shared/events/sendClearSelections";
import { sendIndexUnload } from "../../shared/events/sendIndexUnload";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../shared/types/ProcessedItinerary";
import { sendFormDataToBackground } from "../SearchForm/utilities/sendFormDataToBackground";
import TimelineContainer from "./Container";
import { FlightSelection } from "./FlightSelection";

interface SearchResultsProps {
  formData: FlightSearchFormData;
  resultsContainerWidth: number;
}

export const SearchResults = ({ formData, resultsContainerWidth }: SearchResultsProps): React.ReactElement => {
  const analytics = new AnalyticsManager(`${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`, false);

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
  const [tabInteractionFailed, setTabInteractionFailed] = useState(false);
  const [searchAgainDisabled, setSearchAgainDisabled] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      sendResponse({ received: true, responderName: "searchResults" });
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
        case "HIGHLIGHT_TAB_FAILED":
          setTabInteractionFailed(true);
          break;
        default:
          break;
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", function () {
      sendIndexUnload();
    });
  });

  if (tabInteractionFailed) {
    return (
      <Box alignX="center" marginTop="major-6">
        <Alert title="Booking failed" type="danger">
          <Box width="100%">
            Flight Penguin opens windows in the background to search flight booking sites. We can't show your flight
            because this window is closed.
          </Box>
          <Box width="100%" marginTop="major-1">
            <Button
              disabled={searchAgainDisabled}
              palette="primary"
              onClick={() => {
                setSearchAgainDisabled(true);
                setFlights({
                  itineraries: {},
                  departureFlights: [],
                  returnFlights: [],
                });
                setDeparturesComplete(false);
                setReturnsComplete(false);
                setDepartureFlightDetails(null);
                setReturnFlightDetails(null);
                setTabInteractionFailed(false);

                sendFormDataToBackground(formData);
                setSearchAgainDisabled(false);
              }}
            >
              Try again
            </Button>
          </Box>
        </Alert>
      </Box>
    );
  }

  return (
    <Box className="search-results-container" alignX="center" paddingTop="50px">
      <TimelineContainer
        flightType="DEPARTURE"
        itineraries={flights.itineraries}
        flights={flights.departureFlights}
        formData={formData}
        loading={!departureFlightDetails && !departuresComplete}
        resultsContainerWidth={resultsContainerWidth}
        onSelection={(details) => {
          setDepartureFlightDetails(details);

          analytics.track({
            category: "flight search",
            action: "departure selection",
            label: window.location.host,
          });

          if (!formData?.roundtrip) {
            sendHighlightTab(details.flightPenguinId, "");

            analytics.track({
              category: "flight search",
              action: "flight selection",
              label: window.location.host,
            });
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
            loading={!returnFlightDetails && !returnsComplete}
            resultsContainerWidth={resultsContainerWidth}
            onSelection={(details) => {
              setReturnFlightDetails(details);

              sendHighlightTab(departureFlightDetails?.flightPenguinId, details.flightPenguinId);

              analytics.track({
                category: "flight search",
                action: "return selection",
                label: window.location.host,
              });
              analytics.track({
                category: "flight search",
                action: "flight selection",
                label: window.location.host,
              });
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

export default React.memo(SearchResults, (previous, next) => {
  return isEqual(previous, next);
});

import { useDebounce } from "@react-hook/debounce";
import { Alert, Box, Button } from "bumbag";
import isEqual from "lodash.isequal";
import range from "lodash.range";
import React, { useEffect, useState } from "react";
import * as browser from "webextension-polyfill";

import { AnalyticsManager } from "../../background/AnalyticsManager";
import { sendTripSelected } from "../../shared/events";
import { sendClearSelections } from "../../shared/events/sendClearSelections";
import { sendIndexUnload } from "../../shared/events/sendIndexUnload";
import { DisplayableTrip, DisplayableTripInput } from "../../shared/types/DisplayableTrip";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { getSearchTripMetaDefault, SearchTripMeta } from "../../shared/types/SearchMeta";
import { sendFormDataToBackground } from "../SearchForm/utilities/sendFormDataToBackground";
import TimelineContainer from "./Container";

interface SearchResultsProps {
  formData: FlightSearchFormData;
  resultsContainerWidth: number;
  onUpdateFormClick: () => void;
}

export const SearchResults = ({
  formData,
  resultsContainerWidth,
  onUpdateFormClick,
}: SearchResultsProps): React.ReactElement => {
  const analytics = new AnalyticsManager(`${process.env.GOOGLE_ANALYTICS_TRACKING_ID}`, false);
  const maxContainerIndex = formData.roundtrip ? 2 : 1;
  const minContainerIndex = 1;
  const containerRange = range(minContainerIndex, maxContainerIndex + 1);

  const [tripGroups, setTripGroups] = useDebounce<DisplayableTrip[][]>(
    containerRange.map((num) => {
      return [] as DisplayableTrip[];
    }),
    250,
    true,
  );
  const [searchMeta, setSearchMeta] = useDebounce<SearchTripMeta[]>(
    containerRange.map((num, index) => {
      return getSearchTripMetaDefault(formData, index);
    }),
    250,
    true,
  );
  const [currentTripGroupScrapingComplete, setCurrentTripGroupScrapingComplete] = useState(false);
  const [tripSelection, setTripSelection] = useState<(DisplayableTrip | null)[]>(
    containerRange.map((num) => {
      return null;
    }),
  );
  const [activeContainerIndex, setActiveContainerIndex] = useState(minContainerIndex);

  const [tabInteractionFailed, setTabInteractionFailed] = useState(false);
  const [searchAgainDisabled, setSearchAgainDisabled] = useState(false);
  const [windowClosed, setWindowClosed] = useState(false);
  const [unableToScrape, setUnableToScrape] = useState(false);
  const [itineraryNotFound, setItineraryNotFound] = useState(false);

  useEffect(() => {
    browser.runtime.onMessage.addListener((message, sender) => {
      console.debug(message);
      switch (message.event) {
        case "TRIP_RESULTS_FOR_CLIENT":
          setTripGroups(
            message.trips.map((tripGroups: DisplayableTripInput[]) => {
              return tripGroups.map((dTripInput) => {
                return new DisplayableTrip(dTripInput);
              });
            }),
          );
          setSearchMeta(message.meta);
          break;
        case "SCRAPING_STATUS":
          setCurrentTripGroupScrapingComplete(message.complete);
          break;
        case "WINDOW_CLOSED":
          setWindowClosed(true);
          break;
        case "SELECTED_ITINERARY_NOT_FOUND":
          setItineraryNotFound(true);
          break;
        case "HIGHLIGHT_TAB_FAILED":
          setTabInteractionFailed(true);
          break;
        case "SCRAPERS_FAILED_TO_START":
          setUnableToScrape(true);
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

  const searchAgain = async () => {
    setSearchAgainDisabled(true);

    setTripGroups(
      containerRange.map((num) => {
        return [] as DisplayableTrip[];
      }),
    );
    setCurrentTripGroupScrapingComplete(false);
    setTripSelection(
      containerRange.map((num) => {
        return null;
      }),
    );
    setSearchMeta(
      containerRange.map((num, index) => {
        return getSearchTripMetaDefault(formData, index);
      }),
    );
    setActiveContainerIndex(minContainerIndex);

    setTabInteractionFailed(false);
    setWindowClosed(false);
    setItineraryNotFound(false);

    sendFormDataToBackground(formData);
    setSearchAgainDisabled(false);
  };

  if (unableToScrape) {
    return (
      <Box alignX="center" marginTop="major-6">
        <Alert title="Search failed" type="danger">
          <Box width="100%">
            Flight Penguin opens windows in the background to search flight booking sites, but was unable to open these
            windows. Please disable any settings or extensions that may blocking Flight Penguin from opening windows
            from opening on this page, such as your ad blocker or extensions like noscript.
          </Box>
          <Box width="100%" marginTop="major-1">
            <Button disabled={searchAgainDisabled} palette="primary" onClick={searchAgain}>
              Try again
            </Button>
          </Box>
        </Alert>
      </Box>
    );
  }

  if (tabInteractionFailed || windowClosed) {
    return (
      <Box alignX="center" marginTop="major-6">
        <Alert title="Booking failed" type="danger">
          <Box width="100%">
            Flight Penguin opens windows in the background to search flight booking sites. We can't show your flight
            because at least one of these windows has been closed.
          </Box>
          <Box width="100%" marginTop="major-1">
            <Button disabled={searchAgainDisabled} palette="primary" onClick={searchAgain}>
              Try again
            </Button>
          </Box>
        </Alert>
      </Box>
    );
  }

  if (itineraryNotFound) {
    return (
      <Box alignX="center" marginTop="major-6">
        <Alert title="Flight not available" type="danger">
          <Box width="100%">
            It looks like the flight you selected is no longer available. Most commonly this happens because all seats
            have been booked or the search has been left open for too long, but there may be other errors.
          </Box>
          <Box width="100%" marginTop="major-1">
            <Button disabled={searchAgainDisabled} palette="primary" onClick={searchAgain}>
              Search again
            </Button>
          </Box>
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      className="search-results-container"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      paddingTop="50px"
      width="100%"
    >
      {containerRange.map((containerIndex) => {
        if (containerIndex <= activeContainerIndex) {
          const arrayIndex = Math.max(containerIndex - 1, 0);
          return (
            <React.Fragment key={`timeline-container-wrapper-${containerIndex}`}>
              {containerIndex > 1 && <Box height="50px" />}
              <TimelineContainer
                containerIndex={containerIndex}
                eligibleTrips={tripGroups[arrayIndex]}
                formData={formData}
                key={`timeline-container-${containerIndex}`}
                loading={!tripSelection[arrayIndex] && !currentTripGroupScrapingComplete}
                meta={searchMeta[arrayIndex]}
                onClear={() => {
                  setActiveContainerIndex(containerIndex);
                  const currentSelections = tripSelection.map((tripSelection, index) => {
                    const selectionContainerIndex = index + 1;
                    if (selectionContainerIndex >= containerIndex) {
                      return null;
                    }
                    return tripSelection;
                  });
                  setTripSelection(currentSelections);
                  sendClearSelections(
                    currentSelections.filter((trip) => {
                      return !!trip;
                    }) as DisplayableTrip[],
                  );
                }}
                onSelection={(trip: DisplayableTrip) => {
                  setCurrentTripGroupScrapingComplete(false);

                  const newActiveContainerIndex = containerIndex + 1;
                  const selectedTrips = tripSelection.map((existingSelection, index) => {
                    const selectionContainerIndex = index + 1;
                    if (containerIndex === selectionContainerIndex) {
                      return trip;
                    }
                    return existingSelection;
                  });

                  setActiveContainerIndex(newActiveContainerIndex);
                  setTripSelection(selectedTrips);
                  sendTripSelected(selectedTrips.filter((trip) => !!trip) as DisplayableTrip[]);
                  if (containerIndex === maxContainerIndex) {
                    analytics.track({
                      category: "flight search",
                      action: `trip selection`,
                      label: window.location.host,
                    });
                  }
                  analytics.track({
                    category: "flight search",
                    action: `trip flight selection`,
                    label: window.location.host,
                  });
                }}
                onUpdateFormClick={onUpdateFormClick}
                resultsContainerWidth={resultsContainerWidth}
              />
            </React.Fragment>
          );
        }
      })}
    </Box>
  );
};

export default React.memo(SearchResults, (previous, next) => {
  return isEqual(getValuesForMemoCheck(previous), getValuesForMemoCheck(next));
});

const getValuesForMemoCheck = ({ formData, resultsContainerWidth }: SearchResultsProps) => {
  return {
    formData,
    resultsContainerWidth,
  };
};

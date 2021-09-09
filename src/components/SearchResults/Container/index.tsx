import { Badge, Box, List } from "bumbag";
import isEqual from "lodash.isequal";
import uniqBy from "lodash.uniqby";
import React, { useEffect, useState } from "react";
import FadeIn from "react-fade-in";

import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../shared/types/ProcessedItinerary";
import { containerWidth, flightTimeContainerWidth, legendWidth, sidePaddingWidth } from "../../constants";
import { FlightSelection } from "../FlightSelection";
import TimelineHeader from "../Header";
import TimelineRow from "../Row";
import TimelineTitle from "../Title";
import _skeletonItineraries from "./skeletonItineraries.json";
import { getCheapestItinerary } from "./utilities/getCheapestItinerary";
import { getFlightPenguinId } from "./utilities/getFlightPenguinId";
import { getIntervalInfo } from "./utilities/getIntervalInfo";

interface TimelimeContainerProps {
  flightType: "DEPARTURE" | "RETURN";
  itineraries: { [keyof: string]: ProcessedItinerary };
  flights: ProcessedFlightSearchResult[];
  formData: FlightSearchFormData;
  loading: boolean;
  onSelection: (details: FlightSelection) => void;
}

const TimelineContainer = ({
  flightType,
  flights,
  itineraries,
  formData,
  loading,
  onSelection,
}: TimelimeContainerProps): React.ReactElement => {
  const skeletonItineraries = _skeletonItineraries as { [keyof: string]: ProcessedItinerary };

  const [selectedFlightDetails, setSelectedFlightDetails] = useState<FlightSelection | null>(null);
  const [displayFlights, setDisplayFlights] = useState<ProcessedFlightSearchResult[]>([]);
  const [intervalInfo, setIntervalInfo] = useState<{
    startHour: number;
    increment: number;
    intervals: number[];
    timezoneOffset: number;
  }>({ startHour: 0, increment: 4, intervals: [0, 4, 8, 12, 16, 20, 24, 28], timezoneOffset: 0 });

  useEffect(() => {
    if (selectedFlightDetails) {
      return;
    }
    const sortedFlights = uniqBy(flights, "id").sort((a, b) => {
      return a.pain - b.pain;
    });
    setDisplayFlights(sortedFlights);
  }, [flights, selectedFlightDetails]);

  useEffect(() => {
    if (Object.keys(itineraries).length) {
      const { intervals, increment, startHour } = getIntervalInfo(
        Object.values(itineraries),
        flightType,
        flightTimeContainerWidth,
      );
      const timezoneOffset = Object.values(itineraries)[0].depFlight?.timezoneOffset || 0;
      setIntervalInfo({ intervals, increment, startHour, timezoneOffset });
    }
  }, [itineraries]);

  return (
    <Box
      key="timeline-container-section"
      use="section"
      paddingLeft={`${sidePaddingWidth}px`}
      paddingRight={`${sidePaddingWidth}px`}
      paddingBottom="45px"
      paddingTop="95px"
      altitude="400"
      width={`${containerWidth + sidePaddingWidth * 2}px`}
    >
      <TimelineTitle key="search-title" flightType={flightType} loading={loading} />
      <Box
        data-name={`${flightType.toLowerCase()}-container`}
        display="flex"
        position="relative"
        justifyContent="center"
      >
        <Box
          display="flex"
          position="relative"
          justifyContent="center"
          border="default"
          boxSizing="border-box"
          flexGrow={1}
        >
          <List width={`${legendWidth}px`} borderLeft="default">
            {!displayFlights.length &&
              Object.keys(skeletonItineraries).map((itineraryId, index) => {
                // Present blurred items as placeholder during load...
                // eslint-disable-next-line security/detect-object-injection
                const itinerary = skeletonItineraries[itineraryId];
                const flight =
                  flightType === "RETURN" && itinerary.retFlight ? itinerary.retFlight : itinerary.depFlight;
                return (
                  <TimelineRow
                    flight={flight}
                    itinerary={itinerary}
                    flightType={flightType}
                    intervalCount={intervalInfo.intervals.length}
                    increment={intervalInfo.increment}
                    startHourOffset={intervalInfo.startHour}
                    key={`skeleton-itinerary-${index}`}
                    from={formData.from}
                    to={formData.to}
                    index={index}
                    selected={false}
                    skeleton={true}
                    onSelection={() => {}} // eslint-disable-line @typescript-eslint/no-empty-function
                  />
                );
              })}
            {displayFlights.map((flight, index) => {
              const flightPenguinId = getFlightPenguinId(flight);
              const cheapestItinerary = getCheapestItinerary(flight, itineraries);
              return (
                <FadeIn transitionDuration={1000} key={`itinerary-${flightPenguinId}`}>
                  <TimelineRow
                    flight={flight}
                    itinerary={cheapestItinerary}
                    flightType={flightType}
                    intervalCount={intervalInfo.intervals.length}
                    increment={intervalInfo.increment}
                    startHourOffset={intervalInfo.startHour}
                    key={`itinerary-${flightPenguinId}`}
                    from={formData.from}
                    to={formData.to}
                    index={index}
                    selected={!!selectedFlightDetails && selectedFlightDetails.flightPenguinId === flight.id}
                    skeleton={false}
                    onSelection={(details: FlightSelection) => {
                      setSelectedFlightDetails(details);
                      setDisplayFlights([details.flight]);
                      onSelection(details);
                    }}
                  />
                </FadeIn>
              );
            })}
          </List>
          <TimelineHeader
            formData={formData}
            flightType={flightType}
            intervals={intervalInfo.intervals}
            tzOffset={intervalInfo.timezoneOffset}
          />
        </Box>
      </Box>
      {selectedFlightDetails && (
        <Badge isAttached size="large" palette="danger">
          <Box marginBottom="5px" fontSize={200} cursor="pointer" onClick={() => setSelectedFlightDetails(null)}>
            x
          </Box>
        </Badge>
      )}
    </Box>
  );
};

export default React.memo(TimelineContainer, (previous, next) => {
  return isEqual(
    {
      flights: previous.flights,
      itineraries: previous.itineraries,
      formData: previous.formData,
      flightType: previous.flightType,
      loading: previous.loading,
    },
    {
      flights: next.flights,
      itineraries: next.itineraries,
      formData: next.formData,
      flightType: next.flightType,
      loading: next.loading,
    },
  );
});

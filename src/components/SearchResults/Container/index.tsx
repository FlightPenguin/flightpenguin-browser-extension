import { Box, List } from "bumbag";
import uniqBy from "lodash.uniqby";
import React, { useEffect, useState } from "react";
import FadeIn from "react-fade-in";

import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../shared/types/ProcessedItinerary";
import { FlightSelection } from "../FlightSelection";
import { TimelineHeader } from "../Header";
import { TimelineRow } from "../Row";
import TimelineTitle from "../Title";
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

export const TimelineContainer = ({
  flightType,
  flights,
  itineraries,
  formData,
  loading,
  onSelection,
}: TimelimeContainerProps): React.ReactElement => {
  const containerWidth = 1418;
  const legendWidth = 300;
  const sidePaddingWidth = 85;
  const flightTimeContainerWidth = containerWidth - legendWidth - 1;

  const [selectedFlightDetails, setSelectedFlightDetails] = useState<FlightSelection | null>(null);
  const [displayFlights, setDisplayFlights] = useState<ProcessedFlightSearchResult[]>([]);
  const [intervalInfo, setIntervalInfo] = useState<{
    startHour: number;
    increment: number;
    intervals: number[];
    timezoneOffset: number;
  }>({ startHour: 0, increment: 3, intervals: [0, 3, 6, 12, 15, 18, 21, 24], timezoneOffset: 0 });

  useEffect(() => {
    const sortedFlights = uniqBy(flights, "id").sort((a, b) => {
      return a.pain - b.pain;
    });
    setDisplayFlights(sortedFlights);
  }, [flights]);

  useEffect(() => {
    const { intervals, increment, startHour } = getIntervalInfo(
      Object.values(itineraries),
      flightType,
      flightTimeContainerWidth,
    );
    const timezoneOffset = displayFlights[0]?.timezoneOffset || 0;
    setIntervalInfo({ intervals, increment, startHour, timezoneOffset });
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
      <TimelineTitle
        key="search-title"
        flightType={flightType}
        headerWidth={flightTimeContainerWidth}
        legendWidth={legendWidth}
        loading={loading}
      />
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
            {displayFlights.map((flight, index) => {
              const flightPenguinId = getFlightPenguinId(flight);
              const cheapestItinerary = getCheapestItinerary(flight, itineraries);
              return (
                <FadeIn transitionDuration={1000} key={`itinerary-${flightPenguinId}`}>
                  <TimelineRow
                    flight={flight}
                    itinerary={cheapestItinerary}
                    flightType={flightType}
                    maxRowWidth={containerWidth}
                    flightTimeContainerWidth={flightTimeContainerWidth}
                    legendWidth={legendWidth}
                    intervalCount={intervalInfo.intervals.length}
                    increment={intervalInfo.increment}
                    startHourOffset={intervalInfo.startHour}
                    key={`itinerary-${flightPenguinId}`}
                    from={formData.from}
                    to={formData.to}
                    index={index}
                    hide={!!selectedFlightDetails}
                    onSelection={(details: FlightSelection) => {
                      setSelectedFlightDetails(details);
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
            flightTimeContainerWidth={flightTimeContainerWidth}
          />
        </Box>
      </Box>
    </Box>
  );
};

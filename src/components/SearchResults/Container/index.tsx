import { Box, List } from "bumbag";
import uniqBy from "lodash.uniqby";
import React, { useState } from "react";

import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../shared/types/ProcessedItinerary";
import { FlightSelection } from "../FlightSelection";
import { TimelineHeader } from "../Header";
import { TimelineRow } from "../Row";
import { TimelineTitle } from "../Title";
import { getCheapestItinerary } from "./utilities/getCheapestItinerary";
import { getFlightPenguinId } from "./utilities/getFlightPenguinId";
import { getIntervalInfo } from "./utilities/getIntervalInfo";

interface TimelimeContainerProps {
  flightType: "DEPARTURE" | "RETURN";
  itineraries: { [keyof: string]: ProcessedItinerary };
  flights: ProcessedFlightSearchResult[];
  formData: FlightSearchFormData;
  onSelection: (details: FlightSelection) => void;
}

export const TimelineContainer = ({
  flightType,
  flights,
  itineraries,
  formData,
  onSelection,
}: TimelimeContainerProps): React.ReactElement => {
  const [selectedFlightDetails, setSelectedFlightDetails] = useState<FlightSelection | null>(null);

  const displayFlights = uniqBy(flights, "id").sort((a, b) => {
    return a.pain - b.pain;
  });

  const containerWidth = 1418;
  const legendWidth = 300;
  const sidePaddingWidth = 85;
  const flightTimeContainerWidth = containerWidth - legendWidth - 1;
  const { intervals, increment, startHour } = getIntervalInfo(
    Object.values(itineraries),
    flightType,
    flightTimeContainerWidth,
  );
  const timezoneOffset = displayFlights[0].timezoneOffset;

  return (
    <Box
      use="section"
      paddingLeft={`${sidePaddingWidth}px`}
      paddingRight={`${sidePaddingWidth}px`}
      paddingBottom="45px"
      paddingTop={timezoneOffset > 0 ? "95px" : "65px"}
      altitude="400"
      width={`${containerWidth + sidePaddingWidth * 2}px`}
    >
      <TimelineTitle
        flightType={flightType}
        flightCount={displayFlights.length}
        headerWidth={flightTimeContainerWidth}
        legendWidth={legendWidth}
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
                <TimelineRow
                  flight={flight}
                  itinerary={cheapestItinerary}
                  flightType={flightType}
                  maxRowWidth={containerWidth}
                  flightTimeContainerWidth={flightTimeContainerWidth}
                  legendWidth={legendWidth}
                  intervalCount={intervals.length}
                  increment={increment}
                  startHourOffset={startHour}
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
              );
            })}
          </List>
          <TimelineHeader
            formData={formData}
            flightType={flightType}
            intervals={intervals}
            tzOffset={timezoneOffset}
            flightTimeContainerWidth={flightTimeContainerWidth}
          />
        </Box>
      </Box>
    </Box>
  );
};

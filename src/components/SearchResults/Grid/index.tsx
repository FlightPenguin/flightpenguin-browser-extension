import { Box, List as BumbagList } from "bumbag";
import React from "react";
import { List, ListRowRenderer, WindowScroller } from "react-virtualized";

import { FlightType } from "../../../background/constants";
import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../shared/types/ProcessedItinerary";
import { containerWidth } from "../../constants";
import { getCheapestItinerary } from "../Container/utilities/getCheapestItinerary";
import { getFlightPenguinId } from "../Container/utilities/getFlightPenguinId";
import { FlightSelection } from "../FlightSelection";
import TimelineRow from "../Row";

interface TimelineGridProps {
  flights: ProcessedFlightSearchResult[];
  itineraries: { [keyof: string]: ProcessedItinerary };
  startHour: number;
  increment: number;
  intervalCount: number;
  flightType: FlightType;
  formData: FlightSearchFormData;
  skeleton: boolean;
  selectedFlight: ProcessedFlightSearchResult | undefined;
  onSelection: (details: FlightSelection) => void;
}

const TimelineGrid = ({
  flights,
  itineraries,
  startHour,
  increment,
  intervalCount,
  flightType,
  formData,
  skeleton,
  selectedFlight,
  onSelection,
}: TimelineGridProps): React.ReactElement => {
  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    const flight = flights[index];
    const cheapestItinerary = getCheapestItinerary(flight, itineraries);
    const flightPenguinId = getFlightPenguinId(flight);

    return (
      <Box key={key} style={style} width={`${containerWidth}px`}>
        <TimelineRow
          flight={flight}
          itinerary={cheapestItinerary}
          flightType={flightType}
          intervalCount={intervalCount}
          increment={increment}
          startHourOffset={startHour}
          key={`itinerary-${flightPenguinId}`}
          from={formData.from}
          to={formData.to}
          index={index}
          selected={!!selectedFlight && selectedFlight.id === flight.id}
          skeleton={skeleton}
          onSelection={(details: FlightSelection) => {
            onSelection(details);
          }}
        />
      </Box>
    );
  };

  return (
    <BumbagList>
      <WindowScroller scrollElement={window}>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <Box ref={registerChild}>
            <List
              autoHeight={true}
              height={height}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              overscanRowCount={2}
              rowCount={flights.length}
              rowHeight={80}
              rowRenderer={rowRender}
              scrollTop={scrollTop}
              tabIndex={-1}
              width={containerWidth}
            />
          </Box>
        )}
      </WindowScroller>
    </BumbagList>
  );
};

export default TimelineGrid;

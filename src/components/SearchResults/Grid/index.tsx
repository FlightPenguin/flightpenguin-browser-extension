import { Box, List as BumbagList } from "bumbag";
import React from "react";
import { List, ListRowRenderer, WindowScroller } from "react-virtualized";

import { FlightType } from "../../../background/constants";
import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { ProcessedFlightSearchResult } from "../../../shared/types/ProcessedFlightSearchResult";
import { ProcessedItinerary } from "../../../shared/types/ProcessedItinerary";
import { rowHeight } from "../../constants";
import { getPaymentType } from "../../SearchForm/utilities/getPaymentType";
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
  legendContainerWidth: number;
  flightTimeContainerWidth: number;
  resultsContainerWidth: number;
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
  legendContainerWidth,
  flightTimeContainerWidth,
  resultsContainerWidth,
}: TimelineGridProps): React.ReactElement => {
  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    const flight = flights[index];
    const cheapestItinerary = getCheapestItinerary(flight, itineraries);
    const flightPenguinId = getFlightPenguinId(flight);
    const paymentMethod = getPaymentType(formData);

    return (
      <Box key={key} style={style} width={`${resultsContainerWidth}px`}>
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
          legendContainerWidth={legendContainerWidth}
          flightTimeContainerWidth={flightTimeContainerWidth}
          resultsContainerWidth={resultsContainerWidth}
          skeleton={skeleton}
          paymentType={paymentMethod}
          onSelection={(details: FlightSelection) => {
            onSelection(details);
          }}
        />
      </Box>
    );
  };

  return (
    <BumbagList>
      <WindowScroller scrollElement={window} scrollingResetTimeInterval={50}>
        {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
          <Box ref={registerChild}>
            <List
              autoHeight={true}
              height={height}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              overscanRowCount={8}
              rowCount={flights.length}
              rowHeight={rowHeight}
              rowRenderer={rowRender}
              scrollTop={scrollTop}
              tabIndex={-1}
              width={resultsContainerWidth + 100} // +n allows time boxes to flow over
            />
          </Box>
        )}
      </WindowScroller>
    </BumbagList>
  );
};

export default TimelineGrid;

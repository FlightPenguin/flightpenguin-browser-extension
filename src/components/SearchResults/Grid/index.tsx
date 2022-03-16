import { Box, List as BumbagList } from "bumbag";
import React from "react";
import { List, ListRowRenderer, WindowScroller } from "react-virtualized";

import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { DisplayableTrip } from "../../../shared/types/newtypes/DisplayableTrip";
import { rowHeight } from "../../constants";
import { getPaymentType } from "../../SearchForm/utilities/getPaymentType";
import TimelineRow from "../Row";

interface TimelineGridProps {
  trips: DisplayableTrip[];
  containerStartTime: Date;
  containerEndTime: Date;
  intervalWidth: number;
  formData: FlightSearchFormData;
  skeleton: boolean;
  selectedTrip: DisplayableTrip | null;
  onSelection: (trip: DisplayableTrip) => void;
  legendContainerWidth: number;
  tripContainerWidth: number;
  resultsContainerWidth: number;
}

const TimelineGrid = ({
  trips,
  containerEndTime,
  containerStartTime,
  intervalWidth,
  formData,
  skeleton,
  selectedTrip,
  onSelection,
  legendContainerWidth,
  tripContainerWidth,
  resultsContainerWidth,
}: TimelineGridProps): React.ReactElement => {
  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    const trip = trips[index];
    const paymentMethod = getPaymentType(formData);

    return (
      <Box key={key} style={style} width={`${resultsContainerWidth}px`}>
        <TimelineRow
          displayableTrip={trip}
          containerStartTime={containerStartTime}
          containerEndTime={containerEndTime}
          intervalWidth={intervalWidth}
          key={`trip-timeline-row-${trip.getTrip().getId()}`}
          index={index}
          selected={!!selectedTrip && selectedTrip.getTrip().getId() === trip.getTrip().getId()}
          legendContainerWidth={legendContainerWidth}
          tripContainerWidth={tripContainerWidth}
          resultsContainerWidth={resultsContainerWidth}
          skeleton={skeleton}
          paymentType={paymentMethod}
          onSelection={(trip: DisplayableTrip) => {
            onSelection(trip);
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
              overscanRowCount={5}
              rowCount={trips.length}
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

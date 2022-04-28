import { Box, List as BumbagList } from "bumbag";
import React from "react";
import { List, ListRowRenderer, WindowScroller } from "react-virtualized";

import { DisplayableTrip } from "../../../shared/types/DisplayableTrip";
import { FlightSearchFormData } from "../../../shared/types/FlightSearchFormData";
import { rowHeight } from "../../constants";
import { getPaymentType } from "../../SearchForm/utilities/getPaymentType";
import TimelineRow from "../Row";

interface TimelineGridProps {
  trips: DisplayableTrip[];
  intervalWidth: number;
  formData: FlightSearchFormData;
  skeleton: boolean;
  selectedTrip: DisplayableTrip | null;
  onSelection: (trip: DisplayableTrip) => void;
  legendContainerWidth: number;
  resultsContainerWidth: number;
}

const TimelineGrid = ({
  trips,
  intervalWidth,
  formData,
  skeleton,
  selectedTrip,
  onSelection,
  legendContainerWidth,
  resultsContainerWidth,
}: TimelineGridProps): React.ReactElement => {
  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    const trip = trips[index];
    const paymentMethod = getPaymentType(formData);

    return (
      <Box key={key} style={style} width={`${resultsContainerWidth}px`}>
        <TimelineRow
          displayableTrip={trip}
          intervalWidth={intervalWidth}
          key={`trip-timeline-row-${trip.getTrip().getId()}`}
          index={index}
          selected={!!selectedTrip && selectedTrip.getTrip().getId() === trip.getTrip().getId()}
          legendContainerWidth={legendContainerWidth}
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
              style={{ willChange: "auto" }}
              tabIndex={-1}
              width={resultsContainerWidth + 256} // +n allows time boxes to flow over
            />
          </Box>
        )}
      </WindowScroller>
    </BumbagList>
  );
};

export default TimelineGrid;

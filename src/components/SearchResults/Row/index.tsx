import { Badge, Box, List, Tag, Text } from "bumbag";
import isEqual from "lodash.isequal";
import React, { useEffect, useState } from "react";

import { DisplayableTrip } from "../../../shared/types/DisplayableTrip";
import { PaymentType } from "../../constants";
import DominatedTripsButton from "./DominatedTripsButton";
import TripComponentContainer from "./TripComponent";
import { TripLegend } from "./TripLegend";

interface TimelineRowProps {
  displayableTrip: DisplayableTrip;
  intervalWidth: number;
  paymentType: PaymentType;
  index: number;
  skeleton: boolean;
  selected: boolean;
  legendContainerWidth: number;
  resultsContainerWidth: number;
  onSelection: (trip: DisplayableTrip) => void;
}

const TimelineRow = ({
  displayableTrip,
  intervalWidth,
  paymentType,
  index,
  selected,
  skeleton,
  legendContainerWidth,
  resultsContainerWidth,
  onSelection,
}: TimelineRowProps): React.ReactElement => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const rowWidth = resultsContainerWidth;

  const backgroundColor = index % 2 === 0 || selected ? "primaryTint" : "white";
  const bottomBorder = index % 2 === 1 ? "default" : "none";

  if (loading) {
    return (
      <List.Item
        width={`${rowWidth}px`}
        alignX="center"
        alignY="center"
        minHeight="90px"
        backgroundColor={backgroundColor}
        borderBottom={bottomBorder}
      />
    );
  }

  const rowHighlightStyle = selected
    ? {}
    : {
        backgroundColor: "primary200",
        zIndex: "999",
      };
  const showWhenSelected = selected ? "visible" : "hidden";
  const skeletonBlur = skeleton ? `blur(8px)` : "";
  const timezoneOffset = displayableTrip.getTrip().getTimezoneOffset();
  const arrivalTextColor = timezoneOffset ? "warning" : "black";
  const departureTextColor = timezoneOffset ? "info" : "black";

  const timebarPosition = displayableTrip.getTimebarPosition();
  const componentsWithPositions = displayableTrip.getTripComponentsWithPositions();

  const left = timebarPosition.startX;
  const width = timebarPosition.width;
  const right = timebarPosition.startX + timebarPosition.width;

  const dominationCount = displayableTrip.getDominatedTripIds().length;

  return (
    <List.Item
      aria-label={displayableTrip.getAriaLabelText()}
      data-name="flight-list-item"
      whiteSpace="nowrap"
      alignX="center"
      display="flex"
      tabIndex={0}
      width={`${rowWidth}px`}
      onClick={() => {
        if (skeleton || selected) {
          return;
        }
        onSelection(displayableTrip);
      }}
      role="group"
      cursor={skeleton ? "not-allowed" : selected ? "auto" : "pointer"}
      marginBottom="0px"
      backgroundColor={backgroundColor}
      borderBottom={bottomBorder}
      borderLeft="default"
      borderRight="default"
      minHeight="90px"
      filter={skeletonBlur}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _hover={rowHighlightStyle}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _focus={rowHighlightStyle}
    >
      <TripLegend legendWidth={legendContainerWidth} displayableTrip={displayableTrip} paymentType={paymentType} />
      <Box
        data-name={"trip-container"}
        position="relative"
        display="flex"
        alignX="center"
        width="100%"
        alignSelf="normal"
        flex={1}
        background={`repeating-linear-gradient(to right, #e6e6eb, #e6e6eb 3px, transparent 1px, transparent ${intervalWidth}px)`}
      >
        <Box
          data-name="trip-flights"
          data-content={displayableTrip.getTrip().getDisplayDuration()}
          left={`${left}%`}
          display="flex"
          alignX="center"
          flexDirection={"column"}
          position="absolute"
          width={`${width}%`}
          marginTop="8px"
        >
          <Box height={`60px`} marginBottom="16px" width="100%">
            <Text
              alignX="center"
              alignY="top"
              fontSize="100"
              visibility={showWhenSelected}
              marginBottom="5px"
              border="1px solid #404040"
              borderWidth="0px 0px 1px 0px"
              width="100%"
              _groupFocus={{ visibility: "visible" }}
              _groupHover={{ visibility: "visible" }}
            >
              {displayableTrip.getTrip().getDisplayDuration()}
            </Text>
            {componentsWithPositions.map((wrapper) => {
              return (
                <TripComponentContainer
                  tripComponent={wrapper.tripComponent}
                  layout={wrapper.layout}
                  key={wrapper.tripComponent.getObject().getId()}
                />
              );
            })}
          </Box>
        </Box>
        <Tag
          data-name="departure-time"
          palette="text"
          variant="outlined"
          size="medium"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          left={`calc(${left}% - 107px)`}
          position="absolute"
          textAlign="right"
          visibility={showWhenSelected}
          _groupHover={selected ? {} : { visibility: "visible" }}
          _groupFocus={selected ? {} : { visibility: "visible" }}
          backgroundColor="white"
          color={departureTextColor}
        >
          {displayableTrip.getTrip().getDisplayDepartureTime()}
          {!!timezoneOffset && (
            <Badge isAttached palette="info">
              {displayableTrip.getTrip().getDepartureLocation().getCode()}
            </Badge>
          )}
        </Tag>
        <Tag
          palette="text"
          variant="outlined"
          size="medium"
          data-name="arrival-time"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          left={`calc(${right}% + 27px)`}
          position="absolute"
          visibility={showWhenSelected}
          _groupHover={selected ? {} : { visibility: "visible" }}
          _groupFocus={selected ? {} : { visibility: "visible" }}
          backgroundColor="white"
          color={arrivalTextColor}
        >
          {displayableTrip.getTrip().getDisplayArrivalTime()}
          {!!timezoneOffset && (
            <Badge isAttached palette="warning">
              {displayableTrip.getTrip().getArrivalLocation().getCode()}
            </Badge>
          )}
        </Tag>
      </Box>
      {!!dominationCount && !selected && (
        <DominatedTripsButton tripCount={dominationCount} tripId={displayableTrip.getTrip().getId()} />
      )}
    </List.Item>
  );
};

export default React.memo(TimelineRow, (previous, next) => {
  return isEqual(getComparableProperties(previous), getComparableProperties(next));
});

const getComparableProperties = (row: TimelineRowProps) => {
  return {
    tripId: row.displayableTrip.getTrip().getId(),
    dominatedTripCount: row.displayableTrip.getDominatedTripIds().length,
    intervalWidth: row.intervalWidth,
    index: row.index,
    selected: row.selected,
  };
};

import { Box, Text, Tooltip } from "bumbag";
import isEqual from "lodash.isequal";
import React from "react";

import { TripComponent } from "../../../../shared/types/TripComponent";

interface TripComponentContainerInput {
  tripComponent: TripComponent;
  layout: { startX: number; width: number };
  index: number;
  maxIndex: number;
}

const TripComponentContainer = ({
  tripComponent,
  layout,
  index,
  maxIndex,
}: TripComponentContainerInput): React.ReactElement => {
  const isLayover = tripComponent.getObject().getType() === "LAYOVER";
  const isFirst = index === 0;
  const isLast = index === maxIndex;

  return (
    <Box
      display="flex"
      width={`${layout.width}%`}
      left={`${layout.startX}%`}
      key={`trip-component-wrapper-${tripComponent.getObject().getId()}`}
      height="30px"
      position="absolute"
      tabIndex={-1}
      flexDirection="column"
    >
      <Box
        data-name="trip-component"
        background={
          isLayover
            ? "repeating-linear-gradient(45deg, rgba(125, 130, 162, 0.5), rgba(147, 153, 191, 0.5) 5px, rgba(122, 128, 165, 0.5) 5px, rgba(98, 105, 146, 0.5) 10px)"
            : undefined
        }
        backgroundColor={isLayover ? "transparent" : tripComponent.getObject().getAirline().getColor()}
      >
        <Tooltip
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          content={tripComponent.getObject().getDisplayDescriptionText()}
          hasArrow
          placement="bottom"
          tabIndex={-1}
          tooltipContentProps={{ whiteSpace: "pre" }}
        >
          <Box width={`${layout.width}px`}>
            <Text>&nbsp;</Text>
          </Box>
        </Tooltip>
      </Box>
      <Box display="flex">
        {isFirst && isLast && (
          <React.Fragment>
            <Box width="50%">
              <Text
                alignX="left"
                width="100%"
                fontSize="clamp(.4375rem, 1vw, .875rem)"
                left="-16px"
                paddingTop="minor-1"
                position="absolute"
              >
                {tripComponent.getObject().getDepartureLocation().getCode()}
              </Text>
            </Box>
            <Box width="50%">
              <Text
                alignX="right"
                width="100%"
                fontSize="clamp(.4375rem, 1vw, .875rem)"
                left="16px"
                paddingTop="minor-1"
                position="absolute"
              >
                {tripComponent.getObject().getArrivalLocation().getCode()}
              </Text>
            </Box>
          </React.Fragment>
        )}
      </Box>
      {isFirst && !isLast && (
        <Box width="100%">
          <Text
            alignX="left"
            width="100%"
            fontSize="clamp(.4375rem, 1vw, .875rem)"
            left="-16px"
            paddingTop="minor-1"
            position="absolute"
          >
            {tripComponent.getObject().getDepartureLocation().getCode()}
          </Text>
        </Box>
      )}
      {isLayover && (
        <Text alignX="center" width="100%" fontSize="clamp(.4375rem, 1vw, .875rem)" paddingTop="minor-1">
          {/* TODO: Display layover transfer */}
          {tripComponent.getObject().getArrivalLocation().getCode()}
        </Text>
      )}
      {isLast && !isFirst && (
        <Box width="100%">
          <Text
            alignX="right"
            width="100%"
            fontSize="clamp(.4375rem, 1vw, .875rem)"
            left="16px"
            paddingTop="minor-1"
            position="absolute"
          >
            {tripComponent.getObject().getArrivalLocation().getCode()}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default React.memo(TripComponentContainer, (previous, next) => {
  return isEqual(getComparableProperties(previous), getComparableProperties(next));
});

const getComparableProperties = (input: TripComponentContainerInput) => {
  return {
    tripComponent: input.tripComponent,
    layout: input.layout,
  };
};

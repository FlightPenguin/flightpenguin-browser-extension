import { Box, Text, Tooltip } from "bumbag";
import isEqual from "lodash.isequal";
import React from "react";

import { TripComponent } from "../../../../shared/types/TripComponent";
import { getTripComponentTooltipText } from "./utilities/getTripComponentTooltipText";

interface TripComponentContainerInput {
  tripComponent: TripComponent;
  left: number;
  layout: { startX: number; width: number };
}

const TripComponentContainer = ({ tripComponent, layout, left }: TripComponentContainerInput): React.ReactElement => {
  const isLayover = tripComponent.getObject().getType() === "LAYOVER";

  return (
    <Box
      display="flex"
      width={`${layout.width}px`}
      left={`${layout.startX - left}px`}
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
          content={getTripComponentTooltipText(tripComponent)}
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
      {isLayover && (
        <Box>
          <Text alignX="center" fontSize="clamp(.4375rem, 1vw, .875rem)">
            {/* TODO: Display layover transfer */}
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
    left: input.left,
    layout: input.layout,
  };
};

import { Box, Button, Tooltip } from "bumbag";
import isEqual from "lodash.isequal";
import pluralize from "pluralize";
import React, { useState } from "react";

import { sidePaddingWidth } from "../../../constants";

interface DominatedTripsButtonProps {
  tripId: string;
  tripCount: number;
}

const DominatedTripsButton = ({ tripId, tripCount }: DominatedTripsButtonProps): React.ReactElement => {
  const [show, setShow] = useState(true);

  const verb = tripCount === 1 ? "is" : "are";

  return (
    <Box
      data-name="dominated-trips-container"
      left={`${sidePaddingWidth}px`}
      position="relative"
      width={`${sidePaddingWidth}px`}
    >
      {show && (
        <Box display="flex" justifyContent="center" width="100%">
          <Box width="80%">
            {" "}
            <Tooltip
              content={`There ${verb} ${tripCount} ${pluralize(
                "flight",
                tripCount,
              )} from this airline that ${verb} clearly worse.  Click this button to show these results.`}
            >
              <Button
                aria-label={`Show ${tripCount} worse flights from this airline.`}
                iconAfter="solid-expand-alt"
                onClick={(event) => {
                  event.stopPropagation();
                  setShow(false);
                  console.debug(tripId);
                }}
                palette="primary"
                size="small"
                variant="outlined"
                width="100%"
              >
                {tripCount}
              </Button>
            </Tooltip>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default React.memo(DominatedTripsButton, (previous, next) => {
  return isEqual(getComparableProperties(previous), getComparableProperties(next));
});

const getComparableProperties = (props: DominatedTripsButtonProps) => {
  return {
    tripId: props.tripId,
    tripCount: props.tripCount,
  };
};

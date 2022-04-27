import { Box } from "bumbag";
import React from "react";

import { rowHeight } from "../../../constants";

interface LeftFlagProps {
  position: number;
  color: string;
  inUse: boolean;
  tripContainerWidth: number;
  tripCount: number;
}

export const RightFlag = ({
  color,
  inUse,
  position,
  tripContainerWidth,
  tripCount,
}: LeftFlagProps): React.ReactElement => {
  const width = tripContainerWidth - position;

  return (
    <Box
      width={`${width}px`}
      left={`${width / 2}px`}
      marginTop="6px"
      height={`${rowHeight * tripCount}px`}
      borderLeftWidth="5px"
      borderLeftColor={color}
      borderLeftStyle="solid"
      position="relative"
      backgroundColor={inUse ? "grey" : "transparent"}
      opacity={inUse ? 0.7 : 0}
      zIndex={inUse ? 99 : -1}
    />
  );
};

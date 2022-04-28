import { Box } from "bumbag";
import React from "react";

import { rowHeight } from "../../../constants";

interface LeftFlagProps {
  position: number;
  color: string;
  inUse: boolean;
  tripCount: number;
}

export const LeftFlag = ({ color, inUse, position, tripCount }: LeftFlagProps): React.ReactElement => {
  return (
    <Box
      width={`${position + 5}px`}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      left={`-${position / 2}px`}
      marginTop="6px"
      height={`${rowHeight * tripCount}px`}
      borderRightWidth="5px"
      borderRightColor={color}
      borderRightStyle="solid"
      position="relative"
      backgroundColor={inUse ? "grey" : "transparent"}
      opacity={inUse ? 0.7 : 0}
      zIndex={inUse ? 20 : -1}
    />
  );
};

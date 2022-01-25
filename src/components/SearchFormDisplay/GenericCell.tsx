import { Box, Text } from "bumbag";
import React from "react";

interface GenericCellProps {
  icon: React.ReactElement;
  displayText: string;
}

export const GenericCell = ({ icon, displayText }: GenericCellProps): React.ReactElement => {
  return (
    <Box
      display="flex"
      boxSizing="border-box"
      whiteSpace="nowrap"
      alignX="center"
      padding="major-1"
      flexBasis={{ default: "12%", "max-desktop": "30%", "max-tablet": "45%", mobile: "100%" }}
      justifyContent="center"
    >
      <Box display="flex" flexDirection="column">
        <Text>
          {icon}
          {displayText}
        </Text>
      </Box>
    </Box>
  );
};

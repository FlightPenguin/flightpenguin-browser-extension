import { Box, Icon, Text } from "bumbag";
import React from "react";

interface GenericCellProps {
  icon: React.ReactElement;
  displayText: string;
}

export const GenericCell = ({ icon, displayText }: GenericCellProps): React.ReactElement => {
  return (
    <Box display="flex" boxSizing="border-box" whiteSpace="nowrap" alignX="center" padding="major-1">
      <Box display="flex" flexDirection="column" paddingLeft="10px" paddingRight="10px" whiteSpace="normal">
        <Text whiteSpace="normal">
          {icon}
          {displayText}
        </Text>
      </Box>
    </Box>
  );
};

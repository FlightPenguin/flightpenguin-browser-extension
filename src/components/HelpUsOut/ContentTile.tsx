import { Box, Text } from "bumbag";
import React from "react";

interface ContentTileProps {
  title: string;
  body: string;
  icon: string;
}

export const ContentTile = ({ title, body, icon }: ContentTileProps): React.ReactElement => {
  return (
    <Box
      backgroundColor="white"
      className="content-tile"
      display="flex"
      flexDirection="row"
      justifyContent="start"
      maxWidth="290px"
      altitude="100"
      padding="major-1"
    >
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Box display="flex" flexDirection="column" justifyContent="flex-start">
          <Text fontSize="clamp(1rem, 1.5vw, 2rem)" fontWeight="700" textAlign="center">
            {title}
          </Text>
          <Box padding="major-1">{/*  ICON GOES HERE*/}</Box>
        </Box>
        <Box padding="major-1">
          <Text fontSize="clamp(.75rem, 1vw, 1rem)">{body}</Text>
        </Box>
      </Box>
    </Box>
  );
};
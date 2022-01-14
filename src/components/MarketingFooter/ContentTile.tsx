import { Box, Image, Text } from "bumbag";
import React from "react";

interface ContentTileProps {
  title: string;
  body: string;
  image: {
    path: string;
    altText: string;
  };
}

export const ContentTile = ({ title, body, image }: ContentTileProps): React.ReactElement => {
  return (
    <Box className="content-tile" display="flex" flexDirection="row" justifyContent="start">
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Text fontSize="clamp(1rem, 1.5vw, 2rem)" fontWeight="700">
          {title}
        </Text>
        <Text fontSize="clamp(.75rem, 1vw, 1rem)">{body}</Text>
      </Box>
      <Box display="flex">
        <Image src={image.path} alt={image.altText} />
      </Box>
    </Box>
  );
};

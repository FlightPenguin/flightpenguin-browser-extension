import { Text } from "bumbag";
import React from "react";

interface MatchedLabelProps {
  label: string;
  searchText: string;
  fontSize?: string;
}

export const MatchedLabel = ({ label, searchText, fontSize = "200" }: MatchedLabelProps): React.ReactElement => {
  const escapeStringRegexp = (string: string) => string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
  const match = label.match(new RegExp(escapeStringRegexp(searchText), "i")) || [];

  const preText = label.slice(0, match.index);
  const highlightedText = match[0];

  const postText = label.slice(match?.index !== undefined ? match.index + (match[0] || "").length : 0);

  return highlightedText ? (
    <Text>
      {preText && (
        <Text fontWeight="normal" fontSize={fontSize}>
          {preText}
        </Text>
      )}
      {highlightedText && (
        <Text fontWeight="semibold" fontSize={fontSize}>
          {highlightedText}
        </Text>
      )}
      {postText && (
        <Text fontWeight="normal" fontSize={fontSize}>
          {postText}
        </Text>
      )}
    </Text>
  ) : (
    <Text fontWeight="normal" fontSize={fontSize}>
      {label}
    </Text>
  );
};

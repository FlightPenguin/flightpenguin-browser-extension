import { Box, Button, Icon, Input, Text } from "bumbag";
import isEqual from "lodash.isequal";
import React, { useState } from "react";

import { CabinMap } from "../../background/constants";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { containerWidth, sidePaddingWidth } from "../constants";
import { Cabin } from "../icons";
import { getStandardizedFormatDate } from "../utilities/forms/getStandardizedFormatDate";

interface SearchFormDisplayProps {
  formData: FlightSearchFormData;
  onUpdateClick: () => void;
}

const SearchFormDisplay = ({ formData, onUpdateClick }: SearchFormDisplayProps): React.ReactElement => {
  const [disabled, setDisabled] = useState(false);

  return (
    <Box className="form-data-container" alignX="center">
      <Box use="section" width={`${containerWidth + sidePaddingWidth * 2}px`}>
        <Box display="flex" flex="row" flexWrap="nowrap" justifyContent="space-between" altitude="400">
          <Box display="flex" boxSizing="border-box" whiteSpace="nowrap" alignX="center" padding="major-1">
            <Box>
              <Input.Icon
                icon="solid-plane-departure"
                aria-label="Departure information"
                fontSize="300"
                color="black"
                alignX="left"
              />
            </Box>
            <Box display="flex" flexDirection="column" width="100px" paddingLeft="10px" whiteSpace="normal">
              <Text whiteSpace="normal" width="100px">
                <Icon aria-label="Departure airport" icon="solid-map-marker-alt" marginRight="major-1" />
                {formData.from}
              </Text>
              <Text fontSize="100" fontWeight="200" whiteSpace="normal" maxWidth="100px">
                <Icon aria-label="Departure date" icon="regular-calendar" marginRight="major-1" />
                {getStandardizedFormatDate(formData.fromDate)}
              </Text>
            </Box>
          </Box>

          {formData.roundtrip && (
            <Box display="flex" boxSizing="border-box" whiteSpace="nowrap" alignX="center" padding="major-1">
              <Box>
                <Input.Icon
                  icon="solid-plane-arrival"
                  aria-label="Destination and return information"
                  fontSize="300"
                  color="black"
                  alignX="left"
                />
              </Box>
              <Box display="flex" flexDirection="column" width="100px" paddingLeft="10px" whiteSpace="normal">
                <Text whiteSpace="normal" width="100px">
                  <Icon aria-label="Destination airport" icon="solid-map-marker-alt" marginRight="major-1" />
                  {formData.to}
                </Text>
                <Text fontSize="100" fontWeight="200" whiteSpace="normal" maxWidth="100px">
                  <Icon aria-label="Return date" icon="regular-calendar" marginRight="major-1" />
                  {getStandardizedFormatDate(formData.toDate)}
                </Text>
              </Box>
            </Box>
          )}

          <Box display="flex" boxSizing="border-box" whiteSpace="nowrap" alignX="center" padding="major-1">
            <Box display="flex" flexDirection="column" width="100px" paddingLeft="10px" whiteSpace="normal">
              <Text whiteSpace="normal" width="100px">
                <Icon aria-label="Number of passengers" icon="solid-user" marginRight="major-1" />
                {formData.numPax}
              </Text>
            </Box>
          </Box>

          <Box display="flex" boxSizing="border-box" whiteSpace="nowrap" alignX="center" padding="major-1">
            <Box display="flex" flexDirection="column" width="100px" paddingLeft="10px" whiteSpace="normal">
              <Text whiteSpace="normal" width="100px">
                <Cabin aria-label="Cabin / class" marginRight="major-1" fontSize="300" />
                {CabinMap[formData.cabin || "econ"]}
              </Text>
            </Box>
          </Box>

          <Box display="flex" boxSizing="border-box" whiteSpace="nowrap" alignX="center" padding="major-1">
            <Box display="flex" flexDirection="column" width="100px" paddingLeft="10px" whiteSpace="normal">
              <Text whiteSpace="normal" width="100px">
                <Icon aria-label="Search by" icon="solid-search" marginRight="major-1" />
                {formData.searchByPoints ? "Points" : "Price"}
              </Text>
            </Box>
          </Box>

          <Box
            display="flex"
            boxSizing="border-box"
            whiteSpace="nowrap"
            alignX="center"
            padding="major-1"
            paddingRight="major-3"
          >
            <Button
              variant="outlined"
              palette="warning"
              iconBefore="solid-pen"
              disabled={disabled}
              onClick={() => {
                setDisabled(true);
                onUpdateClick();
              }}
            >
              Update search
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(SearchFormDisplay, (previous, next) => {
  return isEqual(previous, next);
});

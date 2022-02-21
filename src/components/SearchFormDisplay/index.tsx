import { Box, Button, Hide, Icon } from "bumbag";
import isEqual from "lodash.isequal";
import React, { useState } from "react";

import { CabinMap } from "../../background/constants";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { Cabin } from "../icons";
import { getPrettyRewardsCardName } from "../utilities/forms/getPrettyRewardsCardName";
import { GenericCell } from "./GenericCell";
import { TimeCell } from "./TimeCell";

interface SearchFormDisplayProps {
  containerWidth: number;
  formData: FlightSearchFormData;
  onUpdateClick: () => void;
}

const SearchFormDisplay = ({ containerWidth, formData, onUpdateClick }: SearchFormDisplayProps): React.ReactElement => {
  const [disabled, setDisabled] = useState(false);

  return (
    <Box className="form-data-container" alignX="center" boxSizing="border-box" paddingTop="major-6">
      <Box use="section" width="100%" minWidth="360px">
        <Box display="flex" flex="row" flexWrap="wrap" justifyContent="space-between" altitude="400">
          <TimeCell flightType="DEPARTURE" airport={formData.from.value.toUpperCase()} date={formData.fromDate} />
          <TimeCell
            flightType="RETURN"
            airport={formData.to.value.toUpperCase()}
            date={formData.roundtrip ? formData.toDate : undefined}
          />
          <GenericCell
            icon={<Icon aria-label="Number of passengers" icon="solid-user" marginRight="major-1" />}
            displayText={`${formData.numPax}`}
          />
          <GenericCell
            icon={<Cabin aria-label="Cabin / class" marginRight="major-1" fontSize="300" />}
            displayText={CabinMap[`${formData.cabin}`]}
          />
          {/*<GenericCell*/}
          {/*  icon={<Icon aria-label="Search by" icon="solid-search" marginRight="major-1" />}*/}
          {/*  displayText={*/}
          {/*    formData.searchByPoints && formData.pointsType*/}
          {/*      ? `${getPrettyRewardsCardName(formData.pointsType)} points`*/}
          {/*      : "Price"*/}
          {/*  }*/}
          {/*/>*/}

          <Box
            display="flex"
            boxSizing="border-box"
            whiteSpace="nowrap"
            alignX="center"
            padding="major-1"
            paddingRight="major-3"
            flexBasis={{ default: "12%", "max-desktop": "30%", "max-tablet": "45%", mobile: "100%" }}
            justifyContent="center"
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
  return isEqual(getValuesForMemoCheck(previous), getValuesForMemoCheck(next));
});

const getValuesForMemoCheck = ({ formData, containerWidth }: SearchFormDisplayProps) => {
  return {
    formData,
    containerWidth,
  };
};

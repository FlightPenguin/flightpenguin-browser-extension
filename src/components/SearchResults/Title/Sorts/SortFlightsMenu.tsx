import { DropdownMenu, Group, Tag } from "bumbag";
import React, { useState } from "react";

import { FlightSortDimension, FlightSortDimensionDisplayMap } from "../../../constants";

interface SortFlightsMenuProps {
  loading: boolean;
  flightCount: number;
  filteredFlightCount: number;
  onChange: (dimension: FlightSortDimension) => void;
}

export const SortFlightsMenu = ({
  loading,
  flightCount,
  filteredFlightCount,
  onChange,
}: SortFlightsMenuProps): React.ReactElement => {
  const [selectedSortDimension, setSelectedSortDimension] = useState<FlightSortDimension>("pain");
  const flightCountText = getFlightCountText(loading, flightCount, filteredFlightCount);

  return (
    <DropdownMenu
      cursor="pointer"
      fontSize="clamp(.5rem, .6vw, .75rem)"
      menu={
        <React.Fragment>
          <DropdownMenu.OptionGroup
            title="Sort by"
            type="radio"
            value={selectedSortDimension}
            onChange={(values: string | string[], value: string) => {
              setSelectedSortDimension(value as FlightSortDimension);
              onChange(value as FlightSortDimension);
            }}
          >
            <DropdownMenu.OptionItem value="pain">Pain</DropdownMenu.OptionItem>
            <DropdownMenu.OptionItem value="fare">Price</DropdownMenu.OptionItem>
            <DropdownMenu.OptionItem value="duration">Duration</DropdownMenu.OptionItem>
            <DropdownMenu.OptionItem value="dta">Earliest takeoff</DropdownMenu.OptionItem>
            <DropdownMenu.OptionItem value="dtd">Latest takeoff</DropdownMenu.OptionItem>
            <DropdownMenu.OptionItem value="ata">Earliest landing</DropdownMenu.OptionItem>
            <DropdownMenu.OptionItem value="atd">Latest landing</DropdownMenu.OptionItem>
          </DropdownMenu.OptionGroup>
        </React.Fragment>
      }
      paddingTop="minor-1"
      zIndex={5}
    >
      <Group>
        <Tag variant="outlined" fontSize="clamp(.5rem, .6vw, .75rem)">
          {flightCountText}
        </Tag>
        <Tag palette={selectedSortDimension !== "pain" ? "primary" : "text"} fontSize="clamp(.5rem, .6vw, .75rem)">
          Sort
        </Tag>
      </Group>
    </DropdownMenu>
  );
};

const getFlightCountText = (loading: boolean, flightCount: number, filteredFlightCount: number): string => {
  if (flightCount < 1) {
    return loading ? "Searching for flights..." : "";
  } else {
    if (filteredFlightCount !== flightCount) {
      return `Showing ${filteredFlightCount} of ${flightCount}${loading ? "+" : ""} flights`;
    } else {
      return `${flightCount}${loading ? "+" : ""} flights`;
    }
  }
};

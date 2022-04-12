import { DropdownMenu, Group, Tag } from "bumbag";
import React, { useState } from "react";

import { TripSortDimension } from "../../../constants";

interface SortTripsMenuProps {
  loading: boolean;
  tripCount: number;
  filteredTripCount: number;
  onChange: (dimension: TripSortDimension) => void;
}

export const SortTripsMenu = ({
  loading,
  tripCount,
  filteredTripCount,
  onChange,
}: SortTripsMenuProps): React.ReactElement => {
  const [selectedSortDimension, setSelectedSortDimension] = useState<TripSortDimension>("pain");
  const tripCountText = getTripCountText(loading, tripCount, filteredTripCount);

  return (
    <DropdownMenu
      aria-label="Drop down menu for sorting results"
      cursor="pointer"
      fontSize="clamp(.5rem, .6vw, .75rem)"
      menu={
        <React.Fragment>
          <DropdownMenu.OptionGroup
            title="Sort by"
            type="radio"
            value={selectedSortDimension}
            onChange={(values: string | string[], value: string) => {
              setSelectedSortDimension(value as TripSortDimension);
              onChange(value as TripSortDimension);
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
          {tripCountText}
        </Tag>
        <Tag palette={selectedSortDimension !== "pain" ? "primary" : "text"} fontSize="clamp(.5rem, .6vw, .75rem)">
          Sort
        </Tag>
      </Group>
    </DropdownMenu>
  );
};

const getTripCountText = (loading: boolean, tripCount: number, filteredTripCount: number): string => {
  if (tripCount < 1) {
    return loading ? "Searching for trips..." : "";
  } else {
    if (filteredTripCount !== tripCount) {
      return `Showing ${filteredTripCount} of ${tripCount}${loading ? "+" : ""} trips`;
    } else {
      return `${tripCount}${loading ? "+" : ""} trips`;
    }
  }
};

import { DropdownMenu, Group, Tag } from "bumbag";
import capitalize from "lodash.capitalize";
import * as numberToWords from "number-to-words";
import React from "react";

interface FilterMenuProps {
  layoverCounts: number[];
}

export const LayoverCountFilterMenu = ({ layoverCounts }: FilterMenuProps): React.ReactElement => {
  return (
    <DropdownMenu
      cursor="pointer"
      fontSize="clamp(.5rem, .6vw, .75rem)"
      menu={
        <React.Fragment>
          <DropdownMenu.OptionGroup title="Stops" type="checkbox" defaultValue={layoverCounts.map(String)}>
            {layoverCounts.map((value) => {
              const textValue = value === 0 ? "No" : capitalize(numberToWords.toWords(value));
              return <DropdownMenu.OptionItem value={value.toString()}>{textValue} stops</DropdownMenu.OptionItem>;
            })}
          </DropdownMenu.OptionGroup>
        </React.Fragment>
      }
      tabIndex={0}
      zIndex={2}
    >
      <Group>
        <Tag variant="outlined" fontSize="clamp(.5rem, .6vw, .75rem)">
          {Math.min(...layoverCounts)} - {Math.max(...layoverCounts)} layovers
        </Tag>
        <Tag palette="text" fontSize="clamp(.5rem, .6vw, .75rem)">
          Filter
        </Tag>
      </Group>
    </DropdownMenu>
  );
};

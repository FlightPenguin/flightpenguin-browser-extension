import { DropdownMenu, Group, Tag } from "bumbag";
import React from "react";

interface FilterMenuProps {
  airlines: string[];
}

export const AirlineFilterMenu = ({ airlines }: FilterMenuProps): React.ReactElement => {
  return (
    <DropdownMenu
      cursor="pointer"
      fontSize="clamp(.375rem, .6vw, .75rem)"
      menu={
        <React.Fragment>
          <DropdownMenu.OptionGroup title="Airlines" type="checkbox" defaultValue={airlines}>
            {airlines.map((value) => {
              return <DropdownMenu.OptionItem value={value}>{value}</DropdownMenu.OptionItem>;
            })}
          </DropdownMenu.OptionGroup>
        </React.Fragment>
      }
      tabIndex={0}
      zIndex={2}
    >
      <Group>
        <Tag variant="outlined" fontSize="clamp(.5rem, .6vw, .75rem)">
          {airlines.length} airlines
        </Tag>
        <Tag palette="text" fontSize="clamp(.5rem, .6vw, .75rem)">
          Filter
        </Tag>
      </Group>
    </DropdownMenu>
  );
};

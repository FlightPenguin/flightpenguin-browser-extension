import { Box, DropdownMenu, Group, Tag } from "bumbag";
import isEqual from "lodash.isequal";
import pluralize from "pluralize";
import React, { useEffect, useState } from "react";

interface FilterMenuProps {
  airlines: string[];
  onChange: (values: string[]) => void;
}

export const AirlineFilterMenu = ({ airlines, onChange }: FilterMenuProps): React.ReactElement => {
  const [valueChanged, setValueChanged] = useState(false);
  const [values, setValues] = useState([] as string[]);

  const airlineText = getAirlinesText(values, airlines);

  useEffect(() => {
    if (!valueChanged) {
      setValues(airlines);
    }
  }, [airlines, valueChanged, setValues]);

  return (
    <DropdownMenu
      cursor="pointer"
      fontSize="clamp(.375rem, .6vw, .75rem)"
      menu={
        <React.Fragment>
          <DropdownMenu.OptionGroup
            title="Airlines"
            type="checkbox"
            value={values}
            onChange={(values) => {
              const cleanValues = (typeof values === "string" ? [values] : values).sort();

              setValueChanged(!isEqual(cleanValues, airlines));
              setValues(cleanValues);
              onChange(cleanValues);
            }}
          >
            {airlines.map((value) => {
              return (
                <DropdownMenu.OptionItem value={value} key={`option-${value}`}>
                  <Box display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="space-between" width="100%">
                    <Box display="flex">{value}</Box>
                    <Box
                      color="gray"
                      display="flex"
                      paddingLeft="minor-1"
                      paddingRight="minor-1"
                      textDecoration="underline"
                      data-value={value}
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        event.stopPropagation();

                        const value = (event.target as HTMLDivElement).dataset.value as string;
                        setValueChanged(true);
                        setValues([value]);
                        onChange([value]);
                      }}
                    >
                      Only
                    </Box>
                  </Box>
                </DropdownMenu.OptionItem>
              );
            })}
          </DropdownMenu.OptionGroup>
        </React.Fragment>
      }
      paddingTop="minor-1"
      zIndex={3}
    >
      <Group>
        <Tag variant="outlined" fontSize="clamp(.5rem, .6vw, .75rem)">
          {airlineText}
        </Tag>
        <Tag palette={valueChanged ? "primary" : "text"} fontSize="clamp(.5rem, .6vw, .75rem)">
          Filter{values.length === 0 && " disabled"}
        </Tag>
      </Group>
    </DropdownMenu>
  );
};

const getAirlinesText = (selectedValues: string[], defaultValues: string[]): string => {
  if (selectedValues.length === 0) {
    return "Airlines";
  } else if (isEqual(selectedValues, defaultValues)) {
    return `${selectedValues.length} ${pluralize("airline", selectedValues.length)}`;
  } else {
    return `${selectedValues.length} of ${defaultValues.length} ${pluralize("airline", selectedValues.length)}`;
  }
};

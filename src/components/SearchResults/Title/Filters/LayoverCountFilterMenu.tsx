import { DropdownMenu, Group, Tag, Text } from "bumbag";
import capitalize from "lodash.capitalize";
import isEqual from "lodash.isequal";
import * as numberToWords from "number-to-words";
import pluralize from "pluralize";
import React, { useEffect, useState } from "react";

interface FilterMenuProps {
  layoverCounts: number[];
  onChange: (values: number[]) => void;
}

export const LayoverCountFilterMenu = ({ layoverCounts, onChange }: FilterMenuProps): React.ReactElement => {
  const [valueChanged, setValueChanged] = useState(false);
  const [values, setValues] = useState([] as number[]);

  const layoverText = getLayoverText(values);

  useEffect(() => {
    if (!valueChanged) {
      setValues(layoverCounts);
    }
  }, [layoverCounts, valueChanged, setValues]);

  return (
    <DropdownMenu
      cursor="pointer"
      fontSize="clamp(.5rem, .6vw, .75rem)"
      menu={
        <React.Fragment>
          <DropdownMenu.OptionGroup
            title="Stops"
            type="checkbox"
            value={values.map(String)}
            onChange={(values: string | string[]) => {
              let numbers;
              if (typeof values === "string") {
                numbers = [Number(values)];
              } else {
                numbers = values
                  .map((value) => {
                    return Number(value);
                  })
                  .sort();
              }

              setValueChanged(!isEqual(numbers, layoverCounts));
              setValues(numbers);
              onChange(numbers);
            }}
          >
            {layoverCounts.map((value) => {
              const textValue = value === 0 ? "No" : capitalize(numberToWords.toWords(value));
              return (
                <DropdownMenu.OptionItem value={value.toString()}>
                  {textValue} {pluralize("stop", value)}
                </DropdownMenu.OptionItem>
              );
            })}
          </DropdownMenu.OptionGroup>
        </React.Fragment>
      }
      paddingTop="minor-1"
      tabIndex={0}
      zIndex={4}
    >
      <Group>
        <Tag variant="outlined" fontSize="clamp(.5rem, .6vw, .75rem)">
          {layoverText}
        </Tag>
        <Tag palette={valueChanged ? "primary" : "text"} fontSize="clamp(.5rem, .6vw, .75rem)">
          Filter{values.length === 0 && " disabled"}
        </Tag>
      </Group>
    </DropdownMenu>
  );
};

const getLayoverText = (values: number[]): string => {
  if (values.length === 0) {
    return "Layovers";
  } else if (values.length === 1) {
    const value = values[0];
    return `${value} ${pluralize("Layover", value)}`;
  } else {
    return `${Math.min(...values)} - ${Math.max(...values)} layovers`;
  }
};

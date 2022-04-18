import { Box, DropdownMenu, Group, Tag } from "bumbag";
import isEqual from "lodash.isequal";
import pluralize from "pluralize";
import React, { useEffect, useState } from "react";

import { NO_ALLIANCE } from "../../../../background/constants";

interface FilterMenuProps {
  airlineCount: number;
  groupedAirlines: { [keyof: string]: string[] };
  onChange: (values: string[]) => void;
}

export const AirlineFilterMenu = ({ airlineCount, groupedAirlines, onChange }: FilterMenuProps): React.ReactElement => {
  const [valueChanged, setValueChanged] = useState(false);
  const [values, setValues] = useState(Object.values(groupedAirlines).flat() as string[]);

  // we want to ensure if an alliance is selected that all subsequent airlines for that alliance are selected.
  const [selectedAlliances, setSelectedAlliances] = useState<string[]>([]);

  const defaultAirlines = Array.from(new Set(Object.values(groupedAirlines).flat()));
  const airlineText = getAirlinesText(values, airlineCount);

  useEffect(() => {
    if (!valueChanged) {
      setValues(defaultAirlines);
    }
  }, [groupedAirlines, valueChanged, setValues]);

  useEffect(() => {
    if (selectedAlliances.length) {
      const allianceAirlines = selectedAlliances.map((alliance) => {
        // eslint-disable-next-line security/detect-object-injection
        return groupedAirlines[alliance];
      });
      setValues(Array.from(new Set([...values, ...allianceAirlines.flat()])));
      onChange(values);
    }
  }, [groupedAirlines, valueChanged, setValues]);

  return (
    <DropdownMenu
      aria-label="Drop down menu for filtering results by airlines"
      cursor="pointer"
      fontSize="clamp(.375rem, .6vw, .75rem)"
      menu={
        <React.Fragment>
          {Object.keys(groupedAirlines)
            .sort()
            .map((alliance) => {
              // eslint-disable-next-line security/detect-object-injection
              const airlines = groupedAirlines[alliance];
              // leading z is a hack to force this to end of the sort
              const allianceName = alliance.replace(/^Z/, "");
              return (
                <DropdownMenu.OptionGroup
                  key={`${allianceName}-option-group`}
                  // TODO: Update bumbag to allow optiongroup title to be an element...
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  title={
                    alliance === NO_ALLIANCE ? (
                      allianceName
                    ) : (
                      <Box
                        display="flex"
                        flexDirection="row"
                        flexWrap="nowrap"
                        justifyContent="space-between"
                        width="100%"
                      >
                        <Box
                          display="flex"
                          onClick={(event: React.MouseEvent) => {
                            event.preventDefault();
                            event.stopPropagation();

                            const selectedAirlines = Array.from(new Set([...values, ...airlines]));

                            setSelectedAlliances(Array.from(new Set([...selectedAlliances, allianceName])));
                            setValueChanged(true);
                            setValues(selectedAirlines);
                            onChange(selectedAirlines);
                          }}
                        >
                          {allianceName}
                          {selectedAlliances.includes(allianceName) && "*"}
                        </Box>
                        <Box
                          color="gray"
                          display="flex"
                          paddingLeft="minor-1"
                          paddingRight="minor-1"
                          textDecoration="underline"
                          textTransform="capitalize"
                          onClick={(event: React.MouseEvent) => {
                            event.preventDefault();
                            event.stopPropagation();

                            setSelectedAlliances([allianceName]);
                            setValueChanged(true);
                            setValues(airlines);
                            onChange(airlines);
                          }}
                        >
                          Only
                        </Box>
                      </Box>
                    )
                  }
                  type="checkbox"
                  value={values}
                  onChange={(values) => {
                    const cleanValues = (typeof values === "string" ? [values] : values).sort();

                    setValueChanged(cleanValues.length !== airlineCount);
                    setValues(cleanValues);
                    onChange(cleanValues);
                  }}
                >
                  {airlines.map((value) => {
                    return (
                      <DropdownMenu.OptionItem value={value} key={`option-item-${value}`}>
                        <Box
                          display="flex"
                          flexDirection="row"
                          flexWrap="nowrap"
                          justifyContent="space-between"
                          width="100%"
                        >
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
                              setSelectedAlliances([]);
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
              );
            })}
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

const getAirlinesText = (selectedValues: string[], airlineCount: number): string => {
  if (selectedValues.length === 0) {
    return "Airlines";
  } else if (isEqual(selectedValues.length, airlineCount)) {
    return `${selectedValues.length} ${pluralize("airline", selectedValues.length)}`;
  } else {
    return `${selectedValues.length} of ${airlineCount} ${pluralize("airline", selectedValues.length)}`;
  }
};

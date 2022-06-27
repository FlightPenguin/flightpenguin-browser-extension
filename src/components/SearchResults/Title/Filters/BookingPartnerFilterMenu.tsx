import { Box, Divider, DropdownMenu, Group, Tag } from "bumbag";
import isEqual from "lodash.isequal";
import pluralize from "pluralize";
import React, { useEffect, useState } from "react";

import { BookingPartnerLookup } from "../../../../shared/nameMaps/bookingSiteMap";

interface FilterMenuProps {
  bookingPartners: BookingPartnerLookup[];
  onChange: (values: string[]) => void;
}

export const BookingPartnerFilterMenu = ({ bookingPartners, onChange }: FilterMenuProps): React.ReactElement => {
  const defaultValues = getDefaultValues(bookingPartners);
  const [showFirstPartyButton, setShowFirstPartyButton] = useState(
    bookingPartners.some((lookup) => !lookup.isFirstParty),
  );

  const [valueChanged, setValueChanged] = useState(false);
  const [values, setValues] = useState([] as string[]);

  const layoverText = getLabelText(values);

  useEffect(() => {
    if (!valueChanged) {
      setValues(defaultValues);
    }
  }, [bookingPartners, valueChanged, setValues]);

  useEffect(() => {
    if (values && values.length) {
      setShowFirstPartyButton(
        values.some((siteName) => {
          const lookup = bookingPartners.filter((partner) => {
            return partner.name === siteName;
          })[0];
          return (lookup && !lookup.isFirstParty) || false;
        }),
      );
    } else {
      setShowFirstPartyButton(bookingPartners.some((lookup) => !lookup.isFirstParty));
    }
  }, [bookingPartners, values]);

  return (
    <DropdownMenu
      cursor="pointer"
      fontSize="clamp(.5rem, .6vw, .75rem)"
      menu={
        <React.Fragment>
          {valueChanged && (
            <React.Fragment>
              <DropdownMenu.Item
                color="danger"
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault();
                  event.stopPropagation();

                  setValueChanged(false);
                  setValues(defaultValues);
                  onChange(defaultValues);
                }}
                textAlign="center"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                textTranform="uppercase"
              >
                Reset sites
              </DropdownMenu.Item>
              <Divider />
            </React.Fragment>
          )}
          {showFirstPartyButton && (
            <React.Fragment>
              <DropdownMenu.Item
                color="text"
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault();
                  event.stopPropagation();

                  const firstPartyOnly = values.filter((siteName) => {
                    const value = bookingPartners.filter((lookupValue) => lookupValue.name === siteName)[0];
                    return (value && value.isFirstParty) || false;
                  });

                  setValueChanged(true);
                  setValues(firstPartyOnly);
                  onChange(firstPartyOnly);
                }}
                textAlign="center"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                textTranform="uppercase"
              >
                Airlines only
              </DropdownMenu.Item>
              <Divider />
            </React.Fragment>
          )}
          <DropdownMenu.OptionGroup
            aria-label="Drop down menu for filtering results by booking site"
            title="Booking sites"
            type="checkbox"
            value={values.map(String)}
            key="booking-sites-option-group"
            onChange={(values: string | string[]) => {
              const cleanValues = Array.isArray(values) ? values : [values];

              setValueChanged(!isEqual(cleanValues.length, bookingPartners.length));
              setValues(cleanValues);
              onChange(cleanValues);
            }}
          >
            {bookingPartners.map((value) => {
              return (
                <DropdownMenu.OptionItem value={value.name} key={`${value.name}-option-item`}>
                  <Box display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="space-between" width="100%">
                    <Box display="flex">{value.name}</Box>
                    <Box
                      color="gray"
                      display="flex"
                      paddingLeft="minor-1"
                      paddingRight="minor-1"
                      textDecoration="underline"
                      data-value={value.name}
                      onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        event.stopPropagation();

                        const value = (event.target as HTMLDivElement).dataset.value;
                        if (value) {
                          setValueChanged(true);
                          setValues([value]);
                          onChange([value]);
                        }
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

const getLabelText = (values: string[]): string => {
  return values.length ? `${values.length} booking ${pluralize("site", values.length)}` : "Booking sites";
};

const getDefaultValues = (bookingSites: BookingPartnerLookup[]): string[] => {
  return bookingSites.map((lookup) => {
    return lookup.name;
  });
};

import { Box, Button, Card, FieldStack, FieldWrapper, Input, RadioGroup, Select, Switch, Text } from "bumbag";
import { SelectMenu } from "bumbag/src/SelectMenu";
import { addDays, endOfDay, max, nextSunday, startOfDay } from "date-fns";
import { Field as FormikField, Form, Formik } from "formik";
import Fuse from "fuse.js";
import React, { ElementRef, useCallback, useEffect, useRef, useState } from "react";
import { boolean, mixed, number, object, string } from "yup";

import airports from "../../assets/airports.json";
import { CabinMap } from "../../background/constants";
import { FlightSearchFormData } from "../../shared/types/FlightSearchFormData";
import { setRecentlyInstalled } from "../../shared/utilities/recentlyInstalledManager";
import { CardType, PointsMap, searchFormWidth } from "../constants";
import { getFieldState, getParsedDate, getValidationText } from "../utilities/forms";
import { disableNonAlphaInput } from "../utilities/forms/disableNonAlphaInput";
import { getBooleanFromString } from "../utilities/forms/getBooleanFromString";
import { getChromeFormattedDateFromDate } from "../utilities/forms/getChromeFormattedDateFromDate";
import { getChromeFormattedDateFromString } from "../utilities/forms/getChromeFormattedDateFromString";
import { getFormattedDate } from "../utilities/forms/getFormattedDate";
import { getPrettyRewardsCardName } from "../utilities/forms/getPrettyRewardsCardName";
import { getStandardizedFormatDate } from "../utilities/forms/getStandardizedFormatDate";
import { isValidDateInputString } from "../utilities/forms/isValidDateInputString";
import { getNearestRelevantAirport } from "../utilities/geography/getNearestRelevantAirport";
import { Airport } from "./api/airports/Airport";
// import { getAirportData } from "./api/airports/getAirportData";
import { MatchedLabel } from "./components/SelectMenu/MatchedLabel";
import { getFridayAfterNext } from "./utilities/getFridayAfterNext";
import { sendFormDataToBackground } from "./utilities/sendFormDataToBackground";

const cabinHelpText = "You must select a cabin type.";

const today = startOfDay(new Date());
const maxDate = addDays(endOfDay(new Date()), 345);
const fridayAfterNext = getFridayAfterNext();

const SearchFormSchema = object({
  from: object({
    value: string(),
    label: string(),
  }).test("value defined", "What airport do you want to leave from?", (value, ctx) => {
    return !!value?.value;
  }),
  to: object({
    value: string(),
    label: string(),
  })
    .test("value defined", "What airport do you want to arrive at?", (value, ctx) => {
      return !!value?.value;
    })
    .test(
      "not same source and destination",
      "Your source and destination airports cannot be the same.",
      (value, ctx) => {
        return value.value !== ctx.parent.from.value;
      },
    ),
  fromDate: string()
    .required("What day do you want to leave on?")
    .test("future start date", "Your flight cannot start in the past.", (value) => {
      const fromDate = getParsedDate(value as string);
      return fromDate >= today;
    })
    .test("not too future start date", "We cannot look up flights this far in the future.", (value) => {
      const fromDate = getParsedDate(value as string);
      return fromDate <= maxDate;
    }),
  toDate: string().when("roundtrip", {
    is: true,
    then: string()
      .required("What day do you want to leave on?")
      .test("future end date", "Your return flight cannot start before your departure flight.", (value, ctx) => {
        const toDate = getParsedDate(value as string);
        const fromDate = getParsedDate(ctx.parent.fromDate);
        return toDate >= fromDate;
      })
      .test("not too future start date", "We cannot look up flights this far in the future.", (value) => {
        const toDate = getParsedDate(value as string);
        return toDate <= maxDate;
      }),
    otherwise: string().nullable(),
  }),
  numPax: number()
    .required("How many people will be travelling on this flight?")
    .min(1, "You must always have at least one passenger.")
    .max(99, "We will not search for more than ninety nine passengers.")
    .typeError("How many people will be travelling on this flight?"),
  roundtrip: boolean().required("Is this a round trip or a one way trip?"),
  cabin: mixed().oneOf(["econ", "prem_econ", "business", "first"], cabinHelpText).required(cabinHelpText),
  searchByPoints: string()
    .oneOf(["true", "false"], "You must choose to pay for this trip with money or points.")
    .required("Do you want to pay for this trip with money or points?"),
  pointsType: string().when("searchByPoints", {
    is: "true",
    then: string()
      .oneOf(Object.keys(PointsMap), "You must choose a valid and known points type.")
      .required("You must choose what type of points you would like to pay with."),
    otherwise: string().nullable(true),
  }),
}).required();

type FormState = ReturnType<typeof SearchFormSchema.validateSync>;
const defaultInitialValues: FormState = {
  from: {
    value: "",
    label: "",
  },
  to: {
    value: "",
    label: "",
  },
  fromDate: getFormattedDate(fridayAfterNext),
  toDate: getFormattedDate(nextSunday(fridayAfterNext)),
  numPax: 1,
  roundtrip: true,
  cabin: "econ",
  searchByPoints: "false",
  pointsType: Object.keys(PointsMap)[0],
};

interface SearchFormProps {
  onSubmit: (values: FlightSearchFormData) => void;
  initialValues?: FormState;
}

export const SearchForm = ({ onSubmit, initialValues = defaultInitialValues }: SearchFormProps): React.ReactElement => {
  const nearestAirport = getNearestRelevantAirport();
  initialValues.from = nearestAirport;

  const fromAirportRef = useRef<HTMLDivElement>(null);
  const toAirportRef = useRef<HTMLDivElement>(null);
  const cabinRef = useRef<HTMLDivElement>(null);

  const [fromValue, setFromValue] = useState<Airport>(nearestAirport);
  const [toValue, setToValue] = useState<Airport | null>({
    value: "",
    label: "",
    location: "",
    key: "",
    name: "",
  });
  const [toDateBounds, setToDateBounds] = useState({
    minimum: getChromeFormattedDateFromDate(fridayAfterNext),
    maximum: getChromeFormattedDateFromDate(maxDate),
  });
  const [airportSearchText, setAirportSearchText] = useState("");
  const airportOptions = airports.map((record: any) => {
    return {
      key: record.iataCode,
      label: record.iataCode,
      name: record.displayName,
      location: record.displayLocation,
      value: record.iataCode,
    };
  }) as Airport[];
  const searchAirports = useCallback(
    async ({ searchText }) => {
      setAirportSearchText(searchText);
      const fuse = new Fuse(airportOptions, {
        keys: ["label", "name", "location"],
      });
      const results = fuse
        .search(searchText)
        .map((result) => result.item)
        .slice(0, 15);
      return { options: results };
    },
    [setAirportSearchText],
  );

  return (
    <Box className="search-form-wrapper" alignX="center">
      <Card maxWidth={`${searchFormWidth}px`}>
        <Formik
          initialValues={initialValues}
          validateOnBlur={true}
          validateOnChange={false}
          validationSchema={SearchFormSchema}
          onSubmit={(values: FormState) => {
            const pointsType = values.pointsType ? (values.pointsType as CardType) : undefined;

            const cleanValues = {
              ...values,
              from: values.from.value?.toUpperCase() || "",
              fromDate: getChromeFormattedDateFromString(values.fromDate),
              to: values.to.value?.toUpperCase() || "",
              toDate: values.toDate ? getChromeFormattedDateFromString(values.toDate) : "",
              searchByPoints: getBooleanFromString(values.searchByPoints),
              pointsType: pointsType,
            };

            sendFormDataToBackground(cleanValues);
            onSubmit(cleanValues);

            setRecentlyInstalled(false);
          }}
        >
          {(formik) => {
            return (
              <Form>
                <FieldStack orientation="horizontal" className="airport-stack" paddingTop="major-3">
                  <FieldWrapper
                    cursor="default"
                    state={getFieldState(formik, "from")}
                    validationText={getValidationText(formik, "from")}
                  >
                    <FormikField
                      after={<Input.Icon icon="solid-plane-departure" fontSize="300" color="black" />}
                      buttonProps={{ elementRef: fromAirportRef }}
                      cacheKey="fromAirport"
                      component={SelectMenu.Formik}
                      containLabel
                      debounceInterval={300}
                      defer
                      disableClear
                      disabled={formik.isSubmitting}
                      emptyText={airportSearchText.length ? "No results found." : "Type to start searching."}
                      hasFieldWrapper={true}
                      hasSearch
                      label={
                        <Box
                          onClick={() => {
                            const elementRef = fromAirportRef.current;
                            if (elementRef) {
                              elementRef.click();
                            }
                          }}
                        >
                          Starting airport
                        </Box>
                      }
                      loadOptions={searchAirports}
                      name="from"
                      onBlur={(event: React.ChangeEvent) => {
                        if (Object.keys(event).length) {
                          formik.handleBlur(event);
                        } else {
                          // bumbag generates stupid blur events during setup...
                          formik.setFieldTouched("from", false);
                        }
                      }}
                      onChange={(selection: Airport) => {
                        setFromValue(selection);
                        formik.setFieldValue("from", selection);
                      }}
                      onKeyPress={(event: KeyboardEvent) => {
                        disableNonAlphaInput(event, true);
                      }}
                      renderOption={({ option: airport }: { option: Airport }) => (
                        <React.Fragment>
                          <MatchedLabel label={airport.name} searchText={airportSearchText} />
                          <br />
                          <MatchedLabel label={airport.location} searchText={airportSearchText} fontSize="100" />
                        </React.Fragment>
                      )}
                      searchInputProps={{ placeholder: "Where are you leaving from?", autoFocus: true }}
                      value={fromValue}
                    />
                  </FieldWrapper>
                  <FieldWrapper
                    state={getFieldState(formik, "to")}
                    validationText={getValidationText(formik, "to")}
                    cursor="default"
                  >
                    <FormikField
                      after={<Input.Icon icon="solid-plane-arrival" fontSize="300" color="black" />}
                      buttonProps={{ elementRef: toAirportRef }}
                      cacheKey="toAirport"
                      component={SelectMenu.Formik}
                      containLabel
                      debounceInterval={300}
                      defer
                      disableClear
                      disabled={formik.isSubmitting}
                      emptyText={airportSearchText.length ? "No results found." : "Type to start searching."}
                      hasFieldWrapper={true}
                      hasSearch
                      label={
                        <Box
                          onClick={() => {
                            const elementRef = toAirportRef.current;
                            if (elementRef) {
                              elementRef.click();
                            }
                          }}
                        >
                          Destination airport
                        </Box>
                      }
                      loadOptions={searchAirports}
                      name="to"
                      onBlur={(event: React.ChangeEvent) => {
                        if (Object.keys(event).length) {
                          formik.handleBlur(event);
                        } else {
                          // bumbag generates stupid blur events during setup...
                          formik.setFieldTouched("to", false);
                        }
                      }}
                      onChange={(selection: Airport) => {
                        setToValue(selection);
                        formik.setFieldValue("to", selection);
                      }}
                      onKeyPress={(event: KeyboardEvent) => {
                        disableNonAlphaInput(event, true);
                      }}
                      renderOption={({ option: airport }: { option: Airport }) => (
                        <React.Fragment>
                          <MatchedLabel label={airport.name} searchText={airportSearchText} />
                          <br />
                          <MatchedLabel label={airport.location} searchText={airportSearchText} fontSize="100" />
                        </React.Fragment>
                      )}
                      searchInputProps={{ placeholder: "Where are you going to?", autoFocus: true }}
                      value={toValue}
                    />
                  </FieldWrapper>
                </FieldStack>

                <FieldStack orientation="horizontal" className="trip-type-stack" paddingTop="major-3">
                  <FieldWrapper
                    state={getFieldState(formik, "roundtrip")}
                    validationText={getValidationText(formik, "roundtrip")}
                  >
                    <FormikField
                      component={Switch.Formik}
                      name="roundtrip"
                      label="Round trip?"
                      autoComplete="off"
                      hasFieldWrapper={true}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={formik.isSubmitting}
                      containLabel
                    />
                  </FieldWrapper>
                </FieldStack>

                <FieldStack orientation="horizontal" className="date-stack" paddingTop="major-3">
                  <FieldWrapper
                    state={getFieldState(formik, "fromDate")}
                    validationText={getValidationText(formik, "fromDate")}
                  >
                    <FormikField
                      component={Input.Formik}
                      name="fromDate"
                      label="Departure date"
                      type="text"
                      autoComplete="off"
                      hasFieldWrapper={true}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        formik.handleChange(event);
                      }}
                      onBlur={async (event: React.FocusEvent<HTMLInputElement>) => {
                        const target = event.target as HTMLInputElement;
                        target.type = "text";
                        const input = event.currentTarget?.value;

                        const maximumTo = getChromeFormattedDateFromDate(maxDate);
                        let minimumTo: string;
                        let value;
                        if (isValidDateInputString(input)) {
                          value = getStandardizedFormatDate(input);
                          minimumTo = getChromeFormattedDateFromString(input);

                          const departureDate = getParsedDate(input);
                          const arrivalDate = formik.values.toDate
                            ? getParsedDate(formik.values.toDate)
                            : getFormattedDate(nextSunday(fridayAfterNext));

                          if (arrivalDate && departureDate > arrivalDate) {
                            const guessArrivalPreference = getFormattedDate(nextSunday(departureDate));
                            await formik.setFieldValue("toDate", guessArrivalPreference, true);
                            await formik.setFieldError("toDate", "Your arrival date was automatically changed.");
                          }
                        } else {
                          value = initialValues.fromDate;
                          minimumTo = getChromeFormattedDateFromDate(today);
                        }
                        formik.setFieldValue("fromDate", value, true);
                        setToDateBounds({
                          minimum: minimumTo,
                          maximum: maximumTo,
                        });

                        formik.handleBlur(event);
                      }}
                      onFocus={(event: Event) => {
                        const target = event.target as HTMLInputElement;
                        const currentValue = target.value;

                        target.type = "date";
                        if (currentValue) {
                          target.value = getChromeFormattedDateFromString(currentValue);
                        }
                      }}
                      disabled={formik.isSubmitting}
                      min={getChromeFormattedDateFromDate(today)}
                      max={getChromeFormattedDateFromDate(maxDate)}
                      containLabel
                    />
                  </FieldWrapper>
                  {formik.values.roundtrip && (
                    <FieldWrapper
                      state={getFieldState(formik, "toDate")}
                      validationText={getValidationText(formik, "toDate")}
                    >
                      <FormikField
                        component={Input.Formik}
                        name="toDate"
                        label="Return date"
                        type="text"
                        autoComplete="off"
                        hasFieldWrapper={true}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          formik.handleChange(event);
                        }}
                        onBlur={async (event: React.FocusEvent<HTMLInputElement>) => {
                          const target = event.target as HTMLInputElement;
                          target.type = "text";
                          const input = event.currentTarget?.value;

                          let value;
                          if (isValidDateInputString(input)) {
                            value = getStandardizedFormatDate(input);

                            const arrivalDate = getParsedDate(input);
                            const departureDate = formik.values.fromDate
                              ? getParsedDate(formik.values.fromDate)
                              : getFormattedDate(nextSunday(fridayAfterNext));

                            if (departureDate && departureDate > arrivalDate) {
                              const guessDeparturePreference = getFormattedDate(max([addDays(arrivalDate, -2), today]));
                              await formik.setFieldValue("fromDate", guessDeparturePreference, true);
                            }
                          } else {
                            value = initialValues.fromDate;
                          }
                          formik.setFieldValue("toDate", value);
                          formik.handleBlur(event);
                        }}
                        onFocus={(event: Event) => {
                          const target = event.target as HTMLInputElement;
                          const currentValue = target.value;

                          target.type = "date";
                          if (currentValue) {
                            target.value = getChromeFormattedDateFromString(currentValue);
                          }
                        }}
                        disabled={formik.isSubmitting}
                        group="role"
                        min={toDateBounds.minimum}
                        max={toDateBounds.maximum}
                        containLabel
                      />
                    </FieldWrapper>
                  )}
                </FieldStack>

                <FieldStack orientation="horizontal" className="cabin-stack" paddingTop="major-3">
                  <FieldWrapper
                    state={getFieldState(formik, "numPax")}
                    validationText={getValidationText(formik, "numPax")}
                  >
                    <FormikField
                      component={Input.Formik}
                      name="numPax"
                      label="Passengers"
                      type="number"
                      step="1"
                      min="1"
                      max="99"
                      autoComplete="off"
                      hasFieldWrapper={true}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={formik.isSubmitting}
                      after={<Input.Icon icon="solid-user" color="black" top="2px" />}
                      containLabel
                    />
                  </FieldWrapper>
                  <FieldWrapper
                    state={getFieldState(formik, "cabin")}
                    validationText={getValidationText(formik, "cabin")}
                  >
                    <FormikField
                      buttonProps={{ elementRef: cabinRef }}
                      component={Select.Formik}
                      name="cabin"
                      options={[
                        { label: "Economy", value: "econ" },
                        { label: "Premium Economy", value: "prem_econ" },
                        { label: "Business", value: "business" },
                        { label: "First", value: "first" },
                      ]}
                      width="100%"
                      autoComplete="off"
                      hasFieldWrapper={true}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      label={
                        <Box
                          onClick={() => {
                            const elementRef = cabinRef.current;
                            if (elementRef) {
                              elementRef.click();
                            }
                          }}
                        >
                          Cabin
                        </Box>
                      }
                      disabled={formik.isSubmitting}
                      containLabel
                    />
                  </FieldWrapper>
                </FieldStack>

                <FieldStack orientation="horizontal" className="payment-stack" paddingTop="major-3">
                  <FieldWrapper
                    state={getFieldState(formik, "searchByPoints")}
                    validationText={getValidationText(formik, "searchByPoints")}
                    label="Search by  "
                    display="flex"
                    flexDirection="row"
                    marginTop="major-3"
                  >
                    <FormikField
                      component={RadioGroup.Formik}
                      name="searchByPoints"
                      options={[
                        { value: "false", label: "Price" },
                        { value: "true", label: "Points" },
                      ]}
                      orientation="horizontal"
                      autoComplete="off"
                      hasFieldWrapper={true}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      containLabel
                      paddingLeft="major-2"
                      marginTop="-2px"
                      disabled={formik.isSubmitting}
                    />
                  </FieldWrapper>

                  {formik.values.searchByPoints.toLowerCase() === "true" && (
                    <FieldWrapper
                      state={getFieldState(formik, "pointsType")}
                      validationText={getValidationText(formik, "pointsType")}
                    >
                      <FormikField
                        component={Select.Formik}
                        name="pointsType"
                        options={Object.keys(PointsMap).map((key) => {
                          return {
                            label: getPrettyRewardsCardName(key),
                            value: key,
                          };
                        })}
                        width="100%"
                        autoComplete="off"
                        hasFieldWrapper={true}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Rewards card"
                        disabled={formik.isSubmitting}
                        containLabel
                      />
                    </FieldWrapper>
                  )}
                </FieldStack>
                <Card.Footer display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    palette="primary"
                    alignX="center"
                    paddingLeft="major-4"
                    paddingRight="major-4"
                    disabled={formik.isSubmitting}
                    isLoading={formik.isSubmitting}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Search
                  </Button>
                </Card.Footer>
              </Form>
            );
          }}
        </Formik>
      </Card>
    </Box>
  );
};

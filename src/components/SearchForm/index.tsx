import { Box, Button, Card, FieldStack, FieldWrapper, Input, RadioGroup, Select, Switch } from "bumbag";
import { addDays, endOfDay, startOfDay } from "date-fns";
import { Field as FormikField, Form, Formik } from "formik";
import React, { useState } from "react";
import { boolean, mixed, number, object, string } from "yup";

import { WindowConfig } from "../../shared/types/WindowConfig";
import { getFieldState, getParsedDate, getValidationText } from "../utilities/forms";
import { getChromeFormatDate } from "../utilities/forms/getChromeFormatDate";
import { getFormattedDate } from "../utilities/forms/getFormattedDate";
import { getStandardizedFormatDate } from "../utilities/forms/getStandardizedFormatDate";
import { isValidDateInputString } from "../utilities/forms/isValidDateInputString";

const airportCodeHelpText = "Airport codes must be three uppercase letters (e.g. SFO).";
const cabinHelpText = "You must select a cabin type.";

const today = startOfDay(new Date());
const maxDate = addDays(endOfDay(new Date()), 345);

const SearchFormSchema = object({
  from: string()
    .min(3, airportCodeHelpText)
    .max(3, airportCodeHelpText)
    .matches(/[A-Z]{3}/, airportCodeHelpText)
    .required("What airport do you want to leave from?"),
  to: string()
    .min(3, airportCodeHelpText)
    .max(3, airportCodeHelpText)
    .matches(/[A-Z]{3}/, airportCodeHelpText)
    .test(
      "not same source and destination",
      "Your source and destination airports cannot be the same.",
      (value, ctx) => {
        return value !== ctx.parent.from;
      },
    )
    .required("What airport do you want to leave from?"),
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
  toDate: string()
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
  numPax: number()
    .required("How many people will be travelling on this flight?")
    .min(1, "You must always have at least one passenger.")
    .max(99, "We will not search for more than ninety nine passengers.")
    .typeError("How many people will be travelling on this flight?"),
  roundtrip: boolean().required("Is this a round trip or a one way trip?"),
  cabin: mixed().oneOf(["econ", "prem_econ", "business", "first"], cabinHelpText).required(cabinHelpText),
  searchByPoints: boolean().required("Do you want to pay for this trip with money or points?"),
}).required();

type FormState = ReturnType<typeof SearchFormSchema.validateSync>;
const initialValues = {
  from: "",
  to: "",
  fromDate: getFormattedDate(addDays(today, 1)),
  toDate: getFormattedDate(addDays(today, 4)),
  numPax: 1,
  roundtrip: true,
  cabin: "econ",
  searchByPoints: false,
};

export const SearchForm = (): React.ReactElement => {
  const [sent, setSent] = useState(false);

  return (
    <Box className="search-form-wrapper" display={sent ? "none" : "block"}>
      <Card maxWidth="768px">
        <Formik
          initialValues={initialValues}
          validateOnBlur={true}
          validationSchema={SearchFormSchema}
          onSubmit={(values: FormState) => {
            const windowConfig: WindowConfig = {
              height: window.outerHeight,
              width: window.outerWidth,
              left: window.screenX,
              top: window.screenY,
            };
            chrome.runtime.sendMessage({
              event: "FORM_DATA_RECEIVED",
              formData: {
                ...values,
                from: values.from.toUpperCase(),
                fromDate: getChromeFormatDate(values.fromDate),
                to: values.to.toUpperCase(),
                toDate: getChromeFormatDate(values.toDate),
              },
              windowConfig,
            });
            setSent(true);
          }}
        >
          {(formik) => (
            <Form>
              <FieldStack orientation="horizontal" className="airport-stack" paddingTop="major-3">
                <FieldWrapper state={getFieldState(formik, "from")} validationText={getValidationText(formik, "from")}>
                  <FormikField
                    component={Input.Formik}
                    name="from"
                    label="Starting airport"
                    after={<Input.Icon icon="solid-plane-departure" fontSize="300" color="black" />}
                    autoComplete="off"
                    hasFieldWrapper={true}
                    onChange={formik.handleChange}
                    onBlur={(event: Event) => {
                      const target = event.target as HTMLInputElement;
                      target.placeholder = "";
                      return formik.handleBlur(event);
                    }}
                    onFocus={(event: Event) => {
                      const target = event.target as HTMLInputElement;
                      target.placeholder = "SFO";
                    }}
                    maxlength="3"
                    minlength="3"
                    disabled={formik.isSubmitting}
                    containLabel
                  />
                </FieldWrapper>
                <FieldWrapper state={getFieldState(formik, "to")} validationText={getValidationText(formik, "to")}>
                  <FormikField
                    component={Input.Formik}
                    name="to"
                    label="Destination airport"
                    after={<Input.Icon icon="solid-plane-arrival" fontSize="300" color="black" />}
                    autoComplete="off"
                    hasFieldWrapper={true}
                    onChange={formik.handleChange}
                    onBlur={(event: Event) => {
                      const target = event.target as HTMLInputElement;
                      target.placeholder = "";
                      return formik.handleBlur(event);
                    }}
                    onFocus={(event: Event) => {
                      const target = event.target as HTMLInputElement;
                      target.placeholder = "LAX";
                    }}
                    disabled={formik.isSubmitting}
                    containLabel
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
                    onChange={formik.handleChange}
                    onBlur={(event: Event) => {
                      const target = event.target as HTMLInputElement;
                      target.type = "text";

                      const value = isValidDateInputString(target.value)
                        ? getStandardizedFormatDate(target.value)
                        : initialValues.fromDate;

                      formik.setFieldValue("fromDate", value);
                      formik.handleBlur(event);
                    }}
                    onFocus={(event: Event) => {
                      const target = event.target as HTMLInputElement;
                      target.type = "date";
                    }}
                    disabled={formik.isSubmitting}
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
                      onChange={formik.handleChange}
                      onBlur={(event: Event) => {
                        const target = event.target as HTMLInputElement;
                        target.type = "text";

                        const value = isValidDateInputString(target.value)
                          ? getStandardizedFormatDate(target.value)
                          : initialValues.fromDate;

                        formik.setFieldValue("toDate", value);
                        formik.handleBlur(event);
                      }}
                      onFocus={(event: Event) => {
                        const target = event.target as HTMLInputElement;
                        target.type = "date";
                      }}
                      disabled={formik.isSubmitting}
                      group="role"
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
                    after={<Input.Icon icon="solid-user" fontSize="300" color="black" />}
                    containLabel
                  />
                </FieldWrapper>
                <FieldWrapper
                  state={getFieldState(formik, "cabin")}
                  validationText={getValidationText(formik, "cabin")}
                >
                  <FormikField
                    component={Select.Formik}
                    name="cabin"
                    options={[
                      { value: "econ", label: "Economy" },
                      { value: "prem_econ", label: "Premium economy" },
                      { value: "business", label: "Business" },
                      { value: "first", label: "First" },
                    ]}
                    width="100%"
                    autoComplete="off"
                    hasFieldWrapper={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Cabin"
                    disabled={formik.isSubmitting}
                    after={<Input.Icon icon="solid-plane-departure" fontSize="300" />}
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
                >
                  <FormikField
                    component={RadioGroup.Formik}
                    name="searchByPoints"
                    options={[
                      { value: false, label: "Price" },
                      { value: true, label: "Points" },
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
          )}
        </Formik>
      </Card>
    </Box>
  );
};

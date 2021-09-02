import { Box, Button, Card, FieldStack, FieldWrapper, Input, RadioGroup, Select, Switch } from "bumbag";
import { addDays, endOfDay, startOfDay } from "date-fns";
import { Field as FormikField, Form, Formik } from "formik";
import React from "react";
import { boolean, date, mixed, number, object, ref, string } from "yup";

import { getFieldState, getParsedDate, getValidationText } from "../utilities/forms";
import { getFormattedDate } from "../utilities/forms/getFormattedDate";
import { setType } from "../utilities/forms/setType";

const airportCodeHelpText = "Airport codes must be three uppercase letters (e.g. SFO).";
const cabinHelpText = "You must select a cabin type.";

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
    .required("What airport do you want to leave from?"),
  fromDate: date()
    .transform(getParsedDate)
    .required("What day do you want to leave on?")
    .min(startOfDay(new Date()), "Your flight cannot start in the past.")
    .max(addDays(endOfDay(new Date()), 345), "We cannot look up flights this far in the future."),
  toDate: date().when("roundtrip", {
    is: (value: boolean) => value,
    then: date()
      .transform(getParsedDate)
      .required("What day do you want to return on?")
      // .min(ref("departureDate"), "Your return flight cannot start before the departure flight.")
      .max(addDays(endOfDay(new Date()), 345), "We cannot look up flights this far in the future."),
    otherwise: date().nullable(),
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

export const SearchForm = (): React.ReactElement => {
  return (
    <Box className="search-form-wrapper" display="flex" position="relative" justifyContent="center">
      <Card maxWidth="768px">
        <Formik
          initialValues={{
            from: "",
            to: "",
            // @ts-ignore
            fromDate: getFormattedDate(addDays(startOfDay(new Date()), 1)),
            // @ts-ignore
            toDate: getFormattedDate(addDays(startOfDay(new Date()), 4)),
            numPax: 1,
            roundtrip: true,
            cabin: "econ",
            searchByPoints: false,
          }}
          validateOnBlur
          validationSchema={SearchFormSchema}
          onSubmit={(values: FormState) => {
            console.log(values);
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
                    autoComplete="off"
                    hasFieldWrapper={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                    autoComplete="off"
                    hasFieldWrapper={true}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                    onBlur={(event: Event) => setType(event, "text", formik.handleBlur)}
                    onFocus={(event: Event) => setType(event, "date")}
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
                      onBlur={(event: Event) => setType(event, "text", formik.handleBlur)}
                      onFocus={(event: Event) => setType(event, "date")}
                      disabled={formik.isSubmitting}
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
              <Card.Footer>
                <Button
                  type="submit"
                  palette="primary"
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

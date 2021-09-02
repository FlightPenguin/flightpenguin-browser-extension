import { FormikProps } from "formik";

export const getValidationText = (formik: FormikProps<any>, fieldName: string): string | undefined => {
  const touched = formik.touched[fieldName];
  const errors = formik.errors[fieldName];
  return touched && errors ? `${errors}` : undefined;
};

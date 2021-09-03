import { FormikProps } from "formik";

export const getFieldState = (
  formik: FormikProps<any>,
  fieldName: string,
): "danger" | "success" | "warning" | undefined => {
  return formik.touched[fieldName] && formik.errors[fieldName] ? "danger" : undefined;
};

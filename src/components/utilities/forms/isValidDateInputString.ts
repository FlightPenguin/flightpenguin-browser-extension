const CHROME_DATE_FORMAT = /^\d{4}-\d{1,2}-\d{1,2}$/;

export const isValidDateInputString = (value: string): boolean => {
  return CHROME_DATE_FORMAT.test(value);
};

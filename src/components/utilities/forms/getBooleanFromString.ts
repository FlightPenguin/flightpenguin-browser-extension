export const getBooleanFromString = (input: string | number): boolean => {
  return ["1", "t"].includes(input.toString().toLowerCase().charAt(0));
};

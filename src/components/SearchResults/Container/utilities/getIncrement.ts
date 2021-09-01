export const getIncrement = (lowerBound: number, upperBound: number, startHour: number): number => {
  let increment;

  if (upperBound - lowerBound > 72) {
    increment = 6;
  } else if (upperBound - startHour <= 12) {
    increment = 1;
  } else if (upperBound - startHour <= 24) {
    if (startHour % 4 === 0) {
      increment = 2;
    } else {
      increment = 3;
    }
  } else if (startHour % 4 === 0) {
    increment = 4;
  } else {
    increment = 3;
  }
  return increment;
};

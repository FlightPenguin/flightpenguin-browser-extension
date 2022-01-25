interface GetIncrementInput {
  lowerBound: number;
  upperBound: number;
  startHour: number;
  flightTimeContainerWidth: number;
}

export const getIncrement = ({
  lowerBound,
  upperBound,
  startHour,
  flightTimeContainerWidth,
}: GetIncrementInput): number => {
  if (flightTimeContainerWidth <= 500) {
    return 24;
  }

  const multiplier = flightTimeContainerWidth <= 800 ? 2 : 1;

  if (upperBound - lowerBound > 72) {
    return 6 * multiplier;
  } else if (upperBound - startHour <= 12) {
    return 1 * multiplier;
  } else if (upperBound - startHour <= 24) {
    if (startHour % 4 === 0) {
      return 2 * multiplier;
    } else {
      return 3 * multiplier;
    }
  } else if (startHour % 4 === 0) {
    return 4 * multiplier;
  } else {
    return 3 * multiplier;
  }
};

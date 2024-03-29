import Decimal from "decimal.js-light";

import { InvalidArgument, InvalidArgumentsError } from "../../../../shared/errors";
import { getValueInRange } from "../../../../shared/utilities/getValueInRange";
import { getPositionByTick } from "../utilities/getPositionByTick";

interface GetTrackPositionProps {
  index: number;
  intervals: number[];
  value: number[];
  tripContainerWidth: number;
}

export const getTrackPosition = ({
  value,
  index,
  intervals,
  tripContainerWidth,
}: GetTrackPositionProps): { left: number; right: number } => {
  /*
  We need to adjust the position to the track to deal with the thumb positional adjustment.
  Track 0: Left of the first slider thumb.
  Track 1: Between the thumbs
  Track 2: To the right of the thumbs
   */
  validateInput({ value, index, intervals, tripContainerWidth });

  const innerBoundary = getValueInRange({
    value: getPositionByTick({ value: value[0], intervals, tripContainerWidth, applyAdjustment: false }),
    minimumValue: 0,
    maximumValue: tripContainerWidth,
  });
  const outerBoundary = getValueInRange({
    value: getPositionByTick({ value: value[1], intervals, tripContainerWidth, applyAdjustment: false }),
    minimumValue: 0,
    maximumValue: tripContainerWidth,
  });

  let leftPosition;
  let rightPosition;
  if (index === 0) {
    leftPosition = 0;
    rightPosition = new Decimal(tripContainerWidth).minus(innerBoundary).toDecimalPlaces(2).toNumber();
  } else if (index === 1) {
    leftPosition = innerBoundary;
    rightPosition = new Decimal(tripContainerWidth).minus(outerBoundary).toDecimalPlaces(2).toNumber();
  } else {
    leftPosition = outerBoundary;
    rightPosition = 0;
  }

  return {
    left: leftPosition,
    right: rightPosition,
  };
};

const validateInput = ({ value, index, intervals, tripContainerWidth }: GetTrackPositionProps): void => {
  const invalidArgs = [] as InvalidArgument[];

  if (Number.isNaN(tripContainerWidth)) {
    invalidArgs.push({ argumentName: "tripContainerWidth", value: tripContainerWidth });
  }

  if (Number.isNaN(index)) {
    invalidArgs.push({ argumentName: "index", value: index });
  }

  if (
    intervals.some((val) => {
      return Number.isNaN(val);
    })
  ) {
    invalidArgs.push({ argumentName: "intervals", value: intervals });
  }

  if (
    value.some((val) => {
      return Number.isNaN(val);
    })
  ) {
    invalidArgs.push({ argumentName: "value", value: value });
  }

  if (invalidArgs.length) {
    throw new InvalidArgumentsError("getTrackPosition", invalidArgs);
  }
};

import Decimal from "decimal.js-light";

import { getValueInRange } from "../../../../shared/utilities/getValueInRange";
import { flightTimeContainerWidth } from "../../../constants";
import { getPositionByTick } from "../utilities/getPositionByTick";

interface GetTrackPositionProps {
  index: number;
  intervals: number[];
  value: number[];
}

export const getTrackPosition = ({
  value,
  index,
  intervals,
}: GetTrackPositionProps): { left: number; right: number } => {
  /*
  We need to adjust the position to the track to deal with the thumb positional adjustment.
  Track 0: Left of the first slider thumb.
  Track 1: Between the thumbs
  Track 2: To the right of the thumbs
   */

  const innerBoundary = getValueInRange({
    value: getPositionByTick({ value: value[0], intervals, applyAdjustment: false }),
    minimumValue: 0,
    maximumValue: flightTimeContainerWidth,
  });
  const outerBoundary = getValueInRange({
    value: getPositionByTick({ value: value[1], intervals, applyAdjustment: false }),
    minimumValue: 0,
    maximumValue: flightTimeContainerWidth,
  });

  let leftPosition;
  let rightPosition;
  if (index === 0) {
    leftPosition = 0;
    rightPosition = new Decimal(flightTimeContainerWidth).minus(innerBoundary).toDecimalPlaces(2).toNumber();
  } else if (index === 1) {
    leftPosition = innerBoundary;
    rightPosition = new Decimal(flightTimeContainerWidth).minus(outerBoundary).toDecimalPlaces(2).toNumber();
  } else {
    leftPosition = outerBoundary;
    rightPosition = 0;
  }

  return {
    left: leftPosition,
    right: rightPosition,
  };
};

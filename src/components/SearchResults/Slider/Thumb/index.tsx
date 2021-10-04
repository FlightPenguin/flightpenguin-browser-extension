import React, { HTMLProps } from "react";

import { flightTimeContainerWidth } from "../../../constants";
import { thumbWidthValue } from "../constants";
import { getDatetimeAtPosition } from "../getTimeAtPosition";
import { getThumbPosition } from "./getThumbPosition";

interface ThumbProps {
  state: { index: number; value: number[]; valueNow: number };
  props: HTMLProps<HTMLDivElement>;
  startDate: Date;
  intervals: number[];
  heightValue: number;
}

const widthValue = thumbWidthValue;

export const Thumb = ({ state, props, startDate, intervals, heightValue }: ThumbProps): React.ReactElement => {
  const { formattedDate, formattedTime } = getDatetimeAtPosition({
    startDate,
    position: state.valueNow,
    intervals: intervals,
    width: flightTimeContainerWidth,
  });

  const position = getThumbPosition({ props, index: state.index });

  return (
    <div
      {...props}
      style={{
        ...props.style,
        height: `${heightValue}px`,
        lineHeight: "18px",
        width: `${widthValue}px`,
        textAlign: "center",
        backgroundColor: "#000",
        color: "#fff",
        borderRadius: "10%",
        cursor: "grab",
        fontSize: "14px",
        left: `${position}px`,
      }}
    >
      <span>
        {formattedDate}
        <br />
        {formattedTime}
      </span>
    </div>
  );
};

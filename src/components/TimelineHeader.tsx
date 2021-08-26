import { Container, Text } from "bumbag";
import React, { useState } from "react";

import { FlightSearchFormData } from "../shared/types/FlightSearchFormData";
import { getWeekdayName } from "../shared/utilities/getWeekdayName";
import { convertMinutesTo12HourClock } from "../utilityFunctions";

interface TimelineHeaderProps {
  formData: FlightSearchFormData;
  flightType: "DEPARTURE" | "RETURN";
  intervals: number[];
  tzOffset: number;
  maxRowWidth: number;
}

export const TimelineHeader = ({
  formData,
  flightType,
  intervals,
  tzOffset,
  maxRowWidth,
}: TimelineHeaderProps): React.ReactElement => {
  const [daysCounter, setDaysCounter] = useState(0);
  const intervalWidth = maxRowWidth / (intervals.length - 1);
  const { startDate, departureAirportCode, arrivalAirportCode } = getFlightInfo(formData, flightType);

  return (
    <Container data-name={`${flightType.toLowerCase()}-header`}>
      {intervals.map((interval, index) => {
        const time = getHeaderTime(interval);
        const offsetTime = getHeaderTime(interval, tzOffset);
        const isMidnight = time === "12 AM";
        const intervalDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDay() + daysCounter);
        const startX = intervalWidth * index;

        if (isMidnight && index !== 0) {
          setDaysCounter(daysCounter + 1);
        }

        return (
          <Container key={`interval-wrapper-${intervalDate}-${time}`}>
            <Container data-name="interval" left={startX}>
              {isMidnight && <Text>{getWeekdayName(intervalDate)}</Text>}
              <Text title={`Time at ${departureAirportCode}`}>{time.toLowerCase()}</Text>
              {tzOffset && <Text title={`Time at ${arrivalAirportCode}`}>{offsetTime.toLowerCase()}</Text>}
            </Container>
            <Container data-name="interval-line" />
          </Container>
        );
      })}
    </Container>
  );
};

const getHeaderTime = (interval: number, offset?: number): string => {
  let timeMinutes = interval * 60;
  if (offset) {
    timeMinutes -= offset;
  }
  const time = convertMinutesTo12HourClock(Math.abs(timeMinutes));
  return time.replace(":00", "");
};

const getFlightInfo = (formData: FlightSearchFormData, flightType: "DEPARTURE" | "RETURN") => {
  let startDate;
  let departureAirportCode;
  let arrivalAirportCode;
  if (flightType === "DEPARTURE") {
    startDate = formData.fromDate;
    departureAirportCode = formData.from;
    arrivalAirportCode = formData.to;
  } else {
    startDate = formData.toDate;
    departureAirportCode = formData.to;
    arrivalAirportCode = formData.from;
  }

  const [year, month, day] = startDate.split("-").map((date: string) => Number(date));
  return {
    startDate: new Date(year, month, day),
    departureAirportCode,
    arrivalAirportCode,
  };
};

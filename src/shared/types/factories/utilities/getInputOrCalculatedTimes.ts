import { faker } from "@faker-js/faker";
import { addHours, addMinutes, differenceInMinutes, startOfToday } from "date-fns";

import { getParsedISODate } from "../../utilities/getParsedISODate";
import { getParsedNumber } from "../../utilities/getParsedNumber";

interface GetInputOrCalculatedTimesInput {
  arrivalTime?: Date | string;
  departureTime?: Date | string;
  durationMinutes?: number | string;
}

interface GetInputOrCalculatedTimesOutput {
  arrivalTime: Date;
  departureTime: Date;
  durationMinutes: number;
}

export const getInputOrCalculatedTimes = ({
  arrivalTime,
  departureTime,
  durationMinutes,
}: GetInputOrCalculatedTimesInput): GetInputOrCalculatedTimesOutput => {
  if (!!arrivalTime && durationMinutes && !!departureTime) {
    arrivalTime = getParsedISODate(arrivalTime);
    durationMinutes = getParsedNumber(durationMinutes);
    departureTime = getParsedISODate(departureTime);
  } else if (!!arrivalTime && durationMinutes && !departureTime) {
    arrivalTime = getParsedISODate(arrivalTime);
    durationMinutes = getParsedNumber(durationMinutes);

    departureTime = addMinutes(arrivalTime as Date, durationMinutes * -1);
  } else if (!!departureTime && !!durationMinutes && !arrivalTime) {
    departureTime = getParsedISODate(departureTime);
    durationMinutes = getParsedNumber(durationMinutes);

    arrivalTime = addMinutes(departureTime as Date, durationMinutes);
  } else if (!!departureTime && !durationMinutes && !!arrivalTime) {
    departureTime = getParsedISODate(departureTime);
    arrivalTime = getParsedISODate(arrivalTime);

    durationMinutes = differenceInMinutes(arrivalTime, departureTime);
  } else if (!!arrivalTime && !durationMinutes && !departureTime) {
    arrivalTime = getParsedISODate(arrivalTime);

    durationMinutes = faker.datatype.number({ min: 30, max: 600 });
    departureTime = addMinutes(arrivalTime as Date, durationMinutes * -1);
  } else if (!arrivalTime && !durationMinutes && !!departureTime) {
    departureTime = getParsedISODate(departureTime);

    durationMinutes = faker.datatype.number({ min: 30, max: 600 });
    arrivalTime = addMinutes(departureTime as Date, durationMinutes);
  } else if (!arrivalTime && !!durationMinutes && !departureTime) {
    durationMinutes = getParsedNumber(durationMinutes);

    const today = startOfToday();
    departureTime = faker.date.between(addHours(today, 5), addHours(today, 16));
    arrivalTime = addMinutes(departureTime as Date, durationMinutes);
  } else {
    const today = startOfToday();
    departureTime = faker.date.between(addHours(today, 5), addHours(today, 16));
    durationMinutes = faker.datatype.number({ min: 30, max: 600 });
    arrivalTime = addMinutes(arrivalTime as Date, durationMinutes);
  }

  return { arrivalTime, departureTime, durationMinutes };
};

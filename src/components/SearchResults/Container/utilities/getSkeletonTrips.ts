import { addHours, addMinutes, differenceInMinutes } from "date-fns";

import { DisplayableTrip } from "../../../../shared/types/DisplayableTrip";
import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { Trip } from "../../../../shared/types/Trip";
import { getParsedDate } from "../../../utilities/forms";

export const getSkeletonTrips = (
  formData: FlightSearchFormData,
  containerIndex: number,
  earliestTime: Date,
  latestTime: Date,
): DisplayableTrip[] => {
  const [departureLocation, arrivalLocation, departureDate] =
    formData.roundtrip && containerIndex === 2
      ? [formData.to, formData.from, getParsedDate(formData.toDate)]
      : [formData.from, formData.to, getParsedDate(formData.fromDate)];

  const containerMinutes = differenceInMinutes(latestTime, earliestTime);

  return [
    new DisplayableTrip({
      cabin: formData.cabin || "econ",
      containerInfo: { earliestTime, latestTime, differenceInMinutes: containerMinutes },
      dominatedTripIds: [],
      lowestFare: 293,
      trip: new Trip({
        arrivalDateTime: addMinutes(addHours(departureDate, 9), 30),
        arrivalLocation: { code: arrivalLocation.label, type: arrivalLocation?.raw?.city ? "CITY" : "AIRPORT" },
        departureDateTime: addHours(departureDate, 8),
        departureLocation: { code: departureLocation.label, type: departureLocation?.raw?.city ? "CITY" : "AIRPORT" },
        durationMinutes: 90,
        tripComponents: [
          {
            type: "FLIGHT",
            object: {
              arrivalLocalDateTime: addMinutes(addHours(departureDate, 9), 30),
              arrivalLocation: { code: arrivalLocation.label, type: arrivalLocation?.raw?.city ? "CITY" : "AIRPORT" },
              departureLocalDateTime: addHours(departureDate, 8),
              departureLocation: {
                code: departureLocation.label,
                type: departureLocation?.raw?.city ? "CITY" : "AIRPORT",
              },
              durationMinutes: 90,
              elapsedTimezoneOffset: 0,
              marketingAirline: { name: "Delta" },
            },
          },
        ],
      }),
    }),

    new DisplayableTrip({
      cabin: formData.cabin || "econ",
      containerInfo: { earliestTime, latestTime, differenceInMinutes: containerMinutes },
      dominatedTripIds: [],
      lowestFare: 273,
      trip: new Trip({
        arrivalDateTime: addHours(departureDate, 7),
        arrivalLocation: { code: arrivalLocation.label, type: arrivalLocation?.raw?.city ? "CITY" : "AIRPORT" },
        departureDateTime: addHours(departureDate, 5),
        departureLocation: { code: departureLocation.label, type: departureLocation?.raw?.city ? "CITY" : "AIRPORT" },
        durationMinutes: 120,
        tripComponents: [
          {
            type: "FLIGHT",
            object: {
              arrivalLocalDateTime: addHours(departureDate, 7),
              arrivalLocation: { code: arrivalLocation.label, type: arrivalLocation?.raw?.city ? "CITY" : "AIRPORT" },
              departureLocalDateTime: addHours(departureDate, 5),
              departureLocation: {
                code: departureLocation.label,
                type: departureLocation?.raw?.city ? "CITY" : "AIRPORT",
              },
              durationMinutes: 120,
              elapsedTimezoneOffset: 0,
              marketingAirline: { name: "jetBlue" },
            },
          },
        ],
      }),
    }),

    new DisplayableTrip({
      cabin: formData.cabin || "econ",
      containerInfo: { earliestTime, latestTime, differenceInMinutes: containerMinutes },
      dominatedTripIds: [],
      lowestFare: 331,
      trip: new Trip({
        arrivalDateTime: addMinutes(addHours(departureDate, 20), 45),
        arrivalLocation: { code: "ABC", type: "AIRPORT" },
        departureDateTime: addMinutes(addHours(departureDate, 18), 40),
        departureLocation: { code: departureLocation.label, type: departureLocation?.raw?.city ? "CITY" : "AIRPORT" },
        durationMinutes: 220,
        tripComponents: [
          {
            type: "FLIGHT",
            object: {
              arrivalLocalDateTime: addMinutes(addHours(departureDate, 18), 40),
              arrivalLocation: { code: "ABC", type: "AIRPORT" },
              departureLocalDateTime: addMinutes(addHours(departureDate, 17), 5),
              departureLocation: {
                code: departureLocation.label,
                type: departureLocation?.raw?.city ? "CITY" : "AIRPORT",
              },
              durationMinutes: 95,
              elapsedTimezoneOffset: 0,
              marketingAirline: { name: "United" },
            },
          },
          {
            type: "LAYOVER",
            object: {
              arrivalLocalDateTime: addMinutes(addHours(departureDate, 18), 40),
              arrivalLocation: { code: "ABC", type: "AIRPORT" },
              arrivalTripStartDateTime: addMinutes(addHours(departureDate, 18), 40),
              departureLocalDateTime: addMinutes(addHours(departureDate, 19), 35),
              departureLocation: { code: "ABC", type: "AIRPORT" },
              departureTripStartDateTime: addMinutes(addHours(departureDate, 19), 35),
              durationMinutes: 55,
            },
          },
          {
            type: "FLIGHT",
            object: {
              arrivalLocalDateTime: addMinutes(addHours(departureDate, 20), 45),
              arrivalLocation: {
                code: arrivalLocation.label,
                type: arrivalLocation?.raw?.city ? "CITY" : "AIRPORT",
              },
              departureLocalDateTime: addMinutes(addHours(departureDate, 19), 35),
              departureLocation: { code: "ABC", type: "AIRPORT" },
              durationMinutes: 70,
              elapsedTimezoneOffset: 0,
              marketingAirline: { name: "Spirit" },
            },
          },
        ],
      }),
    }),

    new DisplayableTrip({
      cabin: formData.cabin || "econ",
      containerInfo: { earliestTime, latestTime, differenceInMinutes: containerMinutes },
      dominatedTripIds: [],
      lowestFare: 338,
      trip: new Trip({
        arrivalDateTime: addMinutes(addHours(departureDate, 16), 45),
        arrivalLocation: { code: "DEF", type: "AIRPORT" },
        departureDateTime: addMinutes(addHours(departureDate, 11), 50),
        departureLocation: { code: departureLocation.label, type: departureLocation?.raw?.city ? "CITY" : "AIRPORT" },
        durationMinutes: 295,
        tripComponents: [
          {
            type: "FLIGHT",
            object: {
              arrivalLocalDateTime: addMinutes(addHours(departureDate, 13), 50),
              arrivalLocation: { code: "DEF", type: "AIRPORT" },
              departureLocalDateTime: addMinutes(addHours(departureDate, 11), 50),
              departureLocation: {
                code: departureLocation.label,
                type: departureLocation?.raw?.city ? "CITY" : "AIRPORT",
              },
              durationMinutes: 120,
              elapsedTimezoneOffset: 0,
              marketingAirline: { name: "Frontier" },
            },
          },
          {
            type: "LAYOVER",
            object: {
              arrivalLocalDateTime: addMinutes(addHours(departureDate, 13), 50),
              arrivalLocation: { code: "DEF", type: "AIRPORT" },
              arrivalTripStartDateTime: addMinutes(addHours(departureDate, 13), 50),
              departureLocalDateTime: addMinutes(addHours(departureDate, 15), 20),
              departureLocation: { code: "DEF", type: "AIRPORT" },
              departureTripStartDateTime: addMinutes(addHours(departureDate, 15), 20),
              durationMinutes: 90,
            },
          },
          {
            type: "FLIGHT",
            object: {
              arrivalLocalDateTime: addMinutes(addHours(departureDate, 16), 45),
              arrivalLocation: {
                code: arrivalLocation.label,
                type: arrivalLocation?.raw?.city ? "CITY" : "AIRPORT",
              },
              departureLocalDateTime: addMinutes(addHours(departureDate, 15), 20),
              departureLocation: { code: "ABC", type: "AIRPORT" },
              durationMinutes: 85,
              elapsedTimezoneOffset: 0,
              marketingAirline: { name: "WN" },
            },
          },
        ],
      }),
    }),
  ];
};

import { addHours, addMinutes } from "date-fns";

import { FlightSearchFormData } from "../../../../shared/types/FlightSearchFormData";
import { DisplayableTrip } from "../../../../shared/types/newtypes/DisplayableTrip";
import { Trip } from "../../../../shared/types/newtypes/Trip";
import { getParsedDate } from "../../../utilities/forms";

export const getSkeletonTrips = (formData: FlightSearchFormData, containerIndex: number): DisplayableTrip[] => {
  const [departureLocation, arrivalLocation, departureDate] =
    formData.roundtrip && containerIndex === 1
      ? [formData.to, formData.from, getParsedDate(formData.toDate)]
      : [formData.from, formData.to, getParsedDate(formData.fromDate)];

  return [
    new DisplayableTrip({
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
              arrivalDateTime: addMinutes(addHours(departureDate, 9), 30),
              arrivalLocation: { code: arrivalLocation.label, type: arrivalLocation?.raw?.city ? "CITY" : "AIRPORT" },
              departureDateTime: addHours(departureDate, 8),
              departureLocation: {
                code: departureLocation.label,
                type: departureLocation?.raw?.city ? "CITY" : "AIRPORT",
              },
              durationMinutes: 90,
              marketingAirline: { name: "Delta" },
            },
          },
        ],
      }),
    }),

    new DisplayableTrip({
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
              arrivalDateTime: addHours(departureDate, 7),
              arrivalLocation: { code: arrivalLocation.label, type: arrivalLocation?.raw?.city ? "CITY" : "AIRPORT" },
              departureDateTime: addHours(departureDate, 5),
              departureLocation: {
                code: departureLocation.label,
                type: departureLocation?.raw?.city ? "CITY" : "AIRPORT",
              },
              durationMinutes: 120,
              marketingAirline: { name: "JetBlue" },
            },
          },
        ],
      }),
    }),

    new DisplayableTrip({
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
              arrivalDateTime: addMinutes(addHours(departureDate, 18), 40),
              arrivalLocation: { code: "ABC", type: "AIRPORT" },
              departureDateTime: addMinutes(addHours(departureDate, 17), 5),
              departureLocation: {
                code: departureLocation.label,
                type: departureLocation?.raw?.city ? "CITY" : "AIRPORT",
              },
              durationMinutes: 95,
              marketingAirline: { name: "United" },
            },
          },
          {
            type: "LAYOVER",
            object: {
              arrivalDateTime: addMinutes(addHours(departureDate, 18), 40),
              arrivalLocation: { code: "ABC", type: "AIRPORT" },
              departureDateTime: addMinutes(addHours(departureDate, 19), 35),
              departureLocation: { code: "ABC", type: "AIRPORT" },
              durationMinutes: 55,
            },
          },
          {
            type: "FLIGHT",
            object: {
              arrivalDateTime: addMinutes(addHours(departureDate, 20), 45),
              arrivalLocation: {
                code: arrivalLocation.label,
                type: arrivalLocation?.raw?.city ? "CITY" : "AIRPORT",
              },
              departureDateTime: addMinutes(addHours(departureDate, 19), 35),
              departureLocation: { code: "ABC", type: "AIRPORT" },
              durationMinutes: 70,
              marketingAirline: { name: "Spirit" },
            },
          },
        ],
      }),
    }),

    new DisplayableTrip({
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
              arrivalDateTime: addMinutes(addHours(departureDate, 13), 50),
              arrivalLocation: { code: "DEF", type: "AIRPORT" },
              departureDateTime: addMinutes(addHours(departureDate, 11), 50),
              departureLocation: {
                code: departureLocation.label,
                type: departureLocation?.raw?.city ? "CITY" : "AIRPORT",
              },
              durationMinutes: 120,
              marketingAirline: { name: "Frontier" },
            },
          },
          {
            type: "LAYOVER",
            object: {
              arrivalDateTime: addMinutes(addHours(departureDate, 13), 50),
              arrivalLocation: { code: "DEF", type: "AIRPORT" },
              departureDateTime: addMinutes(addHours(departureDate, 15), 20),
              departureLocation: { code: "DEF", type: "AIRPORT" },
              durationMinutes: 90,
            },
          },
          {
            type: "FLIGHT",
            object: {
              arrivalDateTime: addMinutes(addHours(departureDate, 16), 45),
              arrivalLocation: {
                code: arrivalLocation.label,
                type: arrivalLocation?.raw?.city ? "CITY" : "AIRPORT",
              },
              departureDateTime: addMinutes(addHours(departureDate, 15), 20),
              departureLocation: { code: "ABC", type: "AIRPORT" },
              durationMinutes: 85,
              marketingAirline: { name: "WN" },
            },
          },
        ],
      }),
    }),
  ];
};

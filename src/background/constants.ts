export const PROVIDERS_NEEDING_RETURNS = [
  // force expansion
  "expedia",
];
export const PROVIDERS_SUPPORTING_POINTS_SEARCH = ["expedia"];
export const SUPPORTED_PROVIDERS = [
  // force expansion
  // "expedia",
  // "kiwi",
  "skyscanner",
  // "southwest",
];

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const DEFAULT_ON_READY_FUNCTION = () => {};

export type SearchType = "DEPARTURE" | "RETURN" | "BOTH";
export type FlightType = "DEPARTURE" | "RETURN";
export const CabinMap = {
  econ: "Economy",
  prem_econ: "Premium Economy",
  business: "Business",
  first: "First",
};
export type CabinType = "econ" | "prem_econ" | "business" | "first";

//{
//     "depFlight": {
//         "fromTime": "3:50pm",
//         "toTime": "3:50am+1",
//         "fromTimeDetails": {
//             "hours": 15,
//             "displayHours": 3,
//             "minutes": 50,
//             "timeOfDay": "pm",
//             "excessDays": null
//         },
//         "toTimeDetails": {
//             "hours": 27,
//             "displayHours": 3,
//             "minutes": 50,
//             "timeOfDay": "am",
//             "excessDays": "+1"
//         },
//         "fromDateTime": "2021-11-19T20:50:00.000Z",
//         "toDateTime": "2021-11-20T08:50:00.000Z",
//         "fromLocalTime": "3:50pm",
//         "toLocalTime": "10:50am+1",
//         "toLocalDateTime": "2021-11-20T15:50:00.000Z",
//         "operatingAirline": {
//             "display": "Icelandair",
//             "color": "#043C84",
//             "code": "FI"
//         },
//         "id": "3:50pm-10:50am+1-Icelandair",
//         "duration": "12h",
//         "durationMinutes": 720,
//         "layovers": [
//             {
//                 "duration": "7h 25m",
//                 "durationMinutes": 445,
//                 "timezoneOffset": -420,
//                 "fromLocalTime": "3:50pm",
//                 "fromLocalTimeDetails": {
//                     "hours": 15,
//                     "displayHours": 3,
//                     "minutes": 50,
//                     "timeOfDay": "pm",
//                     "excessDays": null
//                 },
//                 "fromTime": "3:50pm",
//                 "fromTimeDetails": {
//                     "hours": 15,
//                     "displayHours": 3,
//                     "minutes": 50,
//                     "timeOfDay": "pm",
//                     "excessDays": null
//                 },
//                 "toTime": "11:15pm",
//                 "toTimeDetails": {
//                     "hours": 23,
//                     "displayHours": 11,
//                     "minutes": 15,
//                     "timeOfDay": "pm",
//                     "excessDays": null
//                 },
//                 "toLocalTime": "6:15am+1",
//                 "toLocalTimeDetails": {
//                     "hours": 30,
//                     "displayHours": 6,
//                     "minutes": 15,
//                     "timeOfDay": "am",
//                     "excessDays": "+1"
//                 },
//                 "from": "DEN",
//                 "to": "KEF",
//                 "operatingAirline": {
//                     "display": "Icelandair",
//                     "color": "#043C84",
//                     "code": "FI"
//                 },
//                 "operatingAirlineDetails": {
//                     "display": "Icelandair",
//                     "color": "#043C84",
//                     "code": "FI"
//                 },
//                 "isLayoverStop": false
//             },
//             {
//                 "fromTime": "11:15pm",
//                 "fromTimeDetails": {
//                     "hours": 23,
//                     "displayHours": 11,
//                     "minutes": 15,
//                     "timeOfDay": "pm",
//                     "excessDays": null
//                 },
//                 "fromLocalTime": "6:15am+1",
//                 "toTime": "12:40am",
//                 "toTimeDetails": {
//                     "hours": 0,
//                     "displayHours": 12,
//                     "minutes": 40,
//                     "timeOfDay": "am",
//                     "excessDays": null
//                 },
//                 "toLocalTime": "7:40am",
//                 "duration": "1h 25m",
//                 "durationInMinutes": 85,
//                 "from": "KEF",
//                 "to": "KEF",
//                 "timezoneOffset": 0,
//                 "isLayoverStop": true,
//                 "operatingAirline": {
//                     "display": "Layover at KEF.",
//                     "color": "transparent"
//                 }
//             },
//             {
//                 "duration": "3h 10m",
//                 "durationMinutes": 190,
//                 "timezoneOffset": 0,
//                 "fromLocalTime": "7:40am",
//                 "fromLocalTimeDetails": {
//                     "hours": 7,
//                     "displayHours": 7,
//                     "minutes": 40,
//                     "timeOfDay": "am",
//                     "excessDays": null
//                 },
//                 "fromTime": "12:40am",
//                 "fromTimeDetails": {
//                     "hours": 0,
//                     "displayHours": 12,
//                     "minutes": 40,
//                     "timeOfDay": "am",
//                     "excessDays": null
//                 },
//                 "toTime": "3:50am",
//                 "toTimeDetails": {
//                     "hours": 3,
//                     "displayHours": 3,
//                     "minutes": 50,
//                     "timeOfDay": "am",
//                     "excessDays": null
//                 },
//                 "toLocalTime": "10:50am",
//                 "toLocalTimeDetails": {
//                     "hours": 10,
//                     "displayHours": 10,
//                     "minutes": 50,
//                     "timeOfDay": "am",
//                     "excessDays": null
//                 },
//                 "from": "KEF",
//                 "to": "LHR",
//                 "operatingAirline": {
//                     "display": "Icelandair",
//                     "color": "#043C84",
//                     "code": "FI"
//                 },
//                 "operatingAirlineDetails": {
//                     "display": "Icelandair",
//                     "color": "#043C84",
//                     "code": "FI"
//                 },
//                 "isLayoverStop": false
//             }
//         ],
//         "itinIds": [
//             "3:50pm-10:50am+1-Icelandair-12:15pm-5:55pm-Icelandair"
//         ],
//         "timezoneOffset": -420,
//         "pain": 1559.7275080819006
//     },
//     "retFlight": {
//         "fromTime": "12:15pm",
//         "toTime": "12:55am+1",
//         "fromTimeDetails": {
//             "hours": 12,
//             "displayHours": 12,
//             "minutes": 15,
//             "timeOfDay": "pm",
//             "excessDays": null
//         },
//         "toTimeDetails": {
//             "hours": 24,
//             "displayHours": 12,
//             "minutes": 55,
//             "timeOfDay": "am",
//             "excessDays": "+1"
//         },
//         "fromDateTime": "2021-11-21T17:15:00.000Z",
//         "toDateTime": "2021-11-22T05:55:00.000Z",
//         "fromLocalTime": "12:15pm",
//         "toLocalTime": "5:55pm",
//         "toLocalDateTime": "2021-11-20T15:50:00.000Z",
//         "operatingAirline": {
//             "display": "Icelandair",
//             "color": "#043C84",
//             "code": "FI"
//         },
//         "id": "12:15pm-5:55pm-Icelandair",
//         "duration": "12h 40m",
//         "durationMinutes": 760,
//         "layovers": [
//             {
//                 "duration": "3h 15m",
//                 "durationMinutes": 195,
//                 "timezoneOffset": 0,
//                 "fromLocalTime": "12:15pm",
//                 "fromLocalTimeDetails": {
//                     "hours": 12,
//                     "displayHours": 12,
//                     "minutes": 15,
//                     "timeOfDay": "pm",
//                     "excessDays": null
//                 },
//                 "fromTime": "12:15pm",
//                 "fromTimeDetails": {
//                     "hours": 12,
//                     "displayHours": 12,
//                     "minutes": 15,
//                     "timeOfDay": "pm",
//                     "excessDays": null
//                 },
//                 "toTime": "3:30pm",
//                 "toTimeDetails": {
//                     "hours": 15,
//                     "displayHours": 3,
//                     "minutes": 30,
//                     "timeOfDay": "pm",
//                     "excessDays": null
//                 },
//                 "toLocalTime": "3:30pm",
//                 "toLocalTimeDetails": {
//                     "hours": 15,
//                     "displayHours": 3,
//                     "minutes": 30,
//                     "timeOfDay": "pm",
//                     "excessDays": null
//                 },
//                 "from": "LHR",
//                 "to": "KEF",
//                 "operatingAirline": {
//                     "display": "Icelandair",
//                     "color": "#043C84",
//                     "code": "FI"
//                 },
//                 "operatingAirlineDetails": {
//                     "display": "Icelandair",
//                     "color": "#043C84",
//                     "code": "FI"
//                 },
//                 "isLayoverStop": false
//             },
//             {
//                 "fromTime": "3:30pm",
//                 "fromTimeDetails": {
//                     "hours": 15,
//                     "displayHours": 3,
//                     "minutes": 30,
//                     "timeOfDay": "pm",
//                     "excessDays": null
//                 },
//                 "fromLocalTime": "3:30pm",
//                 "toTime": "4:55pm",
//                 "toTimeDetails": {
//                     "hours": 16,
//                     "displayHours": 4,
//                     "minutes": 55,
//                     "timeOfDay": "pm",
//                     "excessDays": null
//                 },
//                 "toLocalTime": "4:55pm",
//                 "duration": "1h 25m",
//                 "durationInMinutes": 85,
//                 "from": "KEF",
//                 "to": "KEF",
//                 "timezoneOffset": 0,
//                 "isLayoverStop": true,
//                 "operatingAirline": {
//                     "display": "Layover at KEF.",
//                     "color": "transparent"
//                 }
//             },
//             {
//                 "duration": "8h",
//                 "durationMinutes": 480,
//                 "timezoneOffset": 420,
//                 "fromLocalTime": "4:55pm",
//                 "fromLocalTimeDetails": {
//                     "hours": 16,
//                     "displayHours": 4,
//                     "minutes": 55,
//                     "timeOfDay": "pm",
//                     "excessDays": null
//                 },
//                 "fromTime": "4:55pm",
//                 "fromTimeDetails": {
//                     "hours": 16,
//                     "displayHours": 4,
//                     "minutes": 55,
//                     "timeOfDay": "pm",
//                     "excessDays": null
//                 },
//                 "toTime": "12:55am+1",
//                 "toTimeDetails": {
//                     "hours": 24,
//                     "displayHours": 12,
//                     "minutes": 55,
//                     "timeOfDay": "am",
//                     "excessDays": "+1"
//                 },
//                 "toLocalTime": "5:55pm",
//                 "toLocalTimeDetails": {
//                     "hours": 17,
//                     "displayHours": 5,
//                     "minutes": 55,
//                     "timeOfDay": "pm",
//                     "excessDays": null
//                 },
//                 "from": "KEF",
//                 "to": "DEN",
//                 "operatingAirline": {
//                     "display": "Icelandair",
//                     "color": "#043C84",
//                     "code": "FI"
//                 },
//                 "operatingAirlineDetails": {
//                     "display": "Icelandair",
//                     "color": "#043C84",
//                     "code": "FI"
//                 },
//                 "isLayoverStop": false
//             }
//         ],
//         "itinIds": [
//             "3:50pm-10:50am+1-Icelandair-12:15pm-5:55pm-Icelandair"
//         ],
//         "timezoneOffset": 420
//     },
//     "id": "3:50pm-10:50am+1-Icelandair-12:15pm-5:55pm-Icelandair",
//     "provider": "skyscanner",
//     "windowId": 158,
//     "tabId": 159,
//     "fareNumber": 939
// }

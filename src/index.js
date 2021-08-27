import { Box, Provider as BumbagProvider } from "bumbag";
import React from "react";
import ReactDom from "react-dom";

import { TimelineContainer } from "./components/TimelineContainer";

const root = document.getElementById("react-root");

if (root) {
  ReactDom.render(
    <BumbagProvider>
      <Box paddingTop="400px">
        <TimelineContainer
          flightType={"DEPARTURE"}
          itineraries={[
            {
              departureFlight: {
                fromTime: "12:31pm",
                fromTimeDetails: { hours: 12, minutes: 31, excessDays: null, displayHours: 12, timeOfDay: "pm" },
                toTime: "3:38pm",
                toTimeDetails: { hours: 15, minutes: 38, excessDays: null, displayHours: 3, timeOfDay: "pm" },
                duration: "3h7m",
                layovers: [
                  {
                    fromTime: "12:31pm",
                    fromTimeDetails: { hours: 12, minutes: 31, excessDays: null, displayHours: 12, timeOfDay: "pm" },
                    toTime: "3:38pm",
                    toTimeDetails: { hours: 15, minutes: 38, excessDays: null, displayHours: 3, timeOfDay: "pm" },
                    duration: "3h7m",
                    operatingAirline: "United",
                    operatingAirlineDetails: { display: "United", color: "#235EA6" },
                    from: "SFO",
                    to: "DEN",
                  },
                ],
                operatingAirline: "United",
                operatingAirlineDetails: { display: "United", color: "#235EA6" },
                marketingAirline: "United",
                marketingAirlineDetails: { display: "United", color: "#235EA6" },
                timezoneOffset: 60,
              },
              returnFlight: {
                fromTime: "11:45am",
                fromTimeDetails: { hours: 11, minutes: 45, excessDays: null, displayHours: 11, timeOfDay: "am" },
                toTime: "2:26pm",
                toTimeDetails: { hours: 14, minutes: 26, excessDays: null, displayHours: 14, timeOfDay: "pm" },
                duration: "2h41m",
                layovers: [
                  {
                    fromTime: "11:45am",
                    fromTimeDetails: { hours: 11, minutes: 45, excessDays: null, displayHours: 11, timeOfDay: "am" },
                    toTime: "2:26pm",
                    toTimeDetails: { hours: 14, minutes: 26, excessDays: null, displayHours: 14, timeOfDay: "pm" },
                    duration: "2h41m",
                    operatingAirline: "United",
                    operatingAirlineDetails: { display: "United", color: "#235EA6" },
                    from: "DEN",
                    to: "SFO",
                  },
                ],
                operatingAirline: "United",
                operatingAirlineDetails: { display: "United", color: "#235EA6" },
                marketingAirline: "United",
                marketingAirlineDetails: { display: "United", color: "#235EA6" },
                timezoneOffset: 60,
              },
              fare: "314",
              provider: "expedia",
              currency: "$",
              windowId: 31,
              tabId: 52,
            },
            {
              departureFlight: {
                fromTime: "06:45am",
                fromTimeDetails: { hours: 6, minutes: 45, excessDays: null, displayHours: 6, timeOfDay: "am" },
                toTime: "3:38pm+1",
                toTimeDetails: { hours: 15, minutes: 38, excessDays: 1, displayHours: 3, timeOfDay: "pm" },
                duration: "31h53m",
                layovers: [
                  {
                    fromTime: "6:45am",
                    fromTimeDetails: { hours: 6, minutes: 45, excessDays: null, displayHours: 6, timeOfDay: "am" },
                    toTime: "11:01am",
                    toTimeDetails: { hours: 11, minutes: 1, excessDays: null, displayHours: 11, timeOfDay: "am" },
                    duration: "4h16m",
                    operatingAirline: "Alaska",
                    operatingAirlineDetails: { display: "Alaska", color: "#51172C" },
                    from: "SFO",
                    to: "SEA",
                  },
                  {
                    fromTime: "11:59pm",
                    fromTimeDetails: { hours: 23, minutes: 59, excessDays: null, displayHours: 11, timeOfDay: "pm" },
                    toTime: "10:57am+1",
                    toTimeDetails: { hours: 10, minutes: 57, excessDays: +1, displayHours: 10, timeOfDay: "am" },
                    duration: "10h58m",
                    operatingAirline: "Alaska Express DBA Mercutio Airlines Limited",
                    operatingAirlineDetails: { display: "Alaska", color: "#51172C" },
                    from: "SEA",
                    to: "ORD",
                  },
                  {
                    fromTime: "10:57am",
                    fromTimeDetails: { hours: 10, minutes: 57, excessDays: +1, displayHours: 10, timeOfDay: "am" },
                    toTime: "3:38pm",
                    toTimeDetails: { hours: 15, minutes: 38, excessDays: null, displayHours: 3, timeOfDay: "pm" },
                    duration: "4h16m",
                    operatingAirline: "Frontier",
                    operatingAirlineDetails: { display: "Frontier", color: "#378055" },
                    from: "ORD",
                    to: "DEN",
                  },
                ],
                operatingAirline: "Multiple",
                operatingAirlineDetails: { display: "Multiple", color: "#DFCCFB" },
                marketingAirline: "Multiple",
                marketingAirlineDetails: { display: "Multiple", color: "#DFCCFB" },
                timezoneOffset: 60,
              },
              returnFlight: {
                fromTime: "11:45am",
                fromTimeDetails: { hours: 11, minutes: 45, excessDays: null, displayHours: 11, timeOfDay: "am" },
                toTime: "2:26pm",
                toTimeDetails: { hours: 14, minutes: 26, excessDays: null, displayHours: 14, timeOfDay: "pm" },
                duration: "2h41m",
                layovers: [
                  {
                    fromTime: "11:45am",
                    fromTimeDetails: { hours: 11, minutes: 45, excessDays: null, displayHours: 11, timeOfDay: "am" },
                    toTime: "2:26pm",
                    toTimeDetails: { hours: 14, minutes: 26, excessDays: null, displayHours: 14, timeOfDay: "pm" },
                    duration: "2h41m",
                    operatingAirline: "United",
                    operatingAirlineDetails: { display: "United", color: "#235EA6" },
                    from: "DEN",
                    to: "SFO",
                  },
                ],
                operatingAirline: "United",
                operatingAirlineDetails: { display: "United", color: "#235EA6" },
                marketingAirline: "United",
                marketingAirlineDetails: { display: "United", color: "#235EA6" },
                timezoneOffset: 60,
              },
              fare: "414",
              provider: "skiplagged",
              currency: "$",
              windowId: 31,
              tabId: 52,
            },
          ]}
          formData={{
            from: "SFO",
            to: "DEN",
            fromDate: "2021-11-03",
            toDate: "2021-11-05",
            numPax: 1,
            roundtrip: false,
            cabin: "econ",
            searchByPoints: false,
          }}
        />
      </Box>
    </BumbagProvider>,
    root,
  );
}

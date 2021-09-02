import { Provider as BumbagProvider } from "bumbag";
import React from "react";
import ReactDom from "react-dom";

import { SearchForm } from "./components/SearchForm/index";
import { SearchResults } from "./components/SearchResults";

const itineraries = [];
const departureFlights = [];
const returnFlights = [];
let formData;

const root = document.getElementById("react-root");

chrome.runtime.onMessage.addListener(function (message) {
  switch (message.event) {
    case "FLIGHT_RESULTS_FOR_CLIENT":
      message.flights?.departureList.forEach((departure) => {
        departureFlights.push(departure);
      });

      message.flights?.itins.forEach((itinerary) => {
        itineraries.push(itinerary);
      });

      formData = message.formData;

      break;
    case "RETURN_FLIGHTS_FOR_CLIENT":
      message.flights?.returnList.forEach((departure) => {
        returnFlights.push(departure);
      });

      message.flights?.itins.forEach((itinerary) => {
        itineraries.push(itinerary);
      });

      break;
    default:
      break;
  }
});

if (root) {
  ReactDom.render(
    <BumbagProvider>
      <SearchForm />
      {formData && (
        <SearchResults
          itineraries={itineraries}
          formData={formData}
          departureFlights={departureFlights}
          returnFlights={returnFlights}
        />
      )}
    </BumbagProvider>,
    root,
  );
}

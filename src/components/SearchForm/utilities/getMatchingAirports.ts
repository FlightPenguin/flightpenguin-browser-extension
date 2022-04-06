import Fuse from "fuse.js";
import uniqBy from "lodash.uniqby";

import { Airport } from "../api/airports/Airport";
import { SearchAirport } from "../api/airports/SearchAirport";
import { SearchCity } from "../api/airports/SearchCity";

export const getMatchingAirports = (searchText: string, airports: SearchAirport[], cities: SearchCity[]): Airport[] => {
  const cleanedText = searchText.normalize("NFD").replace(/\p{Diacritic}/gu, "");

  const fuse = new Fuse(airports, {
    keys: ["searchText", "iataCode", "cityCode"],
    ignoreLocation: true,
    threshold: 0.4,
    includeScore: true,
  });

  const searchResults: SearchAirport[] = fuse
    .search(cleanedText)
    .filter((record) => {
      return Number(record.score) <= 0.4; // threshold doesn't seem to work?
    })
    .slice(0, 10)
    .sort((a, b) => {
      if (cleanedText.length === 3) {
        if (cleanedText.toUpperCase() === a.item.iataCode.toUpperCase()) {
          return -1;
        }
        if (cleanedText.toUpperCase() === b.item.iataCode.toUpperCase()) {
          return 1;
        }
      }
      return Number(b.item.flightsWeight) - Number(a.item.flightsWeight);
    })
    .map((record) => {
      return { ...record.item, type: "airport" };
    });

  const cityResults = getMultiairportCities(searchResults, cities);
  return getMergedAndFormattedResults(searchResults, cityResults);
};

export const getMultiairportCities = (searchResults: SearchAirport[], cities: SearchCity[]): SearchCity[] => {
  const cityCodes = searchResults
    .filter((record) => record.cityCode !== record.iataCode)
    .map((record) => record.cityCode);

  return uniqBy(
    cities
      .filter((city) => cityCodes.includes(city.cityCode))
      .map((city) => {
        return { ...city, type: "city" };
      }),
    "cityCode",
  );
};

export const getMergedAndFormattedResults = (airports: SearchAirport[], cities: SearchCity[]): Airport[] => {
  if (!cities.length) {
    return airports.map((record) => {
      return {
        key: `${record.iataCode}-airport`,
        label: record.iataCode,
        name: record.displayName,
        location: record.displayLocation,
        value: record.iataCode,
        type: "airport",
      };
    });
  }

  let cityCodesToAdd = cities.map((city) => city.cityCode);
  const results = [];
  for (let i = 0; i < airports.length; i++) {
    const airport = airports[i];
    if (cityCodesToAdd.includes(airport.cityCode)) {
      const city = cities.filter((city) => city.cityCode === airport.cityCode)[0];
      results.push({
        key: `${city.cityCode}-city`,
        label: city.cityCode,
        name: city.displayName,
        location: city.displayLocation,
        value: city.cityCode,
        type: "city",
      });
      cityCodesToAdd = cityCodesToAdd.filter((code) => code !== city.cityCode);
    }
    results.push({
      key: `${airport.iataCode}-airport`,
      label: airport.iataCode,
      name: airport.displayName,
      location: airport.displayLocation,
      value: airport.iataCode,
      type: "airport",
    });
  }
  return results;
};

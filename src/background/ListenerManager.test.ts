import { ProviderManager } from "./ProviderManager";

jest.mock("./eventHandlers", () => ({
  handleFormDataReceived: jest.fn(),
  handleNoFlightsFound: jest.fn(),
  handleScraperSuccess: jest.fn(),
  handleScraperStarting: jest.fn(),
  handleScraperFailed: jest.fn(),
  handleItineraryResultsReceived: jest.fn(),
  handleTripSelected: jest.fn(),
  handleItineraryNotFound: jest.fn(),
  handleProviderReady: jest.fn(),
  handleFocusWebpage: jest.fn(),
  handleClearSelections: jest.fn(),
  handleIndexUnloaded: jest.fn(),
  handleUpdateRequest: jest.fn(),
  handleLogAnalyticsEvent: jest.fn(),
  handleLogAnalyticsUserIdentified: jest.fn(),
  handleLogAnalyticsPageView: jest.fn(),
  handleOpenExtensionRequest: jest.fn(),
  handleUndominateTrip: jest.fn(),
}));
jest.mock("./ProviderManager");
jest.mock("./AnalyticsManager");

import * as browser from "webextension-polyfill";

import { AnalyticsManager } from "./AnalyticsManager";
import {
  handleClearSelections,
  handleFocusWebpage,
  handleFormDataReceived,
  handleIndexUnloaded,
  handleItineraryNotFound,
  handleItineraryResultsReceived,
  handleLogAnalyticsEvent,
  handleLogAnalyticsPageView,
  handleLogAnalyticsUserIdentified,
  handleNoFlightsFound,
  handleOpenExtensionRequest,
  handleProviderReady,
  handleScraperFailed,
  handleScraperStarting,
  handleScraperSuccess,
  handleTripSelected,
  handleUndominateTrip,
  handleUpdateRequest,
} from "./eventHandlers";
import { ListenerManager } from "./ListenerManager";

describe("Listener events", () => {
  beforeAll(() => {
    const providerManager = new ProviderManager();
    const analyticsManager = new AnalyticsManager("", false);
    ListenerManager(providerManager, analyticsManager);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("works with FORM_DATA_RECEIVED", () => {
    const message = {
      event: "FORM_DATA_RECEIVED",
      formData: { cat: "meow" },
      windowConfig: { dog: "woof" },
    };
    browser.runtime.sendMessage(message);
    expect(handleFormDataReceived).toHaveBeenCalledTimes(1);
    expect(handleFormDataReceived).toHaveBeenCalledWith(expect.anything(), { cat: "meow" }, { dog: "woof" });
  });

  it("works with NO_FLIGHTS_FOUND", () => {
    const message = {
      event: "NO_FLIGHTS_FOUND",
      provider: "NoFunFlights",
    };
    browser.runtime.sendMessage(message);
    expect(handleNoFlightsFound).toHaveBeenCalledTimes(1);
    expect(handleNoFlightsFound).toHaveBeenCalledWith(expect.anything(), "NoFunFlights");
  });

  it("works with SUCCESSFUL_SCRAPER", () => {
    const message = {
      event: "SUCCESSFUL_SCRAPER",
      providerName: "SuccessSearch",
    };
    browser.runtime.sendMessage(message);
    expect(handleScraperSuccess).toHaveBeenCalledTimes(1);
    expect(handleScraperSuccess).toHaveBeenCalledWith(expect.anything(), "SuccessSearch");
  });

  it("works with STARTING_SCRAPER", () => {
    const message = {
      event: "STARTING_SCRAPER",
      providerName: "StartSearch",
    };
    browser.runtime.sendMessage(message);
    expect(handleScraperStarting).toHaveBeenCalledTimes(1);
    expect(handleScraperStarting).toHaveBeenCalledWith(expect.anything(), "StartSearch");
  });

  it("works with FAILED_SCRAPER", () => {
    const message = {
      event: "FAILED_SCRAPER",
      providerName: "FailplaneSearch",
    };
    browser.runtime.sendMessage(message);
    expect(handleScraperFailed).toHaveBeenCalledTimes(1);
    expect(handleScraperFailed).toHaveBeenCalledWith(expect.anything(), "FailplaneSearch");
  });

  it("works with ITINERARY_RESULTS", () => {
    const message = {
      event: "ITINERARY_RESULTS",
      itineraries: ["cat", "dog", "bird"],
      provider: "ResultsSearch",
    };
    browser.runtime.sendMessage(message);
    expect(handleItineraryResultsReceived).toHaveBeenCalledTimes(1);
    expect(handleItineraryResultsReceived).toHaveBeenCalledWith(
      expect.anything(),
      ["cat", "dog", "bird"],
      "ResultsSearch",
    );
  });

  it("works with TRIP_SELECTED", () => {
    const message = {
      event: "TRIP_SELECTED",
      selectedTrips: [1, 2, 3],
    };
    browser.runtime.sendMessage(message);
    expect(handleTripSelected).toHaveBeenCalledTimes(1);
    expect(handleTripSelected).toHaveBeenCalledWith(expect.anything(), [1, 2, 3]);
  });

  it("works with ITINERARY_NOT_FOUND", () => {
    const message = {
      event: "ITINERARY_NOT_FOUND",
      id: "IAmBlind",
    };
    browser.runtime.sendMessage(message);
    expect(handleItineraryNotFound).toHaveBeenCalledTimes(1);
    expect(handleItineraryNotFound).toHaveBeenCalledWith(expect.anything(), "IAmBlind");
  });

  it("works with PROVIDER_READY", () => {
    const message = {
      event: "PROVIDER_READY",
      provider: "ReadySteadyGo",
    };
    browser.runtime.sendMessage(message);
    expect(handleProviderReady).toHaveBeenCalledTimes(1);
    expect(handleProviderReady).toHaveBeenCalledWith(expect.anything(), "ReadySteadyGo");
  });

  it("works with FOCUS_WEBPAGE", () => {
    const message = {
      event: "FOCUS_WEBPAGE",
    };
    browser.runtime.sendMessage(message);
    expect(handleFocusWebpage).toHaveBeenCalledTimes(1);
    expect(handleFocusWebpage).toHaveBeenCalledWith(expect.anything());
  });

  it("works with CLEAR_SELECTIONS", () => {
    const message = {
      event: "CLEAR_SELECTIONS",
      currentSelections: [2, 3, 5],
    };
    browser.runtime.sendMessage(message);
    expect(handleClearSelections).toHaveBeenCalledTimes(1);
    expect(handleClearSelections).toHaveBeenCalledWith(expect.anything(), [2, 3, 5]);
  });

  it("works with INDEX_UNLOAD", () => {
    const message = {
      event: "INDEX_UNLOAD",
    };
    browser.runtime.sendMessage(message);
    expect(handleIndexUnloaded).toHaveBeenCalledTimes(1);
    expect(handleIndexUnloaded).toHaveBeenCalledWith(expect.anything());
  });

  it("works with UPDATE_NOW", () => {
    const message = {
      event: "UPDATE_NOW",
    };
    browser.runtime.sendMessage(message);
    expect(handleUpdateRequest).toHaveBeenCalledTimes(1);
  });

  it("works with LOG_ANALYTICS_EVENT", () => {
    const message = {
      event: "LOG_ANALYTICS_EVENT",
      cat: "meow",
      dog: "woof",
    };
    browser.runtime.sendMessage(message);
    expect(handleLogAnalyticsEvent).toHaveBeenCalledTimes(1);
    expect(handleLogAnalyticsEvent).toHaveBeenCalledWith(expect.anything(), message);
  });

  it("works with LOG_ANALYTICS_USER_IDENTIFIED", () => {
    const message = {
      event: "LOG_ANALYTICS_USER_IDENTIFIED",
      cat: "meow",
      dog: "woof",
    };
    browser.runtime.sendMessage(message);
    expect(handleLogAnalyticsUserIdentified).toHaveBeenCalledTimes(1);
    expect(handleLogAnalyticsUserIdentified).toHaveBeenCalledWith(expect.anything(), message);
  });

  it("works with LOG_ANALYTICS_PAGE_VIEW", () => {
    const message = {
      event: "LOG_ANALYTICS_PAGE_VIEW",
      cat: "meow",
      dog: "woof",
    };
    browser.runtime.sendMessage(message);
    expect(handleLogAnalyticsPageView).toHaveBeenCalledTimes(1);
    expect(handleLogAnalyticsPageView).toHaveBeenCalledWith(expect.anything(), message);
  });

  it("works with OPEN_EXTENSION", () => {
    const message = {
      event: "OPEN_EXTENSION",
    };
    browser.runtime.sendMessage(message);
    expect(handleOpenExtensionRequest).toHaveBeenCalledTimes(1);
    expect(handleOpenExtensionRequest).toHaveBeenCalledWith(undefined);
  });

  it("works with UNDOMINATE_TRIP", () => {
    const message = {
      event: "UNDOMINATE_TRIP",
      tripId: "meow",
    };
    browser.runtime.sendMessage(message);
    expect(handleUndominateTrip).toHaveBeenCalledTimes(1);
    expect(handleUndominateTrip).toHaveBeenCalledWith(expect.anything(), "meow");
  });
});

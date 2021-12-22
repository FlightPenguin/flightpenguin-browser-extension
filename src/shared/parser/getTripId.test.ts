import { getTripId } from "./getTripId";

describe("getTripId happy path", () => {
  it("works with departure", () => {
    const value = getTripId({
      departureFlight: {
        arrivalTime: "10:45am+1",
        departureTime: "9:31pm",
        airlineName: "Penguin Air, Chipmunk Air",
      },
      returnFlight: null,
    });
    expect(value).toEqual("9:31pm-10:45am+1-Penguin Air, Chipmunk Air");
  });

  it("works with roundtrip", () => {
    const value = getTripId({
      departureFlight: {
        arrivalTime: "10:45am+1",
        departureTime: "9:31pm",
        airlineName: "Penguin Air, Chipmunk Air",
      },
      returnFlight: {
        arrivalTime: "2:15pm",
        departureTime: "9:09am",
        airlineName: "Penguin Air, Chipmunk Air",
      },
    });
    expect(value).toEqual("9:31pm-10:45am+1-Penguin Air, Chipmunk Air-9:09am-2:15pm-Penguin Air, Chipmunk Air");
  });
});

describe("getTripId error path", () => {
  it("dies with invalid departureFlight departure input", () => {
    expect(() => {
      getTripId({
        departureFlight: {
          arrivalTime: "10:45am+1",
          departureTime: "",
          airlineName: "Penguin Air, Chipmunk Air",
        },
        returnFlight: {
          arrivalTime: "2:15pm",
          departureTime: "9:09am",
          airlineName: "Penguin Air, Chipmunk Air",
        },
      });
    }).toThrow("Invalid input for getTripId");
  });

  it("dies with invalid departureFlightarrival input", () => {
    expect(() => {
      getTripId({
        departureFlight: {
          arrivalTime: "",
          departureTime: "9:31pm",
          airlineName: "Penguin Air, Chipmunk Air",
        },
        returnFlight: {
          arrivalTime: "2:15pm",
          departureTime: "9:09am",
          airlineName: "Penguin Air, Chipmunk Air",
        },
      });
    }).toThrow("Invalid input for getTripId");
  });

  it("dies with invalid departureFlight airline name input", () => {
    expect(() => {
      getTripId({
        departureFlight: {
          arrivalTime: "10:45am+1",
          departureTime: "9:31pm",
          airlineName: "",
        },
        returnFlight: {
          arrivalTime: "2:15pm",
          departureTime: "9:09am",
          airlineName: "Penguin Air, Chipmunk Air",
        },
      });
    }).toThrow("Invalid input for getTripId");
  });

  it("dies with invalid returnFlight departure input", () => {
    expect(() => {
      getTripId({
        departureFlight: {
          arrivalTime: "10:45am+1",
          departureTime: "9:31pm",
          airlineName: "Penguin Air, Chipmunk Air",
        },
        returnFlight: {
          arrivalTime: "2:15pm",
          departureTime: "",
          airlineName: "Penguin Air, Chipmunk Air",
        },
      });
    }).toThrow("Invalid input for getTripId");
  });

  it("dies with invalid returnFlight arrival input", () => {
    expect(() => {
      getTripId({
        departureFlight: {
          arrivalTime: "",
          departureTime: "9:31pm",
          airlineName: "Penguin Air, Chipmunk Air",
        },
        returnFlight: {
          arrivalTime: "",
          departureTime: "9:09am",
          airlineName: "Penguin Air, Chipmunk Air",
        },
      });
    }).toThrow("Invalid input for getTripId");
  });

  it("dies with invalid returnFlight airline name input", () => {
    expect(() => {
      getTripId({
        departureFlight: {
          arrivalTime: "10:45am+1",
          departureTime: "9:31pm",
          airlineName: "Penguin Air, Chipmunk Air",
        },
        returnFlight: {
          arrivalTime: "2:15pm",
          departureTime: "9:09am",
          airlineName: "",
        },
      });
    }).toThrow("Invalid input for getTripId");
  });
});

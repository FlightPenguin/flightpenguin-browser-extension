import { getFlightId } from "./getFlightId";

describe("getFlightId happy path", () => {
  it("works", () => {
    const value = getFlightId({
      arrivalTime: "10:45am+1",
      departureTime: "9:31pm",
      airlineName: "Penguin Air, Chipmunk Air",
    });
    expect(value).toEqual("9:31pm-10:45am+1-Penguin Air, Chipmunk Air");
  });
});

describe("getFlightId error path", () => {
  it("dies with invalid departure input", () => {
    expect(() => {
      getFlightId({
        arrivalTime: "10:45am+1",
        departureTime: "",
        airlineName: "Penguin Air, Chipmunk Air",
      });
    }).toThrow("Invalid flight id input");
  });

  it("dies with invalid arrival input", () => {
    expect(() => {
      getFlightId({
        arrivalTime: "10:45am+1",
        departureTime: "",
        airlineName: "Penguin Air, Chipmunk Air",
      });
    }).toThrow("Invalid flight id input");
  });

  it("dies with invalid airline name input", () => {
    expect(() => {
      getFlightId({
        arrivalTime: "10:45am+1",
        departureTime: "9:31pm",
        airlineName: "",
      });
    }).toThrow("Invalid flight id input");
  });
});

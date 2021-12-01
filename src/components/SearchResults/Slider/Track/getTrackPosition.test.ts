import { getTrackPosition } from "./getTrackPosition";

describe("getTrackPosition happy path tests", () => {
  describe("first track (index 0)", () => {
    describe("happy path", () => {
      it("default", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 0,
          flightTimeContainerWidth: 1117,
          value: [0, 32],
        });
        expect(value).toMatchObject({ left: 0, right: 1117 });
      });

      it("left moved", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 0,
          flightTimeContainerWidth: 1117,
          value: [1, 32],
        });
        expect(value).toMatchObject({ left: 0, right: 1082.09 });
      });

      it("right moved", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 0,
          flightTimeContainerWidth: 1117,
          value: [0, 31],
        });
        expect(value).toMatchObject({ left: 0, right: 1117 });
      });

      it("both moved", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 0,
          flightTimeContainerWidth: 1117,
          value: [5, 27],
        });
        expect(value).toMatchObject({ left: 0, right: 942.47 });
      });
    });

    describe("range limits apply", () => {
      it("outside right range", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 0,
          flightTimeContainerWidth: 1117,
          value: [0, 33],
        });
        expect(value).toMatchObject({ left: 0, right: 1117 });
      });

      it("outside left range", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 0,
          flightTimeContainerWidth: 1117,
          value: [-1, 32],
        });
        expect(value).toMatchObject({ left: 0, right: 1117 });
      });
    });
  });

  describe("second track (index 1)", () => {
    describe("happy path", () => {
      it("default", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 1,
          flightTimeContainerWidth: 1117,
          value: [0, 32],
        });
        expect(value).toMatchObject({ left: 0, right: 0 });
      });

      it("left moved", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 1,
          flightTimeContainerWidth: 1117,
          value: [1, 32],
        });
        expect(value).toMatchObject({ left: 34.91, right: 0 });
      });

      it("right moved", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 1,
          flightTimeContainerWidth: 1117,
          value: [0, 31],
        });
        expect(value).toMatchObject({ left: 0, right: 34.91 });
      });

      it("both moved", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 1,
          flightTimeContainerWidth: 1117,
          value: [5, 27],
        });
        expect(value).toMatchObject({ left: 174.53, right: 174.53 });
      });
    });

    describe("range limits apply", () => {
      it("outside right range", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 1,
          flightTimeContainerWidth: 1117,
          value: [0, 33],
        });
        expect(value).toMatchObject({ left: 0, right: 0 });
      });

      it("outside left range", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 1,
          flightTimeContainerWidth: 1117,
          value: [-1, 32],
        });
        expect(value).toMatchObject({ left: 0, right: 0 });
      });
    });
  });

  describe("third track (index 2)", () => {
    describe("happy path", () => {
      it("default", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 2,
          flightTimeContainerWidth: 1117,
          value: [0, 32],
        });
        expect(value).toMatchObject({ left: 1117, right: 0 });
      });

      it("left moved", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 2,
          flightTimeContainerWidth: 1117,
          value: [1, 32],
        });
        expect(value).toMatchObject({ left: 1117, right: 0 });
      });

      it("right moved", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 2,
          flightTimeContainerWidth: 1117,
          value: [0, 31],
        });
        expect(value).toMatchObject({ left: 1082.09, right: 0 });
      });

      it("both moved", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 2,
          flightTimeContainerWidth: 1117,
          value: [5, 27],
        });
        expect(value).toMatchObject({ left: 942.47, right: 0 });
      });
    });

    describe("range limits apply", () => {
      it("outside right range", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 2,
          flightTimeContainerWidth: 1117,
          value: [0, 33],
        });
        expect(value).toMatchObject({ left: 1117, right: 0 });
      });

      it("outside left range", () => {
        const value = getTrackPosition({
          intervals: [0, 4, 8],
          index: 2,
          flightTimeContainerWidth: 1117,
          value: [-1, 32],
        });
        expect(value).toMatchObject({ left: 1117, right: 0 });
      });
    });
  });
});

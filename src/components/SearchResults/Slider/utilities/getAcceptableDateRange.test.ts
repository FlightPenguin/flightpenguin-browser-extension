import { getAcceptableDateRange } from "./getAcceptableDateRange";

const defaultDate = new Date(2020, 5, 13, 0, 0, 0, 0);

describe("getAcceptableDateRange happy path tests", () => {
  it("intervals starts with zero", () => {
    const value = getAcceptableDateRange({ intervals: [0, 4, 8], startDate: defaultDate, timezoneOffset: 0 });
    const expectedMinimumDate = new Date(defaultDate);
    const expectedMaximumDate = new Date(defaultDate);
    expectedMaximumDate.setHours(8);
    expect(value).toMatchObject({ minimumDate: expectedMinimumDate, maximumDate: expectedMaximumDate });
  });

  it("interval starts with number > 0", () => {
    const value = getAcceptableDateRange({ intervals: [2, 4, 6], startDate: defaultDate, timezoneOffset: 0 });
    const expectedMinimumDate = new Date(defaultDate);
    expectedMinimumDate.setHours(2);
    const expectedMaximumDate = new Date(defaultDate);
    expectedMaximumDate.setHours(6);
    expect(value).toMatchObject({ minimumDate: expectedMinimumDate, maximumDate: expectedMaximumDate });
  });

  it("intervals too short", () => {
    const value = getAcceptableDateRange({ intervals: [], startDate: defaultDate, timezoneOffset: 0 });
    const expectedMinimumDate = new Date(defaultDate);
    const expectedMaximumDate = new Date(defaultDate);
    expect(value).toMatchObject({ minimumDate: expectedMinimumDate, maximumDate: expectedMaximumDate });
  });

  it("has positive timezone offset", () => {
    const value = getAcceptableDateRange({ intervals: [0, 2, 4, 6], startDate: defaultDate, timezoneOffset: 60 });
    const expectedMinimumDate = new Date(defaultDate);
    const expectedMaximumDate = new Date(defaultDate);
    expectedMaximumDate.setHours(7);
    expect(value).toMatchObject({ minimumDate: expectedMinimumDate, maximumDate: expectedMaximumDate });
  });

  it("has negative timezone offset", () => {
    const value = getAcceptableDateRange({ intervals: [0, 2, 4, 6], startDate: defaultDate, timezoneOffset: -60 });
    const expectedMinimumDate = new Date(defaultDate);
    const expectedMaximumDate = new Date(defaultDate);
    expectedMaximumDate.setHours(5);
    expect(value).toMatchObject({ minimumDate: expectedMinimumDate, maximumDate: expectedMaximumDate });
  });
});

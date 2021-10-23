import { format } from "date-fns-tz";

import { parseSouthwestDateWithTimezone } from "./parseSouthwestDateWithTimezone";

describe("parseSouthwestDateWithTimeZone happy path", () => {
  it("works with negative timezones", () => {
    const value = parseSouthwestDateWithTimezone({ rawDate: "2021-11-07T11:45:00.000-08:00" });
    expect(format(value, "yyyy-MM-dd hh:mmaaa")).toEqual("2021-11-07 11:45am");
  });

  it("works with positive timezones", () => {
    const value = parseSouthwestDateWithTimezone({ rawDate: "2021-11-07T12:00:00.000+05:00" });
    expect(format(value, "yyyy-MM-dd hh:mmaaa")).toEqual("2021-11-07 12:00pm");
  });
});

describe("parseSouthwestDateWithTimeZone errors", () => {
  it("no timezones", () => {
    expect(() => {
      parseSouthwestDateWithTimezone({ rawDate: "2021-11-07T12:00:00.000" });
    }).toThrow(TypeError);
  });
});

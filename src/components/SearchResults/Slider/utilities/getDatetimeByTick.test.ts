import { parseISO } from "date-fns";

import { getDatetimeByTick } from "./getDatetimeByTick";

describe("getDatetimeByTick happy path tests", () => {
  it("works", () => {
    const startDate = new Date(2020, 0, 3, 0, 0, 0, 0);
    const results = getDatetimeByTick({ startDate, value: 4 });
    expect(results).toMatchObject({
      datetime: new Date(2020, 0, 3, 1, 0, 0, 0),
      formattedDate: "01/03/2020",
      formattedTime: "1:00am",
      formattedDatetime: "01/03/2020 1:00am",
    });
  });
});

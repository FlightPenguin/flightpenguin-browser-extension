import { getEmailHash } from "./getEmailHash";

describe("getEmailHash happy path", () => {
  it("works", async () => {
    const value = await getEmailHash({ email: "max@flightpenguin.com" });
    expect(value).toEqual("0d56443792b0557ea6041c3bde8019d858d43ea6175e6f697f055a1f67eeddb9");
  });
});

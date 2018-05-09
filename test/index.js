import { assert } from "chai";
import fetchMock from "fetch-mock";
import getStatus from "../src/getStatus";

describe("Get status", () => {
  before(() => {
    fetchMock.post("https://example.org", {
      data: {
        user: {
          statusText: "Scoping",
          statusEmoji: ":page_facing_up:",
          __typename: "User"
        }
      }
    });
  });
  it("should get a status", async () => {
    return getStatus({ id: "U2NK19J0L" }).then(data => {
      assert(data.user && data.user.statusEmoji && data.user.statusText);
    });
  });
  after(() => {
    fetchMock.restore();
  });
});

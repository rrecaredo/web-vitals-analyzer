/**
 * @jest-environment @dynatrace/runtime-simulator/lib/test-environment
 */

import getTenants from "./get-tenants";

describe("get-tenants", () => {
  it("should return an object with a message property", async () => {
    const result = await getTenants();
    expect(result).toEqual({
      data: [
        {
          applications: [
            {
              id: "APPLICATION-XXXXXXXXXXXXX",
              name: "Foobar logistics",
              pages: [
                "/login/otp",
                "/enrol/fidelity",
                "/enrol/compare",
                "/login/page-not-found",
                "/login/",
                "/security-profile/update-password",
                "/login/recover",
                "/login/account",
                "/login/undefined",
                "/enrol/page-not-found",
              ],
            },
          ],
          id: "xxx00000",
          name: "Foobar INC",
        },
      ],
      status: 200,
    });
  });
});

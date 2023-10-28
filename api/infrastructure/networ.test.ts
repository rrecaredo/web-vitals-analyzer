/**
 * @jest-environment @dynatrace/runtime-simulator/lib/test-environment
 */

import { evaluateAndReturn, ResponseType, Success, Failure } from "./network";

describe("evaluateAndReturn function", () => {
  const successfulExecution = async () => {
    return "Success Data";
  };

  const failingExecution = async () => {
    throw new Error("Something went wrong");
  };

  it("should return a Success ResponseType when execution succeeds", async () => {
    const result: ResponseType<string> = await evaluateAndReturn(
      successfulExecution,
      "Resource"
    );

    const expectedResponse: Success<string> = {
      status: 200,
      data: "Success Data",
    };

    expect(result).toEqual(expectedResponse);
  });

  it("should return a Failure ResponseType when execution fails", async () => {
    const result: ResponseType<string> = await evaluateAndReturn(
      failingExecution,
      "Resource"
    );

    const expectedResponse: Failure = {
      status: 500,
      error: "Unable to retrieve Resource, Something went wrong",
    };

    expect(result).toEqual(expectedResponse);
  });
});

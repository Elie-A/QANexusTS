import { assertIsNumber } from "../src/assertions/utils/AssertionHelper";
import { AssertionException } from "../src/assertions/utils/AssertionException";

describe("assertIsNumber", () => {
  it("should not throw an exception for valid numbers", () => {
    expect(() => assertIsNumber(42, "This should be a number")).not.toThrow();
    expect(() => assertIsNumber(3.14, "This should be a number")).not.toThrow();

    assertIsNumber("1");
  });

  it("should throw AssertionException for invalid numbers", () => {
    // Expecting AssertionException for each invalid case
    expect(() => assertIsNumber("string", "This should be a number")).toThrow(
      AssertionException
    );
    expect(() => assertIsNumber([], "This should be a number")).toThrow(
      AssertionException
    );
    expect(() => assertIsNumber({}, "This should be a number")).toThrow(
      AssertionException
    );
    expect(() => assertIsNumber(true, "This should be a number")).toThrow(
      AssertionException
    );
    expect(() => assertIsNumber(null, "This should be a number")).toThrow(
      AssertionException
    );
    expect(() => assertIsNumber(undefined, "This should be a number")).toThrow(
      AssertionException
    );
  });

  it("should include the provided message in the exception", () => {
    try {
      assertIsNumber([], "Expected a number");
    } catch (e) {
      // Verify that the exception is of type AssertionException
      if (e instanceof AssertionException) {
        // Verify that the exception message contains the provided message
        expect(e.message).toContain("Expected a number");
      } else {
        // If it's not an AssertionException, fail the test
        throw e;
      }
    }
  });
});

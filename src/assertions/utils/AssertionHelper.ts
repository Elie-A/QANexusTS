import { AssertionException } from "./AssertionException";

/**
 * Asserts that the provided object is a number. If not, throws an AssertionException.
 *
 * @param obj The object to be checked.
 * @param message Optional message to be used for the exception. If not provided, a default message will be used.
 */
export function assertIsNumber(
  obj: any,
  message: string = `Expected a number but received ${typeof obj}`
): void {
  // Check if the object is not a number
  if (typeof obj !== "number" || Number.isNaN(obj)) {
    // Throw AssertionException with the provided or default message
    throw new AssertionException(message);
  }
}

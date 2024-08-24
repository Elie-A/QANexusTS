import { Constants } from "../constants/Constants";

/**
 * Custom runtime exception used for assertions in the QA Nexus application.
 * This exception is intended to be thrown when an assertion fails.
 * The exception message will be formatted with a predefined color specified in Constants.
 */
export class AssertionException extends Error {
  /**
   * Constructs a new AssertionException with the specified detail message.
   * The message is prefixed and suffixed with color codes from Constants
   * to highlight the error in the console output.
   *
   * @param message The detail message to be used for this exception. This message is formatted with color codes.
   */
  constructor(message: string) {
    // Prefix and suffix the message with color codes from Constants
    super(
      `${Constants.RED_CONSOLE_COLOR}${message}${Constants.DEFAULT_CONSOLE_COLOR}`
    );

    // Set the name property to the name of the class
    this.name = "AssertionException";
  }
}

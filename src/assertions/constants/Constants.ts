/**
 * Contains console color codes used for formatting text output in the QA Nexus Assertion application.
 *
 * This module provides constants for color codes that can be used to modify the appearance of text
 * in the console. The color codes are ANSI escape codes used to change text color and reset formatting.
 */
export class Constants {
  // ANSI escape code for resetting console color to default.
  public static readonly DEFAULT_CONSOLE_COLOR: string = "\x1b[0m";

  // ANSI escape code for setting console text color to red.
  public static readonly RED_CONSOLE_COLOR: string = "\x1b[31m";
}

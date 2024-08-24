/**
 * Contains constant values used for data generation in the QA Nexus Data Generator application.
 *
 * This class provides static readonly constants that are used for generating alphanumeric strings, default domain values,
 * and specifying default lengths for strings and email usernames.
 */
export class Constants {
  /**
   * A string containing all alphanumeric characters and a hyphen.
   *
   * This constant is used for generating random alphanumeric strings, including both uppercase and lowercase letters,
   * digits, and the hyphen character.
   */
  public static readonly ALPHA_NUM: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";

  /**
   * The default domain used for generating email addresses.
   *
   * This constant provides a default domain suffix to be appended to generated email usernames.
   */
  public static readonly DEFAULT_DOMAIN: string = "@defaultDomain.com";

  /**
   * The default length for generated strings.
   *
   * This constant specifies the default number of characters in generated strings when no specific length is provided.
   */
  public static readonly DEFAULT_STRING_LENGTH: number = 10;

  /**
   * The default length for generated email usernames.
   *
   * This constant specifies the default number of characters for the username part of generated email addresses.
   */
  public static readonly DEFAULT_EMAIL_USERNAME_LENGTH: number = 10;
}

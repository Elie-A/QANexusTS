import { CountryCodePhoneNumberPatternEnum } from "../enums/CountryCodePhoneNumberPatternEnum";

/**
 * Utility class to handle Country Codes.
 */
export class CountryCodeUtils {
  /**
   * Retrieves an array of country codes from the CountryCodePhoneNumberPatternEnum.
   *
   * This method returns all the country codes defined in the CountryCodePhoneNumberPatternEnum.
   * Each key in the enum represents a country code that is used for phone number patterns.
   *
   * @returns {string[]} An array of country codes.
   *
   * @example
   * const countryCodes = CountryCodeUtils.getCountryCodes();
   * console.log(countryCodes); // Outputs: ["AF", "AL", "DZ", "AD", ...]
   */
  public static getCountryCodes(): string[] {
    return Object.keys(CountryCodePhoneNumberPatternEnum);
  }
}

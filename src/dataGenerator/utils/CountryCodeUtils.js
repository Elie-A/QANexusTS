"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryCodeUtils = void 0;
const CountryCodePhoneNumberPatternEnum_1 = require("../enums/CountryCodePhoneNumberPatternEnum");
/**
 * Utility class to handle Country Codes.
 */
class CountryCodeUtils {
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
    static getCountryCodes() {
        return Object.keys(CountryCodePhoneNumberPatternEnum_1.CountryCodePhoneNumberPatternEnum);
    }
}
exports.CountryCodeUtils = CountryCodeUtils;

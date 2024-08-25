"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportedDateFormats = void 0;
/**
 * Enum representing the supported date formats.
 * Each enum member corresponds to a specific date format pattern used for formatting and parsing dates.
 */
var SupportedDateFormats;
(function (SupportedDateFormats) {
    /**
     * Date format pattern for "year-month-day" with hyphens.
     * Example: 2024-08-18
     */
    SupportedDateFormats["YYYY_MM_DD"] = "yyyy-MM-dd";
    /**
     * Date format pattern for "year/month/day" with slashes.
     * Example: 2024/08/18
     */
    SupportedDateFormats["YYYY_MM_DD_SLASH"] = "yyyy/MM/dd";
    /**
     * Date format pattern for "year-month-abbreviated-month-day" with hyphens.
     * Example: 2024-Aug-18
     */
    SupportedDateFormats["YYYY_MMM_DD"] = "yyyy-MMM-dd";
    /**
     * Date format pattern for "year/abbreviated-month/day" with slashes.
     * Example: 2024/Aug/18
     */
    SupportedDateFormats["YYYY_MMM_DD_SLASH"] = "yyyy/MMM/dd";
    /**
     * Date format pattern for "day-month-year" with hyphens.
     * Example: 18-08-2024
     */
    SupportedDateFormats["DD_MM_YYYY"] = "dd-MM-yyyy";
    /**
     * Date format pattern for "day-abbreviated-month-year" with hyphens.
     * Example: 18-Aug-2024
     */
    SupportedDateFormats["DD_MMM_YYYY"] = "dd-MMM-yyyy";
    /**
     * Date format pattern for "day/abbreviated-month/year" with slashes.
     * Example: 18/Aug/2024
     */
    SupportedDateFormats["DD_MMM_YYYY_SLASH"] = "dd/MMM/yyyy";
})(SupportedDateFormats || (exports.SupportedDateFormats = SupportedDateFormats = {}));

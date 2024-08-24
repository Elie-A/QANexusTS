import crypto from "crypto";
import RandExp from "randexp";
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from "uuid";
import { Constants } from "../constants/Constants";
import { CountryCodePhoneNumberPatternEnum } from "../enums/CountryCodePhoneNumberPatternEnum";
import { MonthsAbbreviationsEnum } from "../enums/MonthsAbbreviationsEnum";
import { SupportedDateFormats } from "../enums/SupportedDateFormats";
import { UuidType } from "../enums/UUIDEnums";

/**
 * Generates a random alphanumeric string of a specified length.
 *
 * This function creates a random string using the `crypto` module to generate
 * cryptographically strong random bytes, then maps these bytes to characters
 * from a predefined set of alphanumeric characters. The length of the generated
 * string can be specified, and if not provided, a default length is used.
 *
 * @param {number} [length=Constants.DEFAULT_STRING_LENGTH] - The length of the
 *   generated string. If not specified, defaults to `Constants.DEFAULT_STRING_LENGTH`.
 * @returns {string} The generated random alphanumeric string.
 *
 * @example
 * // Generates a random string of 10 characters
 * const randomString = generateString();
 *
 * @example
 * // Generates a random string of 16 characters
 * const randomString = generateString(16);
 */
export function generateString(
  length: number = Constants.DEFAULT_STRING_LENGTH
): string {
  const randomBytes = crypto.randomBytes(length);
  let generatedValue = "";
  for (let i = 0; i < length; i++) {
    const index = randomBytes[i] % Constants.ALPHA_NUM.length;
    generatedValue += Constants.ALPHA_NUM.charAt(index);
  }
  return generatedValue;
}

/**
 * Generates a random email address with the specified username length and domain.
 *
 * @param {string} [domain=Constants.DEFAULT_DOMAIN] - The domain to use for the email address. Defaults to `Constants.DEFAULT_DOMAIN`.
 * @param {number} [usernameLength=Constants.DEFAULT_EMAIL_USERNAME_LENGTH] - The length of the username part of the email address. Defaults to `Constants.DEFAULT_EMAIL_USERNAME_LENGTH`.
 * @returns {string} A randomly generated email address.
 */
export function generateEmail(
  domain: string = Constants.DEFAULT_DOMAIN,
  usernameLength: number = Constants.DEFAULT_EMAIL_USERNAME_LENGTH
): string {
  // Ensure `generateString` function is available in your TypeScript code
  const username = generateString(usernameLength);
  return username + "@" + domain;
}

/**
 * Generates a random phone number based on the country code pattern.
 *
 * @param countryCode The country code to generate the phone number for (optional) - default value is FR (France).
 * @returns A randomly generated phone number.
 * @throws Error if the country code is invalid.
 */
export function generatePhoneNumber(
  countryCode: keyof typeof CountryCodePhoneNumberPatternEnum = "FR"
): string {
  // Access the regex pattern from the enum
  // const phonePattern = CountryCodePhoneNumberPatternEnum[countryCode];
  const phonePattern = CountryCodePhoneNumberPatternEnum[countryCode];

  if (!phonePattern) {
    throw new Error(`Invalid country code: ${countryCode}`);
  }

  // Create a regex object from the pattern
  const regex = new RegExp(phonePattern);

  // Generate a random phone number
  const randExp = new RandExp(regex);
  const phoneNumber = randExp.gen();

  return phoneNumber;
}

/**
 * Generates a date string based on the provided format.
 * If no format is provided, the default format "yyyy-MM-dd" is used with the current date.
 *
 * @param format Optional format string to specify the desired date format.
 *               Supported placeholders include "yyyy", "yy", "MM", "MMM", and "dd".
 * @returns A date string formatted according to the provided format or the default format.
 * @throws Error if the provided format is not valid.
 */
export function generateDate(format?: string): string {
  let year: number | undefined,
    month: string | number | undefined,
    day: string | number | undefined;

  if (!format) {
    // Default format
    const currentDate = new Date();
    year = currentDate.getFullYear();
    month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    day = currentDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Type guard for SupportedDateFormats
  if (!isSupportedDateFormat(format)) {
    throw new Error(`Invalid date format: ${format}`);
  }

  // Generate random year if 'yyyy' is in format
  if (format.includes("yyyy")) {
    year = 1900 + Math.floor(Math.random() * 100);
  }

  // Generate month
  if (format.includes("MM")) {
    month = 1 + Math.floor(Math.random() * 12);
    month = month < 10 ? "0" + month : month.toString();
  } else if (format.includes("MMM")) {
    const monthKeys = Object.keys(MonthsAbbreviationsEnum) as Array<
      keyof typeof MonthsAbbreviationsEnum
    >;
    const randomIndex = Math.floor(Math.random() * monthKeys.length);
    month = MonthsAbbreviationsEnum[monthKeys[randomIndex]];
  }

  // Generate day
  if (format.includes("dd")) {
    let maxDays = 31; // Default to 31 days

    if (year && typeof month === "number") {
      maxDays = getMaxDays(month, year);
    }

    day = 1 + Math.floor(Math.random() * maxDays);
    day = day < 10 ? "0" + day : day.toString();
  }

  // Replace format placeholders with values
  const dateString = format.replace(
    /(yyyy)|(yy)|(MM)|(MMM)|(dd)/g,
    (match: string): string => {
      switch (match) {
        case "yyyy":
          return year ? String(year) : "1900"; // Default to 1900 if year is undefined
        case "yy":
          return year ? String(year).slice(-2) : "00"; // Default to '00' if year is undefined
        case "MM":
          return typeof month === "number"
            ? month.toString().padStart(2, "0")
            : (month as string);
        case "MMM":
          return typeof month === "string" ? month : "";
        case "dd":
          return day as string;
        default:
          return match;
      }
    }
  );

  return dateString;
}

/**
 * Type guard to check if a format string is a valid `SupportedDateFormats` value.
 *
 * @param format The format string to check.
 * @returns `true` if the format string is a valid `SupportedDateFormats` value; otherwise, `false`.
 */
function isSupportedDateFormat(format: string): format is SupportedDateFormats {
  return Object.values(SupportedDateFormats).includes(
    format as SupportedDateFormats
  );
}

/**
 * Determines the maximum number of days in a given month of a specific year.
 *
 * @param month The month (1-12) to check.
 * @param year The year to check for leap year status.
 * @returns The maximum number of days in the specified month.
 */
function getMaxDays(month: number, year: number): number {
  switch (month) {
    case 2:
      return isLeapYear(year) ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
}

/**
 * Determines if a given year is a leap year.
 *
 * @param year The year to check.
 * @returns `true` if the year is a leap year; otherwise, `false`.
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Generate a UUID based on the specified type.
 *
 * This method generates a UUID (Universally Unique Identifier) of the specified version.
 * The following UUID types are supported:
 *
 * - "v1": UUID based on the host ID and current time.
 * - "v3": UUID based on the MD5 hash of a namespace and a name.
 * - "v4": Randomly generated UUID.
 * - "v5": UUID based on the SHA-1 hash of a namespace and a name.
 *
 * @param type The type of UUID to generate. Must be one of "v1", "v3", "v4", or "v5".
 *             Defaults to `UuidType.V4`.
 * @param name Optional name parameter for UUID v3 and v5.
 * @param namespace Optional namespace for UUID v3 and v5.
 * @returns A string representation of the generated UUID.
 * @throws Error if an unsupported UUID type is provided.
 *
 * @example
 * generateUuid(UuidType.V1); // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
 * generateUuid(UuidType.V4); // '3d4e2fbb-7f5f-4d46-9250-27f85c44d5d6'
 * generateUuid(UuidType.V5, 'example', '12345678-1234-1234-1234-1234567890ab'); // '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
 */
export function generateUuid(
  type: UuidType = UuidType.V4,
  name?: string,
  namespace?: string
): string {
  switch (type) {
    case UuidType.V1:
      return uuidv1();
    case UuidType.V3:
      if (!name || !namespace) {
        throw new Error("Namespace and name must be provided for UUID v3");
      }
      return uuidv3(name, namespace);
    case UuidType.V4:
      return uuidv4();
    case UuidType.V5:
      if (!name || !namespace) {
        throw new Error("Namespace and name must be provided for UUID v5");
      }
      return uuidv5(name, namespace);
    default:
      throw new Error(`Unsupported UUID type: ${type}`);
  }
}

/**
 * Generates a random boolean value.
 *
 * @returns {boolean} A randomly generated boolean value.
 */
export function generateBoolean(): boolean {
  return Math.random() < 0.5;
}

/**
 * Generates random binary data of the specified length.
 *
 * @param length The length of the binary data.
 * @returns A randomly generated Uint8Array of the specified length.
 */
export function generateBinaryData(length: number): Uint8Array {
  const data = new Uint8Array(length);
  window.crypto.getRandomValues(data);
  return data;
}

/**
 * Generates a random timestamp in ISO 8601 format.
 *
 * @returns A randomly generated timestamp in ISO 8601 format.
 */
export function generateTimestamp(): string {
  const currentTime = Date.now();
  const randomMillis = Math.floor(Math.random() * 1000000000);
  const randomTime = currentTime - randomMillis;
  return new Date(randomTime).toISOString();
}

/**
 * Generates a random Unix timestamp.
 *
 * @returns A randomly generated Unix timestamp.
 */
export function generateUnixTimestamp(): number {
  return Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 1000000000);
}

/**
 * Generates a random time in the format "HH:mm:ss".
 *
 * @returns A randomly generated time.
 */
export function generateTime(): string {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Generates a random IP address in the format "X.X.X.X".
 *
 * @returns A randomly generated IP address.
 */
export function generateIpAddress(): string {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(
    Math.random() * 256
  )}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

/**
 * Generates a random IPv6 address in the format "XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX".
 *
 * @returns A randomly generated IPv6 address.
 */
export function generateIpv6Address(): string {
  const getRandomHex = () =>
    Math.floor(Math.random() * 0x10000)
      .toString(16)
      .padStart(4, "0")
      .toUpperCase();
  return `${getRandomHex()}:${getRandomHex()}:${getRandomHex()}:${getRandomHex()}:${getRandomHex()}:${getRandomHex()}:${getRandomHex()}:${getRandomHex()}`;
}

/**
 * Generates a random MAC address in the format "XX:XX:XX:XX:XX:XX".
 *
 * @returns A randomly generated MAC address.
 */
export function generateMacAddress(): string {
  return Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase()
  ).join(":");
}

/**
 * Generates a random hex color code in the format "#RRGGBB".
 *
 * @returns A randomly generated hex color code.
 */
export function generateHexColor(): string {
  const color = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")
    .toUpperCase();
  return `#${color}`;
}

/**
 * Generates a random integer between the specified minimum and maximum values (inclusive).
 *
 * @param minVal The minimum value.
 * @param maxVal The maximum value.
 * @returns A randomly generated integer between minVal and maxVal (inclusive).
 */
export function generateInt(minVal: number, maxVal: number): number {
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
}

/**
 * Generates a random float between the specified minimum and maximum values.
 *
 * @param minVal The minimum value.
 * @param maxVal The maximum value.
 * @returns A randomly generated float between minVal and maxVal.
 */
export function generateFloat(minVal: number, maxVal: number): number {
  return Math.random() * (maxVal - minVal) + minVal;
}

/**
 * Generates a random double between the specified minimum and maximum values.
 *
 * @param minVal The minimum value.
 * @param maxVal The maximum value.
 * @returns A randomly generated double between minVal and maxVal.
 */
export function generateDouble(minVal: number, maxVal: number): number {
  return Math.random() * (maxVal - minVal) + minVal;
}

/**
 * Generates a random long between the specified minimum and maximum values.
 *
 * @param minVal The minimum value.
 * @param maxVal The maximum value.
 * @returns A randomly generated long between minVal and maxVal.
 */
export function generateLong(minVal: number, maxVal: number): number {
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
}

/**
 * Generates a random byte.
 *
 * @returns A randomly generated byte.
 */
export function generateByte(): number {
  return Math.floor(Math.random() * 256);
}

/**
 * Generates a random byte array of the specified length.
 *
 * @param length The length of the byte array.
 * @returns A randomly generated Uint8Array.
 */
export function generateByteArray(length: number): Uint8Array {
  const data = new Uint8Array(length);
  window.crypto.getRandomValues(data);
  return data;
}

/**
 * Checks if a given number is a prime number.
 *
 * A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.
 * This function checks for primality by testing divisibility from 2 up to the square root of the number.
 *
 * @param num The number to check for primality. Should be a non-negative integer.
 * @returns `true` if the number is prime, `false` otherwise.
 *
 * @example
 * ```
 * isPrime(2); // true
 * isPrime(4); // false
 * isPrime(17); // true
 * ```
 */
export function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

/**
 * Generates a random short between the specified minimum and maximum values (inclusive).
 *
 * @param minVal The minimum value.
 * @param maxVal The maximum value.
 * @returns A randomly generated short between minVal and maxVal (inclusive).
 */
export function generateShort(minVal: number, maxVal: number): number {
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
}

/**
 * Generates a random char between the specified minimum and maximum values (inclusive).
 *
 * @param minVal The minimum char value.
 * @param maxVal The maximum char value.
 * @returns A randomly generated char between minVal and maxVal (inclusive).
 */
export function generateChar(minVal: string, maxVal: string): string {
  return String.fromCharCode(
    Math.floor(
      Math.random() * (maxVal.charCodeAt(0) - minVal.charCodeAt(0) + 1)
    ) + minVal.charCodeAt(0)
  );
}

/**
 * Generates a random hex string of the specified length.
 *
 * @param length The length of the hex string.
 * @returns A randomly generated hex string.
 */
export function generateHex(length: number): string {
  return Array.from({ length })
    .map(() =>
      Math.floor(Math.random() * 16)
        .toString(16)
        .toUpperCase()
    )
    .join("");
}

/**
 * Generates a random Gaussian distributed value.
 *
 * @param mean The mean of the distribution.
 * @param standardDeviation The standard deviation of the distribution.
 * @returns A randomly generated Gaussian distributed value.
 */
export function generateGaussian(
  mean: number,
  standardDeviation: number
): number {
  const u = 1 - Math.random(); // Uniform(0,1) random variable
  const v = 1 - Math.random(); // Uniform(0,1) random variable
  const z = Math.sqrt(-2 * Math.log(u)) * Math.sin(2 * Math.PI * v); // Box-Muller transform
  return mean + standardDeviation * z;
}

/**
 * Generates a random integer based on a custom distribution.
 *
 * @param probabilities An array of probabilities for each integer.
 * @returns A randomly generated integer based on the given probabilities.
 */
export function generateRandomWithCustomDistribution(
  probabilities: number[]
): number {
  const randomValue = Math.random();
  let cumulativeProbability = 0;
  for (let i = 0; i < probabilities.length; i++) {
    cumulativeProbability += probabilities[i];
    if (randomValue < cumulativeProbability) {
      return i;
    }
  }
  return probabilities.length - 1;
}

/**
 * Generates a random prime number between the specified minimum and maximum values.
 *
 * @param minVal The minimum value.
 * @param maxVal The maximum value.
 * @returns A randomly generated prime number between minVal and maxVal.
 */
export function generateRandomPrime(minVal: number, maxVal: number): number {
  let num = generateShort(minVal, maxVal);
  while (!isPrime(num)) {
    num = generateShort(minVal, maxVal);
  }
  return num;
}

/**
 * Generates a random percentage between 0 and 100.
 *
 * @returns A randomly generated percentage.
 */
export function generateRandomPercentage(): number {
  return Math.random() * 100;
}

/**
 * Generates a random integer from a given set of integers.
 *
 * @param s An array of integers.
 * @returns A randomly selected integer from the given set.
 */
export function generateRandomFromSet(s: number[]): number {
  return s[Math.floor(Math.random() * s.length)];
}

/**
 * Generates a random even integer between the specified minimum and maximum values.
 *
 * @param minVal The minimum value.
 * @param maxVal The maximum value.
 * @returns A randomly generated even integer between minVal and maxVal.
 */
export function generateRandomEven(minVal: number, maxVal: number): number {
  let num = generateShort(minVal, maxVal);
  if (num % 2 !== 0) {
    num += 1;
  }
  return num;
}

/**
 * Generates a random odd integer between the specified minimum and maximum values.
 *
 * @param minVal The minimum value.
 * @param maxVal The maximum value.
 * @returns A randomly generated odd integer between minVal and maxVal.
 */
export function generateRandomOdd(minVal: number, maxVal: number): number {
  let num = generateShort(minVal, maxVal);
  if (num % 2 === 0) {
    num += 1;
  }
  return num;
}

/**
 * Generates a unique random sequence of integers.
 *
 * @param minVal The minimum value.
 * @param maxVal The maximum value.
 * @param length The length of the sequence.
 * @returns An array containing a unique random sequence of integers.
 */
export function generateUniqueRandomSequence(
  minVal: number,
  maxVal: number,
  length: number
): number[] {
  if (length > maxVal - minVal + 1) {
    throw new Error("Sequence length exceeds the range size.");
  }
  const numbers = Array.from(
    { length: maxVal - minVal + 1 },
    (_, i) => i + minVal
  );
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // Swap
  }
  return numbers.slice(0, length);
}

/**
 * Generates a random value based on an exponential distribution.
 *
 * @param lambdaVal The rate parameter of the distribution.
 * @returns A randomly generated value based on the exponential distribution.
 */
export function generateRandomExponential(lambdaVal: number): number {
  return -Math.log(1 - Math.random()) / lambdaVal;
}

/**
 * Generates a random complex number with real and imaginary parts within specified ranges.
 *
 * @param realMin The minimum value for the real part.
 * @param realMax The maximum value for the real part.
 * @param imaginaryMin The minimum value for the imaginary part.
 * @param imaginaryMax The maximum value for the imaginary part.
 * @returns A randomly generated complex number.
 */
export function generateRandomComplexNumber(
  realMin: number,
  realMax: number,
  imaginaryMin: number,
  imaginaryMax: number
): { real: number; imaginary: number } {
  const realPart = Math.random() * (realMax - realMin) + realMin;
  const imaginaryPart =
    Math.random() * (imaginaryMax - imaginaryMin) + imaginaryMin;
  return { real: realPart, imaginary: imaginaryPart };
}

/**
 * Checks if a string is numeric.
 *
 * @param s The string to check.
 * @returns True if the string is numeric, False otherwise.
 */
export function isNumeric(s: string): boolean {
  return !isNaN(parseFloat(s)) && isFinite(parseFloat(s));
}

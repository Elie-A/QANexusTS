import crypto from "crypto";
import RandExp from "randexp";
import fs from "fs";
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
 * Generates a Date object based on the specified format.
 *
 * If no format is provided, the function defaults to the current date.
 * If the format includes 'yyyy', a random year between 1900 and 1999 is generated.
 * If the format includes 'MM', a random month is generated (1-12).
 * If the format includes 'MMM', a random month abbreviation is selected.
 * If the format includes 'dd', a random day is generated based on the maximum days of the month.
 *
 * @param format - An optional string that specifies the date format. Supported patterns:
 *                 - 'yyyy' for a random year
 *                 - 'MM' for a random month (01-12)
 *                 - 'MMM' for a random month abbreviation
 *                 - 'dd' for a random day of the month
 * @returns A Date object representing the generated date.
 * @throws {Error} If the month generated is invalid or exceeds the maximum days.
 *
 * @example
 * const randomDate = generateDateObject("yyyy-MM-dd");
 * console.log(randomDate); // Logs a random date
 *
 * const currentDate = generateDateObject();
 * console.log(currentDate); // Logs the current date
 */
export function generateDateObject(format?: string): Date {
  let year: number | undefined,
    month: number | undefined,
    day: number | undefined;

  // Generate year if 'yyyy' is in format
  if (format?.includes("yyyy")) {
    year = 1900 + Math.floor(Math.random() * 100);
  } else {
    year = new Date().getFullYear(); // Default to current year
  }

  // Generate month
  if (format?.includes("MM")) {
    month = 1 + Math.floor(Math.random() * 12); // Random month between 1 and 12
  } else if (format?.includes("MMM")) {
    const monthKeys = Object.keys(MonthsAbbreviationsEnum) as Array<
      keyof typeof MonthsAbbreviationsEnum
    >;
    const randomIndex = Math.floor(Math.random() * monthKeys.length);
    month = monthKeys.indexOf(monthKeys[randomIndex]) + 1; // Convert month name to month number
  } else {
    month = new Date().getMonth() + 1; // Default to current month
  }

  // Generate day
  if (format?.includes("dd")) {
    let maxDays = getMaxDays(month, year!); // Get max days for the month and year
    day = 1 + Math.floor(Math.random() * maxDays); // Random day between 1 and maxDays
  } else {
    day = new Date().getDate(); // Default to current day
  }

  // Return the constructed Date object
  return new Date(year!, month! - 1, day!); // Month is 0-indexed
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
  return generateInt(0, 1) === 1;
}

/**
 * Generates random binary data of the specified length.
 *
 * @param length The length of the binary data.
 * @returns A randomly generated Uint8Array of the specified length.
 */
export function generateBinaryData(length: number): Uint8Array {
  return new Uint8Array(crypto.randomBytes(length));
}

/**
 * Generates a random timestamp in ISO 8601 format.
 *
 * @returns A randomly generated timestamp in ISO 8601 format.
 */
export function generateTimestamp(): string {
  const currentTime = Date.now();
  const randomMillis = generateInt(0, 1000000000);
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
export function generateInt(min: number = 0, max: number = 100): number {
  const range = max - min + 1;
  const randomBytes = crypto.randomBytes(4);
  const randomValue = randomBytes.readUInt32BE(0);
  return min + (randomValue % range);
}

/**
 * Generates a random float between the specified minimum and maximum values.
 *
 * @param minVal The minimum value.
 * @param maxVal The maximum value.
 * @param decimalPlaces Numbers after decimal.
 * @returns A randomly generated float between minVal and maxVal.
 */
export function generateFloat(
  minVal: number = 0,
  maxVal: number = 1,
  decimalPlaces: number = 2
): number {
  const randomBytes = crypto.randomBytes(4);
  const randomValue = randomBytes.readUInt32BE(0) / 0xffffffff;
  return parseFloat(
    (minVal + randomValue * (maxVal - minVal)).toFixed(decimalPlaces)
  );
}

/**
 * Generates a random double between the specified minimum and maximum values.
 *
 * @param minVal The minimum value.
 * @param maxVal The maximum value.
 * @param decimalPlaces Numbers after decimal.
 * @returns A randomly generated double between minVal and maxVal.
 */
export function generateDouble(
  min: number = 0,
  max: number = 1,
  decimalPlaces: number = 15
): number {
  const randomBytes = crypto.randomBytes(8);
  const randomValue =
    (randomBytes.readUInt32BE(0) * 0x100000000 + randomBytes.readUInt32BE(4)) /
    0x10000000000000000;
  return parseFloat((min + randomValue * (max - min)).toFixed(decimalPlaces));
}

/**
 * Generates a random long between the specified minimum and maximum values.
 *
 * @param minVal The minimum value.
 * @param maxVal The maximum value.
 * @returns A randomly generated long between minVal and maxVal.
 */
export function generateLong(
  min: number = 0,
  max: number = 1000000000
): number {
  const randomBytes = crypto.randomBytes(8);
  const randomValue = randomBytes.readBigUInt64BE(0);
  return Number(randomValue % BigInt(max - min)) + min;
}
/**
 * Generates a random byte.
 *
 * @returns A randomly generated byte.
 */
export function generateByte(): number {
  return crypto.randomBytes(1)[0];
}

/**
 * Generates a random byte array of the specified length.
 *
 * @param length The length of the byte array.
 * @returns A randomly generated Uint8Array.
 */
export function generateByteArray(length: number): Uint8Array {
  return new Uint8Array(crypto.randomBytes(length));
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
export function generateShort(
  minVal: number = 0,
  maxVal: number = 32767
): number {
  return generateInt(minVal, maxVal);
}

/**
 * Generates a random char between the specified minimum and maximum values (inclusive).
 *
 * @param minVal The minimum char value.
 * @param maxVal The maximum char value.
 * @returns A randomly generated char between minVal and maxVal (inclusive).
 */
export function generateChar(): string {
  const charCode = generateInt(32, 126);
  return String.fromCharCode(charCode);
}

/**
 * Generates a random hex string of the specified length.
 *
 * @param length The length of the hex string.
 * @returns A randomly generated hex string.
 */
export function generateHex(length: number): string {
  return crypto
    .randomBytes(length / 2)
    .toString("hex")
    .toUpperCase();
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
  return generateInt(0, 100);
}

/**
 * Generates a random integer from a given set of integers.
 *
 * @param set A set of integers to choose from.
 * @returns A randomly selected integer from the given set.
 *
 * @example
 * // Generates a random integer from the set {1, 2, 3, 4, 5}
 * const randomInt = generateRandomFromSet(new Set([1, 2, 3, 4, 5]));
 * console.log(randomInt); // Output could be any integer from the set
 */
export function generateRandomFromSet(set: Set<number>): number {
  const array = Array.from(set);
  return array[generateInt(0, array.length - 1)];
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

/**
 * Reads a JSON schema file and returns the parsed schema object.
 *
 * This function asynchronously reads the content of a file specified by `filePath`,
 * parses the content as JSON, and returns the resulting object. If any error occurs
 * during reading or parsing, it logs the error and returns `null`.
 *
 * @param filePath - The path to the JSON file to be read.
 * @returns A promise that resolves to the parsed JSON object if successful, or `null` if an error occurs.
 */
export async function readAndSaveSchema(filePath: string): Promise<any | null> {
  try {
    const jsonContent = await fs.promises.readFile(filePath, "utf8");
    const schemaTemplate = JSON.parse(jsonContent);
    const propertySchema = schemaTemplate;

    return propertySchema;
  } catch (error: any) {
    console.error("Error reading or parsing the JSON file:", error.message);
    return null;
  }
}

/**
 * Generates a random value based on the specified format and optional country code.
 *
 * This function supports generating values in two formats: email and phone number.
 * - For email format, it generates a default email address.
 * - For phone format, it generates a phone number based on the provided country code using predefined patterns.
 *
 * @param options - An object specifying the desired format and country code.
 * @param options.format - The format of the value to generate. Can be either 'email' or 'phone'. If not specified, an empty string is returned.
 * @param options.countryCode - The ISO country code for the phone number. It should be a key from the `CountryCodePhoneNumberPatternEnum`. If not specified, defaults to 'FR' (France).
 *
 * @returns A string representing the generated value based on the specified format:
 * - For 'email', a generated email address.
 * - For 'phone', a generated phone number formatted according to the country code's pattern.
 * - For any other format, an empty string is returned.
 */
function generateRandomValueFromFormat(options: {
  format?: "email" | "phone";
  countryCode?: keyof typeof CountryCodePhoneNumberPatternEnum;
}): string {
  const { format, countryCode = "FR" } = options;

  switch (format) {
    case "email":
      return generateEmail();
    case "phone":
      return generatePhoneNumber(countryCode);
    default:
      return "";
  }
}

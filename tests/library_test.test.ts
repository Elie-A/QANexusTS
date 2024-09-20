import { DataGenerator, AssertionHelper } from "../index";
import { CountryCodePhoneNumberPatternEnum } from "../src/dataGenerator/enums/CountryCodePhoneNumberPatternEnum";
import { SupportedDateFormats } from "../src/dataGenerator/enums/SupportedDateFormats";
import { UuidType } from "../src/dataGenerator/enums/UUIDEnums";

describe("Library Tests", () => {
  it("Should Generate String With Default Length", () => {
    let str = DataGenerator.generateString();
    AssertionHelper.assertIsTypeOf(str, "string");
  });

  it("Should Generate String With Defined Length", () => {
    let str = DataGenerator.generateString(16);
    AssertionHelper.assertIsTypeOf(str, "string");
    AssertionHelper.assertStringLength(str, 16);
  });

  it("Should Generate Boolean", () => {
    let bool = DataGenerator.generateBoolean();
    AssertionHelper.assertIsTypeOf(bool, "boolean");
  });

  it("Should Generate Double Without Min & Max", () => {
    let double = DataGenerator.generateDouble();
    AssertionHelper.assertIsTypeOf(double, "number");
  });

  it("Should Generate Double With Min & Max", () => {
    let double = DataGenerator.generateDouble(1, 10);
    AssertionHelper.assertIsTypeOf(double, "number");
    AssertionHelper.assertGreaterThanOrEqual(double, 1);
    AssertionHelper.assertLessThanOrEqual(double, 10);
  });

  it("Should Generate Int Without Min & Max", () => {
    let int = DataGenerator.generateInt();
    AssertionHelper.assertIsTypeOf(int, "number");
  });

  it("Should Generate Int With Min & Max", () => {
    let int = DataGenerator.generateDouble(1, 10);
    AssertionHelper.assertIsTypeOf(int, "number");
    AssertionHelper.assertGreaterThanOrEqual(int, 1);
    AssertionHelper.assertLessThanOrEqual(int, 10);
  });

  it("Should Generate Float Without Min & Max", () => {
    let float = DataGenerator.generateFloat();
    AssertionHelper.assertIsTypeOf(float, "number");
  });

  it("Should Generate Float With Min & Max", () => {
    let float = DataGenerator.generateFloat(1, 10);
    AssertionHelper.assertIsTypeOf(float, "number");
    AssertionHelper.assertGreaterThanOrEqual(float, 1);
    AssertionHelper.assertLessThanOrEqual(float, 10);
  });

  it("Should Generate Long Without Min & Max", () => {
    let long = DataGenerator.generateLong();
    AssertionHelper.assertIsTypeOf(long, "number");
  });

  it("Should Generate Long With Min & Max", () => {
    let long = DataGenerator.generateLong(1, 10);
    AssertionHelper.assertIsTypeOf(long, "number");
    AssertionHelper.assertGreaterThanOrEqual(long, 1);
    AssertionHelper.assertLessThanOrEqual(long, 10);
  });

  it("Should Generate Short Without Min & Max", () => {
    let short = DataGenerator.generateShort();
    AssertionHelper.assertIsTypeOf(short, "number");
  });

  it("Should Generate Short With Min & Max", () => {
    let short = DataGenerator.generateShort(1, 10);
    AssertionHelper.assertIsTypeOf(short, "number");
    AssertionHelper.assertGreaterThanOrEqual(short, 1);
    AssertionHelper.assertLessThanOrEqual(short, 10);
  });

  it("Should Generate Char", () => {
    let char = DataGenerator.generateChar();
    AssertionHelper.assertIsTypeOf(char, "string");
  });

  it("Should Generate Byte", () => {
    let byte = DataGenerator.generateByte();
    AssertionHelper.assertIsTypeOf(byte, "number");
  });

  it("Should Generate Byte Array", () => {
    let byteArray = DataGenerator.generateByteArray(10);
    AssertionHelper.assertIsTypeOf(byteArray, "Uint8Array");
    AssertionHelper.assertArrayLength(byteArray, 10);
  });

  it("Should Generate Binary Data", () => {
    let binaryData = DataGenerator.generateBinaryData(10);
    AssertionHelper.assertIsTypeOf(binaryData, "Uint8Array");
    AssertionHelper.assertArrayLength(binaryData, 10);
  });

  it("Should Generate String Date Without Format", () => {
    let date = DataGenerator.generateDate();
    AssertionHelper.assertIsTypeOf(date, "string");
  });

  it("Should Generate String Date With Format", () => {
    let date = DataGenerator.generateDate(SupportedDateFormats.YYYY_MM_DD);
    AssertionHelper.assertIsTypeOf(date, "string");
  });

  it("Should Generate Date Without Format", () => {
    let dateObject = DataGenerator.generateDateObject();
    AssertionHelper.assertIsTypeOf(dateObject, "Date");
  });

  it("Should Generate Date With Format", () => {
    let dateObject = DataGenerator.generateDateObject(
      SupportedDateFormats.YYYY_MM_DD
    );
    AssertionHelper.assertIsTypeOf(dateObject, "Date");
  });

  it("Should Generate An Email Without Domain Nor Username Length", () => {
    let email = DataGenerator.generateEmail();
    AssertionHelper.assertIsTypeOf(email, "string");
    AssertionHelper.assertStringEndsWith(email, "@defaultDomain.com");
    const username = email.split("@");
    AssertionHelper.assertStringLength(username[0], 10);
  });

  it("Should Generate An Email Without Domain But With Username Length", () => {
    let email = DataGenerator.generateEmail(undefined, 15);
    AssertionHelper.assertIsTypeOf(email, "string");
    AssertionHelper.assertStringEndsWith(email, "@defaultDomain.com");
    const username = email.split("@");
    AssertionHelper.assertStringLength(username[0], 15);
  });

  it("Should Generate An Email With Domain And With Username Length", () => {
    let email = DataGenerator.generateEmail("@testDomain.com", 15);
    AssertionHelper.assertIsTypeOf(email, "string");
    AssertionHelper.assertStringEndsWith(email, "@testDomain.com");
    const username = email.split("@");
    AssertionHelper.assertStringLength(username[0], 15);
  });

  it("Should Generate Time", () => {
    let time = DataGenerator.generateTime();
    AssertionHelper.assertIsTypeOf(time, "string");
  });

  it("Should Generate Timestamp", () => {
    let timestamp = DataGenerator.generateTimestamp();
    AssertionHelper.assertIsTypeOf(timestamp, "string");
  });

  it("Should Generate Unix Timestamp", () => {
    let unixTimestamp = DataGenerator.generateUnixTimestamp();
    AssertionHelper.assertIsTypeOf(unixTimestamp, "number");
  });

  it("Should Generate Hex", () => {
    const hexLen = 11;
    let hex = DataGenerator.generateHex(hexLen);
    let expectedLength: number = hexLen % 2 === 0 ? hexLen : hexLen - 1;
    AssertionHelper.assertStringLength(hex, expectedLength);
  });

  it("Should Generate Hex Color", () => {
    let hexColor = DataGenerator.generateHexColor();
    AssertionHelper.assertStringLength(hexColor, 7);
    AssertionHelper.assertStringMatchesRegex(hexColor, "#([A-Fa-f0-9]{6})");
  });

  it("Should Generate Phone Number Without Country Code", () => {
    let phoneNumber = DataGenerator.generatePhoneNumber();
    AssertionHelper.assertStringMatchesRegex(
      phoneNumber,
      CountryCodePhoneNumberPatternEnum.FR
    );
  });

  it("Should Generate Phone Number With Country Code", () => {
    let phoneNumber = DataGenerator.generatePhoneNumber("US");
    AssertionHelper.assertStringMatchesRegex(
      phoneNumber,
      CountryCodePhoneNumberPatternEnum.US
    );
  });

  it("Should Generate Random Even", () => {
    let even = DataGenerator.generateRandomEven(1, 10);
    AssertionHelper.assertIsTypeOf(even, "number");
    AssertionHelper.assertGreaterThanOrEqual(even, 1);
    AssertionHelper.assertLessThanOrEqual(even, 10);
    AssertionHelper.assertIsEven(even);
  });

  it("Should Generate Random Odd", () => {
    let odd = DataGenerator.generateRandomOdd(1, 10);
    AssertionHelper.assertIsTypeOf(odd, "number");
    AssertionHelper.assertGreaterThan(odd, 1);
    AssertionHelper.assertLessThan(odd, 10);
    AssertionHelper.assertIsOdd(odd);
  });

  it("Should Generate Random Prime", () => {
    let prime = DataGenerator.generateRandomPrime(1, 10);
    AssertionHelper.assertIsTypeOf(prime, "number");
    AssertionHelper.assertIsPrime(prime);
  });

  it("Should Generate Random Numeric", () => {
    let prime = DataGenerator.generateRandomPrime(1, 10);
    AssertionHelper.assertIsTypeOf(prime, "number");
    AssertionHelper.assertIsPrime(prime);
  });

  it("Should Generate Random UUID Without UUID Type", () => {
    let uuid = DataGenerator.generateUuid();
    console.log("UUIDV4: ", uuid);
    AssertionHelper.assertStringMatchesRegex(
      uuid,
      "[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}"
    );
  });

  it("Should Generate Random UUID v1", () => {
    let uuid = DataGenerator.generateUuid(UuidType.V1);
    AssertionHelper.assertStringMatchesRegex(
      uuid,
      "[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}"
    );
  });

  it("Should Generate Random UUID v3", () => {
    const name = "uuidv3-name";
    let uuid = DataGenerator.generateUuid(UuidType.V3, name);
    AssertionHelper.assertStringMatchesRegex(
      uuid,
      "[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}"
    );
  });

  it("Should Generate Random UUID v5", () => {
    const name = "uuidv5-name";
    let uuid = DataGenerator.generateUuid(UuidType.V5, name);
    AssertionHelper.assertStringMatchesRegex(
      uuid,
      "[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}"
    );
  });

  it("Should Generate Random Percentage", () => {
    let percentage = DataGenerator.generateRandomPercentage();
    AssertionHelper.assertIsTypeOf(percentage, "number");
    AssertionHelper.assertGreaterThanOrEqual(percentage, 0);
    AssertionHelper.assertLessThanOrEqual(percentage, 100);
  });

  it("Should Generate Random IPv4 Address", () => {
    let ipAddress = DataGenerator.generateIpAddress();
    AssertionHelper.assertIsTypeOf(ipAddress, "string");
    AssertionHelper.assertStringMatchesRegex(
      ipAddress,
      "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)"
    );
  });

  it("Should Generate Random IPv6 Address", () => {
    let ipV6Address = DataGenerator.generateIpv6Address();
    AssertionHelper.assertIsTypeOf(ipV6Address, "string");
    AssertionHelper.assertStringMatchesRegex(
      ipV6Address,
      "(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(?::[0-9a-fA-F]{1,4}){1,6}|::(?:[0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|:((?:[0-9a-fA-F]{1,4}:){0,5}[0-9a-fA-F]{1,4})"
    );
  });

  it("Should Generate Mac Address", () => {
    let macAddress = DataGenerator.generateMacAddress();
    AssertionHelper.assertIsTypeOf(macAddress, "string");
    AssertionHelper.assertStringMatchesRegex(
      macAddress,
      "([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})"
    );
  });

  it("Should Generate Unique Random Sequence", () => {
    let randomSequence = DataGenerator.generateUniqueRandomSequence(1, 10, 10);
    AssertionHelper.assertIsTypeOf(randomSequence, "array");
    AssertionHelper.assertArrayLength(randomSequence, 10);
  });

  it("Should Generate Random Custom Distribution", () => {
    const probabilities = [0.2, 0.5, 0.3];
    const iterations = 1000; // Increased number of random values to generate
    const counts = Array(probabilities.length).fill(0);

    // Generate random values based on the distribution
    for (let i = 0; i < iterations; i++) {
      const randomIndex =
        DataGenerator.generateRandomWithCustomDistribution(probabilities);
      counts[randomIndex]++;
    }

    // Check that the results are close to the expected probabilities
    const expectedCounts = probabilities.map((p) => p * iterations);

    for (let i = 0; i < probabilities.length; i++) {
      const tolerance = Math.round(iterations * 0.1); // 10% of iterations as tolerance
      AssertionHelper.assertCloseTo(
        counts[i],
        expectedCounts[i],
        tolerance,
        `Count for index ${i} is not within tolerance of expected`
      );
    }
  });

  it("Should Generate a Random Number From Set", () => {
    const numberSet = new Set<number>([1, 2, 3, 4, 5]);
    const iterations = 10;
    const counts = new Map<number, number>();

    // Generate random values based on the set
    for (let i = 0; i < iterations; i++) {
      const randomValue = DataGenerator.generateRandomFromSet(numberSet);
      counts.set(randomValue, (counts.get(randomValue) || 0) + 1);
    }
  });

  it("Should Generate Random Exponential", () => {
    let exponential = DataGenerator.generateRandomExponential(2);
    AssertionHelper.assertIsTypeOf(exponential, "number");
  });

  it("Should Generate Gaussian", () => {
    const mean = 100;
    const standardDeviation = 15;
    const iterations = 10000;
    const samples = Array.from({ length: iterations }, () =>
      DataGenerator.generateGaussian(mean, standardDeviation)
    );

    const sampleMean =
      samples.reduce((sum, value) => sum + value, 0) / samples.length;
    const sampleVariance =
      samples.reduce((sum, value) => sum + Math.pow(value - sampleMean, 2), 0) /
      samples.length;
    const sampleStandardDeviation = Math.sqrt(sampleVariance);

    // Check that the sample mean is close to the expected mean
    const meanTolerance = 1; // Allowable error for the mean
    AssertionHelper.assertCloseTo(
      sampleMean,
      mean,
      meanTolerance,
      `Sample mean ${sampleMean} is not within tolerance of expected mean ${mean}`
    );

    // Check that the sample standard deviation is close to the expected standard deviation
    const stdDevTolerance = 1; // Allowable error for the standard deviation
    AssertionHelper.assertCloseTo(
      sampleStandardDeviation,
      standardDeviation,
      stdDevTolerance,
      `Sample standard deviation ${sampleStandardDeviation} is not within tolerance of expected standard deviation ${standardDeviation}`
    );
  });

  it("Should Generate Random Complex Number", () => {
    const realMin = 1;
    const realMax = 5;
    const imaginaryMin = -3;
    const imaginaryMax = 3;
    const iterations = 10000;
    const samples = Array.from({ length: iterations }, () =>
      DataGenerator.generateRandomComplexNumber(
        realMin,
        realMax,
        imaginaryMin,
        imaginaryMax
      )
    );

    for (const { real, imaginary } of samples) {
      AssertionHelper.assertGreaterThanOrEqual(real, realMin);
      AssertionHelper.assertLessThan(real, realMax);
      AssertionHelper.assertGreaterThanOrEqual(imaginary, imaginaryMin);
      AssertionHelper.assertLessThan(imaginary, imaginaryMax);
    }
  });
});

import { DataGenerator, AssertionHelper } from "../index";
import { SupportedDateFormats } from "../src/dataGenerator/enums/SupportedDateFormats";

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
});

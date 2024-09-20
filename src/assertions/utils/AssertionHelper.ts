import _ from "lodash";
import { parse, isValid } from "date-fns";
import { AssertionException } from "./AssertionException";

/**
 * Asserts that the provided object is a number. If not, throws an AssertionException.
 *
 * @param obj The object to be checked.
 * @param message Optional message to be used for the exception. If not provided, a default message will be used.
 */
export function assertIsNumber(
  obj: any,
  message: string = `Expected a number but received ${typeof obj}`
): void {
  // Check if the object is not a number
  if (typeof obj !== "number" || Number.isNaN(obj)) {
    // Throw AssertionException with the provided or default message
    throw new AssertionException(`${message}`);
  }
}

export function assertIsNotNumber(
  obj: any,
  message: string = `Expected not a number but was number`
): void {
  /**
   * Asserts that the given object is not an instance of a number.
   *
   * @param obj - The object to check.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the object is a number.
   */
  if (typeof obj === "number") {
    throw new AssertionException(`${message}`);
  }
}

export function assertEquals(
  expected: any,
  actual: any,
  message: string = `Expected: ${expected}, but was: ${actual}`
): void {
  /**
   * Asserts that two objects are equal.
   *
   * @param expected - The expected object.
   * @param actual - The actual object.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the objects are not equal.
   */
  if (expected === null && actual === null) {
    return;
  }
  if (expected !== actual) {
    throw new AssertionException(`${message}`);
  }
}

export function assertNotEquals(
  expected: any,
  actual: any,
  message: string = `Expected objects to be different but both were null or equal`
): void {
  /**
   * Asserts that two objects are not equal.
   *
   * @param expected - The object that is expected to be different.
   * @param actual - The actual object.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the objects are equal.
   */
  if (expected === null && actual === null) {
    throw new AssertionException(`${message}`);
  }
  if (expected === actual) {
    throw new AssertionException(`${message}`);
  }
}

export function assertDeepEquals(
  expected: any,
  actual: any,
  message: string = `Expected: ${JSON.stringify(
    expected
  )}, but was: ${JSON.stringify(actual)}`
): void {
  /**
   * Asserts that two objects are deeply equal.
   *
   * @param expected - The expected object.
   * @param actual - The actual object.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the objects are not deeply equal.
   */
  if (JSON.stringify(expected) !== JSON.stringify(actual)) {
    throw new AssertionException(`${message}`);
  }
}

export function assertNotDeepEquals(
  expected: any,
  actual: any,
  message: string = `Expected objects to be different, but both were deeply equal: ${JSON.stringify(
    actual
  )}`
): void {
  /**
   * Asserts that two objects are not deeply equal.
   *
   * @param expected - The object that is expected to be different.
   * @param actual - The actual object.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the objects are deeply equal.
   */
  if (JSON.stringify(expected) === JSON.stringify(actual)) {
    throw new AssertionException(`${message}`);
  }
}

export function assertIsTrue(
  condition: boolean,
  message: string = `Expected true but was false`
): void {
  /**
   * Asserts that a condition is true.
   *
   * @param condition - The condition to check.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the condition is false.
   */
  if (!condition) {
    throw new AssertionException(`${message}`);
  }
}

export function assertIsFalse(
  condition: boolean,
  message: string = `Expected false but was true`
): void {
  /**
   * Asserts that a condition is false.
   *
   * @param condition - The condition to check.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the condition is true.
   */
  if (condition) {
    throw new AssertionException(`${message}`);
  }
}

export function assertThrows(
  runnable: () => void,
  message: string = `Expected function to throw an exception but none was thrown`
): void {
  /**
   * Asserts that executing the given function throws an exception.
   *
   * @param runnable - The function to execute.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If no exception is thrown.
   */
  try {
    runnable();
  } catch (e) {
    return; // Successfully caught an exception
  }
  throw new AssertionException(message);
}

/**
 * Asserts that the given object matches the specified type.
 *
 * @param obj - The object to check.
 * @param expectedType - The expected type as a string ('string', 'number', 'array', 'Uint8Array', 'Map', 'Set', etc.).
 * @param message - An optional custom message to include in the exception if the assertion fails.
 * @throws {Error} If the object's actual type does not match the expected type.
 *
 * @example
 * assertIsTypeOf(123, 'number'); // Passes
 * assertIsTypeOf([1, 2, 3], 'array'); // Passes
 * assertIsTypeOf(new Uint8Array(5), 'Uint8Array'); // Passes
 * assertIsTypeOf(new Map(), 'Map'); // Passes
 */
export function assertIsTypeOf(
  obj: any,
  expectedType: string,
  message?: string
): void {
  let actualType: string;

  // Determine the actual type of the object
  if (obj === null) {
    actualType = "null";
  } else if (Array.isArray(obj)) {
    actualType = "array";
  } else if (obj instanceof Uint8Array) {
    actualType = "Uint8Array";
  } else if (obj instanceof Uint16Array) {
    actualType = "Uint16Array";
  } else if (obj instanceof Uint32Array) {
    actualType = "Uint32Array";
  } else if (obj instanceof Int8Array) {
    actualType = "Int8Array";
  } else if (obj instanceof Int16Array) {
    actualType = "Int16Array";
  } else if (obj instanceof Int32Array) {
    actualType = "Int32Array";
  } else if (obj instanceof Float32Array) {
    actualType = "Float32Array";
  } else if (obj instanceof Float64Array) {
    actualType = "Float64Array";
  } else if (obj instanceof ArrayBuffer) {
    actualType = "ArrayBuffer";
  } else if (obj instanceof Map) {
    actualType = "Map";
  } else if (obj instanceof Set) {
    actualType = "Set";
  } else if (obj instanceof WeakMap) {
    actualType = "WeakMap";
  } else if (obj instanceof WeakSet) {
    actualType = "WeakSet";
  } else if (obj instanceof Date) {
    actualType = "Date";
  } else if (obj instanceof RegExp) {
    actualType = "RegExp";
  } else if (obj instanceof Error) {
    actualType = "Error";
  } else if (obj instanceof Promise) {
    actualType = "Promise";
  } else if (obj instanceof Proxy) {
    actualType = "Proxy";
  } else if (obj instanceof Function) {
    actualType = "function"; // Handle functions
  } else if (obj instanceof Object) {
    actualType = "object"; // Plain objects
  } else {
    actualType = typeof obj;
  }

  // Compare the actual type with the expected type
  if (actualType !== expectedType) {
    throw new Error(
      message || `Expected type: ${expectedType}, but was: ${actualType}`
    );
  }
}

export function assertIsTypeOfClass(
  expectedType: { new (...args: any[]): any },
  obj: any,
  message: string = `Expected type: ${expectedType.name}, but was: ${obj.constructor.name}`
): void {
  /**
   * Asserts that the given object is an instance of the specified class.
   *
   * @param expectedType - The expected class type.
   * @param obj - The object to check.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the object is not an instance of the expected class.
   */
  if (!(obj instanceof expectedType)) {
    throw new AssertionException(`${message}`);
  }
}

export function assertInRange(
  value: number,
  minValue: number,
  maxValue: number,
  message: string = `Expected: ${minValue} < ${value} < ${maxValue}`
): void {
  /**
   * Asserts that a number is within the specified range (exclusive).
   *
   * @param value - The value to check.
   * @param minValue - The minimum value (exclusive).
   * @param maxValue - The maximum value (exclusive).
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the value is not within the specified range.
   */
  if (!(minValue < value && value < maxValue)) {
    throw new AssertionException(`${message}`);
  }
}

export function assertNotInRange(
  value: number,
  minValue: number,
  maxValue: number,
  message: string = `Expected: ${value} to not be in range (${minValue}, ${maxValue})`
): void {
  /**
   * Asserts that a number is not within the specified range (exclusive).
   *
   * @param value - The value to check.
   * @param minValue - The minimum value (exclusive).
   * @param maxValue - The maximum value (exclusive).
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the value is within the specified range.
   */
  if (minValue < value && value < maxValue) {
    throw new AssertionException(`${message}`);
  }
}

export function assertInRangeIncluded(
  value: number,
  minValue: number,
  maxValue: number,
  message: string = `Expected: ${minValue} <= ${value} <= ${maxValue}`
): void {
  /**
   * Asserts that a number is within the specified range (inclusive).
   *
   * @param value - The value to check.
   * @param minValue - The minimum value (inclusive).
   * @param maxValue - The maximum value (inclusive).
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the value is not within the specified range.
   */
  if (!(minValue <= value && value <= maxValue)) {
    throw new AssertionException(`${message}`);
  }
}

export function assertNotInRangeIncluded(
  value: number,
  minValue: number,
  maxValue: number,
  message: string = `Expected: ${value} to not be in range [${minValue}, ${maxValue}]`
): void {
  /**
   * Asserts that a number is not within the specified range (inclusive).
   *
   * @param value - The value to check.
   * @param minValue - The minimum value (inclusive).
   * @param maxValue - The maximum value (inclusive).
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the value is within the specified range.
   */
  if (minValue <= value && value <= maxValue) {
    throw new AssertionException(`${message}`);
  }
}

export function assertCollectionContains<T>(
  collection: T[],
  element: T,
  message: string = ` Collection does not contain: ${element}`
): void {
  /**
   * Asserts that a collection contains the specified element.
   *
   * @param collection - The collection to check.
   * @param element - The element to check for in the collection.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the element is not in the collection.
   */
  if (!collection.includes(element)) {
    throw new AssertionException(`${message}`);
  }
}

export function assertCollectionNotContains<T>(
  collection: T[],
  element: T,
  message: string = `Collection contains: ${element}`
): void {
  /**
   * Asserts that a collection does not contain the specified element.
   *
   * @param collection - The collection to check.
   * @param element - The element to ensure is not in the collection.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the element is found in the collection.
   */
  if (collection.includes(element)) {
    throw new AssertionException(`${message}`);
  }
}

export function assertDisjoint<T>(
  collection1: T[],
  collection2: T[],
  message: string = `Collection are not disjoint there are common elements`
): void {
  /**
   * Asserts that two collections are disjoint (do not share any common elements).
   *
   * @param collection1 - The first collection.
   * @param collection2 - The second collection.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the collections are not disjoint.
   */
  const set1 = new Set(collection1);
  const set2 = new Set(collection2);
  const intersection = [...set1].filter((item) => set2.has(item));

  if (intersection.length > 0) {
    throw new AssertionException(
      `${message} Collections are not disjoint; common element(s): ${intersection}`
    );
  }
}

export function assertIsNullOrUndefined(
  obj: any,
  message: string = `Expected null or undefined but was defined`
): void {
  /**
   * Asserts that an object is either null or undefined (not set).
   *
   * @param obj - The object to check.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the object is neither null nor undefined.
   */
  if (obj !== null && obj !== undefined) {
    throw new AssertionException(`${message}`);
  }
}

export function assertIsNotNullOrUndefined(
  obj: any,
  message: string = `Expected defined object but was null or undefined`
): void {
  /**
   * Asserts that an object is not null or undefined.
   *
   * @param obj - The object to check.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the object is null or undefined.
   */
  if (obj === null || obj === undefined) {
    throw new AssertionException(`${message}`);
  }
}

export function assertObjectHasProperty(
  obj: any,
  propertyName: string,
  message: string = "Missing property or object is invalid or null"
): void {
  /**
   * Asserts that an object has a specified property.
   *
   * @param obj - The object to check.
   * @param propertyName - The name of the property to check for.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the object does not have the specified property.
   */
  if (typeof obj === "object" && obj !== null) {
    // Check for properties in objects and dictionaries
    if (!(propertyName in obj)) {
      throw new AssertionException(
        `${message} Object does not have property: ${propertyName}`
      );
    }
  } else {
    throw new AssertionException(
      `${message} Object is not a valid object or is null.`
    );
  }
}

export function assertHasPropertyValue<T>(
  obj: any,
  fieldName: string,
  expectedValue: T,
  message: string = `Error: the object does not have the property or the property value does not match the expected value`
): void {
  /**
   * Asserts that an object has a specified property with a given value.
   *
   * @param obj - The object to check.
   * @param fieldName - The name of the property to check.
   * @param expectedValue - The expected value of the property.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the object does not have the property or the property value does not match the expected value.
   */
  let actualValue: any;

  if (typeof obj === "object" && obj !== null) {
    // Check for properties in objects and dictionaries
    if (obj.hasOwnProperty(fieldName)) {
      actualValue = obj[fieldName];
    } else {
      throw new AssertionException(
        `${message} Object does not have property: ${fieldName}`
      );
    }
  } else {
    throw new AssertionException(
      `${message} Object is not a valid object or is null.`
    );
  }

  if (actualValue !== expectedValue) {
    throw new AssertionException(
      `${message} Expected value for '${fieldName}' was ${expectedValue}, but got ${actualValue}`
    );
  }
}

export function assertEmptyObject(
  obj: any,
  message: string = `Error: Object is not empty`
): void {
  /**
   * Asserts that an object (dict, collection, or string) is empty.
   *
   * @param obj - The object to check. Can be an object, array, string, or null/undefined.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the object is not empty.
   */
  if (obj === null || obj === undefined) {
    throw new AssertionException(
      `${message} Expected non-empty object, but got null or undefined.`
    );
  }

  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      if (obj.length > 0) {
        throw new AssertionException(
          `${message} Expected empty array, but was not.`
        );
      }
    } else if (obj instanceof Map || obj instanceof Set) {
      if (obj.size > 0) {
        throw new AssertionException(
          `${message} Expected empty Map or Set, but was not.`
        );
      }
    } else {
      // For plain objects (not null, arrays, Map, or Set)
      if (Object.keys(obj).length > 0) {
        throw new AssertionException(
          `${message} Expected empty object, but was not.`
        );
      }
    }
  } else if (typeof obj === "string") {
    if (obj.length > 0) {
      throw new AssertionException(
        `${message} Expected empty string, but was not.`
      );
    }
  } else {
    throw new AssertionException(`${message} Object type is not supported.`);
  }
}

export function assertGreaterThan(
  value: number,
  reference: number,
  message: string = `Actual value is <= Expected value`
): void {
  /**
   * Asserts that a number is greater than a specified reference value.
   *
   * @param value - The value to check.
   * @param reference - The reference value to compare against.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the value is not greater than the reference.
   */
  if (value <= reference) {
    throw new AssertionException(
      `${message} Expected: ${value} > ${reference}`
    );
  }
}

export function assertGreaterThanOrEqual(
  value: number,
  reference: number,
  message: string = `Actual value is < expected value`
): void {
  /**
   * Asserts that a number is greater than or equal to a specified reference value.
   *
   * @param value - The value to check.
   * @param reference - The reference value to compare against.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the value is less than the reference.
   */
  if (value < reference) {
    throw new AssertionException(
      `${message} Expected: ${value} >= ${reference}`
    );
  }
}

export function assertLessThan(
  value: number,
  reference: number,
  message: string = `Actual value is >= expected value`
): void {
  /**
   * Asserts that a number is less than a specified reference value.
   *
   * @param value - The value to check.
   * @param reference - The reference value to compare against.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the value is not less than the reference.
   */
  if (value >= reference) {
    throw new AssertionException(
      `${message} Expected: ${value} < ${reference}`
    );
  }
}

export function assertLessThanOrEqual(
  value: number,
  reference: number,
  message: string = `Expected value <= actual value`
): void {
  /**
   * Asserts that a number is less than or equal to a specified reference value.
   *
   * @param value - The value to check.
   * @param reference - The reference value to compare against.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the value is greater than the reference.
   */
  if (value > reference) {
    throw new AssertionException(
      `${message} Expected: ${value} <= ${reference}`
    );
  }
}

export function assertObjectHasKeys(
  obj: { [key: string]: any },
  keys: any[],
  message: string = `Object is missing key(s)`
): void {
  /**
   * Asserts that an object (dictionary) has all specified keys.
   *
   * @param obj - The object to check. Must be a dictionary (object).
   * @param keys - The list of keys to check for.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If any keys are missing from the object.
   */
  const missingKeys = keys.filter((key) => !(key in obj));
  if (missingKeys.length > 0) {
    throw new AssertionException(
      `${message} Object is missing key(s): ${missingKeys.join(", ")}`
    );
  }
}

export function assertIsCollectionEmpty(
  collection: any[],
  message: string = `Expected empty collection, but was not.`
): void {
  /**
   * Asserts that a collection is empty.
   *
   * @param collection - The collection to check. Must be an array.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the collection is not empty.
   */
  if (collection.length > 0) {
    throw new AssertionException(`${message}`);
  }
}

export function assertCollectionIsNotEmpty(
  collection: any[],
  message: string = `Expected non-empty collection, but was empty.`
): void {
  /**
   * Asserts that a collection is not empty.
   *
   * @param collection - The collection to check. Must be an array.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the collection is empty.
   */
  if (collection.length === 0) {
    throw new AssertionException(`${message}`);
  }
}

export function assertCollectionLength(
  collection: any[],
  expectedLength: number,
  message: string = `Expected length is not equal to collection length`
): void {
  /**
   * Asserts that a collection has a specified length.
   *
   * @param collection - The collection to check. Must be an array.
   * @param expectedLength - The expected length of the collection.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the collection length does not match the expected length.
   */
  if (collection.length !== expectedLength) {
    throw new AssertionException(
      `${message} Expected length: ${expectedLength}, but was: ${collection.length}`
    );
  }
}

export function assertStringLength(
  string: string,
  expectedLength: number,
  message: string = `Expected length not equal to actual length`
): void {
  /**
   * Asserts that a string has a specified length.
   *
   * @param string - The string to check.
   * @param expectedLength - The expected length of the string.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the string length does not match the expected length.
   */
  if (string.length !== expectedLength) {
    throw new AssertionException(
      `${message} Expected length: ${expectedLength}, but was: ${string.length}`
    );
  }
}

export function assertStringContains(
  string: string,
  substring: string,
  message: string = `String does not contain given substring`
): void {
  /**
   * Asserts that a string contains a specified substring.
   *
   * @param string - The string to check.
   * @param substring - The substring to check for.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the string does not contain the substring.
   */
  if (!string.includes(substring)) {
    throw new AssertionException(
      `${message} String does not contain: ${substring}`
    );
  }
}

export function assertStringStartsWith(
  string: string,
  prefix: string,
  message: string = `String does not start with given prefix`
): void {
  /**
   * Asserts that a string starts with a specified prefix.
   *
   * @param string - The string to check.
   * @param prefix - The prefix to check for.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the string does not start with the prefix.
   */
  if (!string.startsWith(prefix)) {
    throw new AssertionException(
      `${message} String does not start with: ${prefix}`
    );
  }
}

export function assertStringEndsWith(
  string: string,
  suffix: string,
  message: string = `String does not end with given suffix`
): void {
  /**
   * Asserts that a string ends with a specified suffix.
   *
   * @param string - The string to check.
   * @param suffix - The suffix to check for.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the string does not end with the suffix.
   */
  if (!string.endsWith(suffix)) {
    throw new AssertionException(
      `${message} String does not end with: ${suffix}`
    );
  }
}

export function assertStringMatchesRegex(
  string: string,
  regex: string,
  message: string = `String does not match give pattern`
): void {
  /**
   * Asserts that a string matches a specified regular expression pattern.
   *
   * @param string - The string to check.
   * @param regex - The regular expression pattern to match against.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the string does not match the pattern.
   */
  const pattern = new RegExp(`^${regex}$`);
  if (!pattern.test(string)) {
    throw new AssertionException(
      `${message} String does not match pattern: ${regex}`
    );
  }
}

export function assertStringNotMatchesRegex(
  string: string,
  regex: string,
  message: string = `String matches give pattern`
): void {
  /**
   * Asserts that a string does not match a specified regular expression pattern.
   *
   * @param string - The string to check.
   * @param regex - The regular expression pattern to match against.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the string matches the pattern.
   */
  const pattern = new RegExp(`^${regex}$`);
  if (pattern.test(string)) {
    throw new AssertionException(`${message} String matches pattern: ${regex}`);
  }
}

export function assertInstanceOf(
  expectedClass: new (...args: any[]) => any,
  obj: any,
  message: string = `Object is not an instance of class`
): void {
  /**
   * Asserts that an object is an instance of a specified class.
   *
   * @param expectedClass - The class that the object is expected to be an instance of.
   * @param obj - The object to check.
   * @param message - The message to include in the exception if the assertion fails.
   * @throws AssertionException - If the object is not an instance of the expected class.
   */
  if (!(obj instanceof expectedClass)) {
    throw new AssertionException(
      `${message} Object is not an instance of: ${expectedClass.name}`
    );
  }
}

export function assertDate(
  obj: any,
  message: string = `Object is not a Date`
): void {
  /**
   * Asserts that the given object is a Date.
   *
   * @param obj - The object to check.
   * @param message - The error message to include in the exception if the assertion fails.
   * @throws AssertionException - If the object is not a Date.
   */
  if (!(obj instanceof Date)) {
    throw new AssertionException(`${message}`);
  }
}

export function assertDateFormat(
  date: string,
  format: string,
  message: string = `Date does not match format`
): void {
  /**
   * Asserts that the given date string matches the specified format.
   *
   * @param date - The date string to check.
   * @param format - The format string to compare against.
   * @param message - The error message to include in the exception if the assertion fails.
   * @throws AssertionException - If the date string does not match the format.
   */
  // Date parsing with format validation
  const parsedDate = parse(date, format, new Date());

  if (!isValid(parsedDate)) {
    throw new AssertionException(
      `${message} Date does not match format: ${format}`
    );
  }
}

export function assertIsFunction(
  obj: any,
  message: string = `Object is not callable`
): void {
  /**
   * Asserts that the given object is callable (i.e., a function).
   *
   * @param obj - The object to check.
   * @param message - The error message to include in the exception if the assertion fails.
   * @throws AssertionException - If the object is not callable.
   */
  if (typeof obj !== "function") {
    throw new AssertionException(`${message}`);
  }
}

export function assertNotDeepInclude<T>(
  collection: T[],
  element: T,
  message: string = `Collection deeply includes object`
): void {
  /**
   * Asserts that the given element is not deeply included in the collection.
   *
   * @param collection - The collection to check.
   * @param element - The element to check for.
   * @param message - The error message to include in the exception if the assertion fails.
   * @throws AssertionException - If the collection deeply includes the element.
   */
  if (_.some(collection, (item: T) => _.isEqual(item, element))) {
    throw new AssertionException(
      `${message} Collection deeply includes: ${JSON.stringify(element)}`
    );
  }
}

export function assertDeepInclude<T>(
  collection: T[],
  element: T,
  message: string = `Collection does not include object`
): void {
  /**
   * Asserts that the given element is deeply included in the collection.
   *
   * @param collection - The collection to check.
   * @param element - The element to check for.
   * @param message - The error message to include in the exception if the assertion fails.
   * @throws AssertionException - If the collection does not deeply include the element.
   */
  if (!_.some(collection, (item: T) => _.isEqual(item, element))) {
    throw new AssertionException(
      `${message} Collection does not deeply include: ${JSON.stringify(
        element
      )}`
    );
  }
}

export function assertNestedInclude<T>(
  collection: T[],
  nestedElement: any,
  message: string = `Collection does not include nested element or element is null`
): void {
  /**
   * Asserts that the given nested element is included in the collection.
   *
   * @param collection - The collection to check.
   * @param nestedElement - The nested element to check for.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the nested element is not included in the collection.
   */
  for (const element of collection) {
    // Handle case where element might be null or undefined
    if (element == null) {
      throw new AssertionException(`Element: ${element} is null`);
    }

    if (Array.isArray(element)) {
      if (element.includes(nestedElement)) {
        return;
      }
    } else if (typeof element === "object") {
      if (nestedElement in element) {
        return;
      }
    }
  }

  throw new AssertionException(
    `${message} Collection does not include nested element: ${JSON.stringify(
      nestedElement
    )}`
  );
}

export function assertNotNestedInclude<T>(
  collection: T[],
  nestedElement: any,
  message: string = `Collection includes the nested element`
): void {
  /**
   * Asserts that the given nested element is not included in the collection.
   *
   * @param collection - The collection to check.
   * @param nestedElement - The nested element to check for.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the nested element is found in the collection.
   */
  for (const element of collection) {
    // Handle case where element might be null or undefined
    if (element == null) {
      throw new AssertionException(`Element: ${element} is null`);
    }

    if (Array.isArray(element)) {
      if (element.includes(nestedElement)) {
        throw new AssertionException(
          `${message} Collection includes the nested element: ${JSON.stringify(
            nestedElement
          )}`
        );
      }
    } else if (typeof element === "object") {
      if (nestedElement in element) {
        throw new AssertionException(
          `${message} Collection includes the nested element: ${JSON.stringify(
            nestedElement
          )}`
        );
      }
    }
  }
  // No need to throw an exception if the element is not found; the function completes successfully.
}

export function assertCloseTo(
  actual: number,
  expected: number,
  delta: number,
  message: string = `Actual value is not within the delta of the expected value`
): void {
  /**
   * Asserts that the actual value is close to the expected value within a given delta.
   *
   * @param actual - The actual value.
   * @param expected - The expected value.
   * @param delta - The acceptable delta.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the actual value is not within the delta of the expected value.
   */
  if (Math.abs(actual - expected) > delta) {
    throw new AssertionException(
      `${message} Expected: ${actual} to be close to: ${expected} within: ${delta}`
    );
  }
}

export function assertNotCloseTo(
  actual: number,
  expected: number,
  delta: number,
  message: string = `Actual value is within the delta of the expected value`
): void {
  /**
   * Asserts that the actual value is not close to the expected value within a given delta.
   *
   * @param actual - The actual value.
   * @param expected - The expected value.
   * @param delta - The acceptable delta.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the actual value is within the delta of the expected value.
   */
  if (Math.abs(actual - expected) <= delta) {
    throw new AssertionException(
      `${message} Expected: ${actual} to not be close to: ${expected} within: ${delta}`
    );
  }
}

export function assertCollectionsSameMembers<T>(
  collection1: T[],
  collection2: T[],
  message: string = `Collections do not have the same members`
): void {
  /**
   * Asserts that two collections have the same members.
   *
   * @param collection1 - The first collection.
   * @param collection2 - The second collection.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the collections do not have the same members.
   */
  const set1 = new Set(collection1);
  const set2 = new Set(collection2);

  if (set1.size !== set2.size || [...set1].some((item) => !set2.has(item))) {
    throw new AssertionException(`${message}`);
  }
}

export function assertCollectionNotSameMembers<T>(
  collection1: T[],
  collection2: T[],
  message: string = `Collections have the same members, but they should not.`
): void {
  /**
   * Asserts that two collections do not have the same members.
   *
   * @param collection1 - The first collection.
   * @param collection2 - The second collection.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the collections have the same members.
   */
  const set1 = new Set(collection1);
  const set2 = new Set(collection2);

  if (set1.size === set2.size && [...set1].every((item) => set2.has(item))) {
    throw new AssertionException(`${message}`);
  }
}

export function assertIsIncrementOf(
  value: number,
  reference: number,
  message: string = `Value is not an increment of the reference value.`
): void {
  /**
   * Asserts that the value is exactly one greater than the reference value.
   *
   * @param value - The value to check.
   * @param reference - The reference value.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the value is not an increment of the reference value.
   */
  if (value !== reference + 1) {
    throw new AssertionException(
      `${message} Expected: ${value} to be increment of: ${reference}`
    );
  }
}

export function assertIsNotIncrementOf(
  value: number,
  reference: number,
  message: string = `Value is exactly one greater than the reference value.`
): void {
  /**
   * Asserts that the value is not exactly one greater than the reference value.
   *
   * @param value - The value to check.
   * @param reference - The reference value.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the value is exactly one greater than the reference value.
   */
  if (value === reference + 1) {
    throw new AssertionException(
      `${message} Expected: ${value} to not be increment of: ${reference}`
    );
  }
}

export function assertNotIncrementOf(
  value: number,
  reference: number,
  message: string = `value is exactly one greater than the reference value.`
): void {
  /**
   * Asserts that the value is not exactly one greater than the reference value.
   *
   * @param value - The value to check.
   * @param reference - The reference value.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the value is exactly one greater than the reference value.
   */
  if (value === reference + 1) {
    throw new AssertionException(
      `${message} Expected: ${value} not to be increment of: ${reference}`
    );
  }
}

export function assertIsDecrementOf(
  value: number,
  reference: number,
  message: string = `Value is not exactly one less than the reference value.`
): void {
  /**
   * Asserts that the value is exactly one less than the reference value.
   *
   * @param value - The value to check.
   * @param reference - The reference value.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the value is not exactly one less than the reference value.
   */
  if (value !== reference - 1) {
    throw new AssertionException(
      `${message} Expected: ${value} to be decrement of: ${reference}`
    );
  }
}

export function assertNotDecrementOf(
  value: number,
  reference: number,
  message: string = `Value is exactly one less than the reference value.`
): void {
  /**
   * Asserts that the value is not exactly one less than the reference value.
   *
   * @param value - The value to check.
   * @param reference - The reference value.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the value is exactly one less than the reference value.
   */
  if (value === reference - 1) {
    throw new AssertionException(
      `${message} Expected: ${value} not to be decrement of: ${reference}`
    );
  }
}

export function assertZero(
  value: number,
  message: string = `Expected value is not zero`
): void {
  /**
   * Asserts that the value is zero.
   *
   * @param value - The value to check.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the value is not zero.
   */
  if (value !== 0) {
    throw new AssertionException(`${message} Expected: ${value} to be zero`);
  }
}

export function assertNotZero(
  value: number,
  message: string = `Expected value is zero`
): void {
  /**
   * Asserts that the value is not zero.
   *
   * @param value - The value to check.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the value is zero.
   */
  if (value === 0) {
    throw new AssertionException(
      `${message} Expected: ${value} not to be zero`
    );
  }
}

export function assertPositive(
  value: number,
  message: string = `Value is not positive`
): void {
  /**
   * Asserts that the value is positive.
   *
   * @param value - The value to check.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the value is not positive.
   */
  if (value <= 0) {
    throw new AssertionException(
      `${message} Expected: ${value} to be positive`
    );
  }
}

export function assertNegative(
  value: number,
  message: string = `Value is not negative`
): void {
  /**
   * Asserts that the value is negative.
   *
   * @param value - The value to check.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the value is not negative.
   */
  if (value >= 0) {
    throw new AssertionException(
      `${message} Expected: ${value} to be negative`
    );
  }
}

export function assertOdd(
  value: number,
  message: string = `Value is not odd`
): void {
  /**
   * Asserts that the value is odd.
   *
   * @param value - The value to check.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the value is not odd.
   */
  if (value % 2 !== 1) {
    throw new AssertionException(`${message} Expected: ${value} to be odd`);
  }
}

export function assertEven(
  value: number,
  message: string = `Value is not even`
): void {
  /**
   * Asserts that the value is even.
   *
   * @param value - The value to check.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the value is not even.
   */
  if (value % 2 !== 0) {
    throw new AssertionException(`${message} Expected: ${value} to be even`);
  }
}

export function assertValidUrl(
  url: string,
  message: string = `String is not a valid URL`
): void {
  /**
   * Asserts that the given string is a valid URL.
   *
   * @param url - The URL to check.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the string is not a valid URL.
   */
  const urlPattern = /^https?:\/\/\S+$/;
  if (!urlPattern.test(url)) {
    throw new AssertionException(`${message}`);
  }
}

export function assertValidEmail(
  email: string,
  message: string = `Email address is not valid`
): void {
  /**
   * Asserts that the given string is a valid email address.
   *
   * @param email - The email address to check.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the email address is not valid.
   */
  const emailPattern =
    /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailPattern.test(email)) {
    throw new AssertionException(`${message}`);
  }
}

export function assertIsArray(
  obj: unknown,
  message: string = `Object is not an array`
): void {
  /**
   * Asserts that the given object is a list (array).
   *
   * @param obj - The object to check.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the object is not an array.
   */
  if (!Array.isArray(obj)) {
    throw new AssertionException(`${message}`);
  }
}

export function assertIsNotArray(
  obj: unknown,
  message: string = `Object is an array, but should not be`
): void {
  /**
   * Asserts that the given object is not a list (array).
   *
   * @param obj - The object to check.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the object is an array.
   */
  if (Array.isArray(obj)) {
    throw new AssertionException(`${message}`);
  }
}

export function assertArrayLength(
  array: Array<any> | Uint8Array | ArrayBuffer, // Accepts standard arrays and typed arrays
  expectedLength: number,
  message: string = `Expected array length is different than actual array length`
): void {
  /**
   * Asserts that the length of the array matches the expected length.
   *
   * @param array - The array to check. Can be a standard array or a typed array (like Uint8Array).
   * @param expectedLength - The expected length of the array.
   * @param message - The error message if the assertion fails.
   * @throws {Error} - If the length of the array does not match the expected length.
   */

  // If the array is an ArrayBuffer, use its byte length
  const length =
    array instanceof ArrayBuffer
      ? (array as ArrayBuffer).byteLength
      : (array as { length: number }).length;

  if (length !== expectedLength) {
    throw new Error(
      `${message} Expected array length: ${expectedLength}, but was: ${length}`
    );
  }
}

export function assertObjectIsEmpty(
  obj: {} | any[], // Explicitly specify object or array
  message: string = `Expected empty object, but was not.`
): void {
  /**
   * Asserts that the given object (dict, array, or string) is empty.
   *
   * @param obj - The object to check.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the object is not empty.
   */
  if (
    (typeof obj === "object" &&
      !Array.isArray(obj) &&
      obj !== null &&
      Object.keys(obj).length > 0) ||
    (Array.isArray(obj) && obj.length > 0) ||
    (typeof obj === "string" && obj.length > 0)
  ) {
    throw new AssertionException(message);
  }
}

export function assertObjectIsNotEmpty(
  obj: object | any[] | string, // Adjusted type to include arrays and strings
  message: string = `Expected non-empty object, array, or string, but was empty.`
): void {
  /**
   * Asserts that the given object (dict), array, or string is not empty.
   *
   * @param obj - The object to check.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the object is empty.
   */
  if (
    (typeof obj === "object" &&
      obj !== null &&
      !Array.isArray(obj) &&
      Object.keys(obj).length === 0) ||
    (Array.isArray(obj) && obj.length === 0) ||
    (typeof obj === "string" && obj.length === 0)
  ) {
    throw new AssertionException(message);
  }
}

export function assertObjectIncludes(
  obj: Record<string, any>,
  value: any,
  message: string = `Object does not include value`
): void {
  /**
   * Asserts that the given object (dict) includes the specified value.
   *
   * @param obj - The dictionary to check.
   * @param value - The value to check for.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the object does not include the value.
   */
  if (!Object.values(obj).includes(value)) {
    throw new AssertionException(
      `${message} Object does not include value: ${value}`
    );
  }
}

export function assertStringIsEmpty(
  s: string,
  message: string = `Expected empty string, but was not.`
): void {
  /**
   * Asserts that the given string is empty.
   *
   * @param s - The string to check.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the string is not empty.
   */
  if (s.length > 0) {
    throw new AssertionException(`${message}`);
  }
}

export function assertStringIsNotEmpty(
  s: string,
  message: string = `Expected non-empty string, but was empty.`
): void {
  /**
   * Asserts that the given string is not empty.
   *
   * @param s - The string to check.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the string is empty.
   */
  if (s.length === 0) {
    throw new AssertionException(`${message}`);
  }
}

export function assertFunctionThrows(
  func: () => void,
  expectedException: new (...args: any[]) => Error,
  message: string = `The function does not throw the expected exception.`
): void {
  /**
   * Asserts that the given function throws the expected exception.
   *
   * @param func - The function to call.
   * @param expectedException - The expected exception type.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the function does not throw the expected exception.
   */
  try {
    func();
  } catch (e) {
    if (e instanceof expectedException) {
      return;
    }
    // Using type assertion to safely access error properties
    throw new AssertionException(
      `${message} Expected exception: ${expectedException.name}, but was: ${
        e instanceof Error ? e.constructor.name : "unknown"
      }`
    );
  }
  throw new AssertionException(
    `${message} Expected exception, but none was thrown.`
  );
}

export function assertFunctionDoesNotThrow(
  func: () => void,
  message: string = `Expected no exception, but caught an exception.`
): void {
  /**
   * Asserts that the given function does not throw any exception.
   *
   * @param func - The function to call.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the function throws an exception.
   */
  try {
    func();
  } catch (e: unknown) {
    // Type assertion to ensure 'e' is an instance of Error
    const error = e as Error;
    throw new AssertionException(
      `${message} Expected no exception, but caught: ${error.name}: ${error.message}`
    );
  }
}

export function assertFunctionReturns<T>(
  expectedValue: T,
  func: () => T,
  message: string = `Function does not return the expected value.`
): void {
  /**
   * Asserts that the given function returns the expected value.
   *
   * @param expectedValue - The expected return value.
   * @param func - The function to call.
   * @param message - The error message if the assertion fails.
   * @throws AssertionException - If the function does not return the expected value.
   */
  const result = func();
  if (result !== expectedValue) {
    throw new AssertionException(
      `${message} Expected return: ${expectedValue}, but was: ${result}`
    );
  }
}

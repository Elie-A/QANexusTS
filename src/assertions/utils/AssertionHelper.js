"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertIsNumber = assertIsNumber;
exports.assertIsNotNumber = assertIsNotNumber;
exports.assertEquals = assertEquals;
exports.assertNotEquals = assertNotEquals;
exports.assertDeepEquals = assertDeepEquals;
exports.assertNotDeepEquals = assertNotDeepEquals;
exports.assertIsTrue = assertIsTrue;
exports.assertIsFalse = assertIsFalse;
exports.assertThrows = assertThrows;
exports.assertIsTypeOf = assertIsTypeOf;
exports.assertInRange = assertInRange;
exports.assertNotInRange = assertNotInRange;
exports.assertInRangeIncluded = assertInRangeIncluded;
exports.assertNotInRangeIncluded = assertNotInRangeIncluded;
exports.assertCollectionContains = assertCollectionContains;
exports.assertCollectionNotContains = assertCollectionNotContains;
exports.assertDisjoint = assertDisjoint;
exports.assertIsNullOrUndefined = assertIsNullOrUndefined;
exports.assertIsNotNullOrUndefined = assertIsNotNullOrUndefined;
exports.assertObjectHasProperty = assertObjectHasProperty;
exports.assertHasPropertyValue = assertHasPropertyValue;
exports.assertEmptyObject = assertEmptyObject;
exports.assertGreaterThan = assertGreaterThan;
exports.assertGreaterThanOrEqual = assertGreaterThanOrEqual;
exports.assertLessThan = assertLessThan;
exports.assertLessThanOrEqual = assertLessThanOrEqual;
exports.assertObjectHasKeys = assertObjectHasKeys;
exports.assertIsCollectionEmpty = assertIsCollectionEmpty;
exports.assertCollectionIsNotEmpty = assertCollectionIsNotEmpty;
exports.assertCollectionLength = assertCollectionLength;
exports.assertStringLength = assertStringLength;
exports.assertStringContains = assertStringContains;
exports.assertStringStartsWith = assertStringStartsWith;
exports.assertStringEndsWith = assertStringEndsWith;
exports.assertStringMatchesRegex = assertStringMatchesRegex;
exports.assertStringNotMatchesRegex = assertStringNotMatchesRegex;
exports.assertInstanceOf = assertInstanceOf;
exports.assertDate = assertDate;
exports.assertDateFormat = assertDateFormat;
exports.assertIsFunction = assertIsFunction;
exports.assertNotDeepInclude = assertNotDeepInclude;
exports.assertDeepInclude = assertDeepInclude;
exports.assertNestedInclude = assertNestedInclude;
exports.assertNotNestedInclude = assertNotNestedInclude;
exports.assertCloseTo = assertCloseTo;
exports.assertNotCloseTo = assertNotCloseTo;
exports.assertCollectionsSameMembers = assertCollectionsSameMembers;
exports.assertCollectionNotSameMembers = assertCollectionNotSameMembers;
exports.assertIsIncrementOf = assertIsIncrementOf;
exports.assertIsNotIncrementOf = assertIsNotIncrementOf;
exports.assertNotIncrementOf = assertNotIncrementOf;
exports.assertIsDecrementOf = assertIsDecrementOf;
exports.assertNotDecrementOf = assertNotDecrementOf;
exports.assertZero = assertZero;
exports.assertNotZero = assertNotZero;
exports.assertPositive = assertPositive;
exports.assertNegative = assertNegative;
exports.assertOdd = assertOdd;
exports.assertEven = assertEven;
exports.assertValidUrl = assertValidUrl;
exports.assertValidEmail = assertValidEmail;
exports.assertIsArray = assertIsArray;
exports.assertIsNotArray = assertIsNotArray;
exports.assertArrayLength = assertArrayLength;
exports.assertObjectIsEmpty = assertObjectIsEmpty;
exports.assertObjectIsNotEmpty = assertObjectIsNotEmpty;
exports.assertObjectIncludes = assertObjectIncludes;
exports.assertStringIsEmpty = assertStringIsEmpty;
exports.assertStringIsNotEmpty = assertStringIsNotEmpty;
exports.assertFunctionThrows = assertFunctionThrows;
exports.assertFunctionDoesNotThrow = assertFunctionDoesNotThrow;
exports.assertFunctionReturns = assertFunctionReturns;
const lodash_1 = __importDefault(require("lodash"));
const date_fns_1 = require("date-fns");
const AssertionException_1 = require("./AssertionException");
/**
 * Asserts that the provided object is a number. If not, throws an AssertionException.
 *
 * @param obj The object to be checked.
 * @param message Optional message to be used for the exception. If not provided, a default message will be used.
 */
function assertIsNumber(obj, message = `Expected a number but received ${typeof obj}`) {
    // Check if the object is not a number
    if (typeof obj !== "number" || Number.isNaN(obj)) {
        // Throw AssertionException with the provided or default message
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertIsNotNumber(obj, message = `Expected not a number but was number`) {
    /**
     * Asserts that the given object is not an instance of a number.
     *
     * @param obj - The object to check.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the object is a number.
     */
    if (typeof obj === "number") {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertEquals(expected, actual, message = `Expected: ${expected}, but was: ${actual}`) {
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
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertNotEquals(expected, actual, message = `Expected objects to be different but both were null or equal`) {
    /**
     * Asserts that two objects are not equal.
     *
     * @param expected - The object that is expected to be different.
     * @param actual - The actual object.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the objects are equal.
     */
    if (expected === null && actual === null) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
    if (expected === actual) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertDeepEquals(expected, actual, message = `Expected: ${JSON.stringify(expected)}, but was: ${JSON.stringify(actual)}`) {
    /**
     * Asserts that two objects are deeply equal.
     *
     * @param expected - The expected object.
     * @param actual - The actual object.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the objects are not deeply equal.
     */
    if (JSON.stringify(expected) !== JSON.stringify(actual)) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertNotDeepEquals(expected, actual, message = `Expected objects to be different, but both were deeply equal: ${JSON.stringify(actual)}`) {
    /**
     * Asserts that two objects are not deeply equal.
     *
     * @param expected - The object that is expected to be different.
     * @param actual - The actual object.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the objects are deeply equal.
     */
    if (JSON.stringify(expected) === JSON.stringify(actual)) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertIsTrue(condition, message = `Expected true but was false`) {
    /**
     * Asserts that a condition is true.
     *
     * @param condition - The condition to check.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the condition is false.
     */
    if (!condition) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertIsFalse(condition, message = `Expected false but was true`) {
    /**
     * Asserts that a condition is false.
     *
     * @param condition - The condition to check.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the condition is true.
     */
    if (condition) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertThrows(runnable, message = `Expected function to throw an exception but none was thrown`) {
    /**
     * Asserts that executing the given function throws an exception.
     *
     * @param runnable - The function to execute.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If no exception is thrown.
     */
    try {
        runnable();
    }
    catch (e) {
        return; // Successfully caught an exception
    }
    throw new AssertionException_1.AssertionException(message);
}
function assertIsTypeOf(expectedType, obj, message = `Expected type: ${expectedType.name}, but was: ${obj.constructor.name}`) {
    /**
     * Asserts that the given object is an instance of the specified class.
     *
     * @param expectedType - The expected class type.
     * @param obj - The object to check.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the object is not an instance of the expected class.
     */
    if (!(obj instanceof expectedType)) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertInRange(value, minValue, maxValue, message = `Expected: ${minValue} < ${value} < ${maxValue}`) {
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
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertNotInRange(value, minValue, maxValue, message = `Expected: ${value} to not be in range (${minValue}, ${maxValue})`) {
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
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertInRangeIncluded(value, minValue, maxValue, message = `Expected: ${minValue} <= ${value} <= ${maxValue}`) {
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
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertNotInRangeIncluded(value, minValue, maxValue, message = `Expected: ${value} to not be in range [${minValue}, ${maxValue}]`) {
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
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertCollectionContains(collection, element, message = ` Collection does not contain: ${element}`) {
    /**
     * Asserts that a collection contains the specified element.
     *
     * @param collection - The collection to check.
     * @param element - The element to check for in the collection.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the element is not in the collection.
     */
    if (!collection.includes(element)) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertCollectionNotContains(collection, element, message = `Collection contains: ${element}`) {
    /**
     * Asserts that a collection does not contain the specified element.
     *
     * @param collection - The collection to check.
     * @param element - The element to ensure is not in the collection.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the element is found in the collection.
     */
    if (collection.includes(element)) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertDisjoint(collection1, collection2, message = `Collection are not disjoint there are common elements`) {
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
        throw new AssertionException_1.AssertionException(`${message} Collections are not disjoint; common element(s): ${intersection}`);
    }
}
function assertIsNullOrUndefined(obj, message = `Expected null or undefined but was defined`) {
    /**
     * Asserts that an object is either null or undefined (not set).
     *
     * @param obj - The object to check.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the object is neither null nor undefined.
     */
    if (obj !== null && obj !== undefined) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertIsNotNullOrUndefined(obj, message = `Expected defined object but was null or undefined`) {
    /**
     * Asserts that an object is not null or undefined.
     *
     * @param obj - The object to check.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the object is null or undefined.
     */
    if (obj === null || obj === undefined) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertObjectHasProperty(obj, propertyName, message = "Missing property or object is invalid or null") {
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
            throw new AssertionException_1.AssertionException(`${message} Object does not have property: ${propertyName}`);
        }
    }
    else {
        throw new AssertionException_1.AssertionException(`${message} Object is not a valid object or is null.`);
    }
}
function assertHasPropertyValue(obj, fieldName, expectedValue, message = `Error: the object does not have the property or the property value does not match the expected value`) {
    /**
     * Asserts that an object has a specified property with a given value.
     *
     * @param obj - The object to check.
     * @param fieldName - The name of the property to check.
     * @param expectedValue - The expected value of the property.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the object does not have the property or the property value does not match the expected value.
     */
    let actualValue;
    if (typeof obj === "object" && obj !== null) {
        // Check for properties in objects and dictionaries
        if (obj.hasOwnProperty(fieldName)) {
            actualValue = obj[fieldName];
        }
        else {
            throw new AssertionException_1.AssertionException(`${message} Object does not have property: ${fieldName}`);
        }
    }
    else {
        throw new AssertionException_1.AssertionException(`${message} Object is not a valid object or is null.`);
    }
    if (actualValue !== expectedValue) {
        throw new AssertionException_1.AssertionException(`${message} Expected value for '${fieldName}' was ${expectedValue}, but got ${actualValue}`);
    }
}
function assertEmptyObject(obj, message = `Error: Object is not empty`) {
    /**
     * Asserts that an object (dict, collection, or string) is empty.
     *
     * @param obj - The object to check. Can be an object, array, string, or null/undefined.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the object is not empty.
     */
    if (obj === null || obj === undefined) {
        throw new AssertionException_1.AssertionException(`${message} Expected non-empty object, but got null or undefined.`);
    }
    if (typeof obj === "object") {
        if (Array.isArray(obj)) {
            if (obj.length > 0) {
                throw new AssertionException_1.AssertionException(`${message} Expected empty array, but was not.`);
            }
        }
        else if (obj instanceof Map || obj instanceof Set) {
            if (obj.size > 0) {
                throw new AssertionException_1.AssertionException(`${message} Expected empty Map or Set, but was not.`);
            }
        }
        else {
            // For plain objects (not null, arrays, Map, or Set)
            if (Object.keys(obj).length > 0) {
                throw new AssertionException_1.AssertionException(`${message} Expected empty object, but was not.`);
            }
        }
    }
    else if (typeof obj === "string") {
        if (obj.length > 0) {
            throw new AssertionException_1.AssertionException(`${message} Expected empty string, but was not.`);
        }
    }
    else {
        throw new AssertionException_1.AssertionException(`${message} Object type is not supported.`);
    }
}
function assertGreaterThan(value, reference, message = `Actual value is <= Expected value`) {
    /**
     * Asserts that a number is greater than a specified reference value.
     *
     * @param value - The value to check.
     * @param reference - The reference value to compare against.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the value is not greater than the reference.
     */
    if (value <= reference) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} > ${reference}`);
    }
}
function assertGreaterThanOrEqual(value, reference, message = `Actual value is < expected value`) {
    /**
     * Asserts that a number is greater than or equal to a specified reference value.
     *
     * @param value - The value to check.
     * @param reference - The reference value to compare against.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the value is less than the reference.
     */
    if (value < reference) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} >= ${reference}`);
    }
}
function assertLessThan(value, reference, message = `Actual value is >= expected value`) {
    /**
     * Asserts that a number is less than a specified reference value.
     *
     * @param value - The value to check.
     * @param reference - The reference value to compare against.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the value is not less than the reference.
     */
    if (value >= reference) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} < ${reference}`);
    }
}
function assertLessThanOrEqual(value, reference, message = `Expected value <= actual value`) {
    /**
     * Asserts that a number is less than or equal to a specified reference value.
     *
     * @param value - The value to check.
     * @param reference - The reference value to compare against.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the value is greater than the reference.
     */
    if (value > reference) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} <= ${reference}`);
    }
}
function assertObjectHasKeys(obj, keys, message = `Object is missing key(s)`) {
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
        throw new AssertionException_1.AssertionException(`${message} Object is missing key(s): ${missingKeys.join(", ")}`);
    }
}
function assertIsCollectionEmpty(collection, message = `Expected empty collection, but was not.`) {
    /**
     * Asserts that a collection is empty.
     *
     * @param collection - The collection to check. Must be an array.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the collection is not empty.
     */
    if (collection.length > 0) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertCollectionIsNotEmpty(collection, message = `Expected non-empty collection, but was empty.`) {
    /**
     * Asserts that a collection is not empty.
     *
     * @param collection - The collection to check. Must be an array.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the collection is empty.
     */
    if (collection.length === 0) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertCollectionLength(collection, expectedLength, message = `Expected length is not equal to collection length`) {
    /**
     * Asserts that a collection has a specified length.
     *
     * @param collection - The collection to check. Must be an array.
     * @param expectedLength - The expected length of the collection.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the collection length does not match the expected length.
     */
    if (collection.length !== expectedLength) {
        throw new AssertionException_1.AssertionException(`${message} Expected length: ${expectedLength}, but was: ${collection.length}`);
    }
}
function assertStringLength(string, expectedLength, message = `Expected length not equal to actual length`) {
    /**
     * Asserts that a string has a specified length.
     *
     * @param string - The string to check.
     * @param expectedLength - The expected length of the string.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the string length does not match the expected length.
     */
    if (string.length !== expectedLength) {
        throw new AssertionException_1.AssertionException(`${message} Expected length: ${expectedLength}, but was: ${string.length}`);
    }
}
function assertStringContains(string, substring, message = `String does not contain given substring`) {
    /**
     * Asserts that a string contains a specified substring.
     *
     * @param string - The string to check.
     * @param substring - The substring to check for.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the string does not contain the substring.
     */
    if (!string.includes(substring)) {
        throw new AssertionException_1.AssertionException(`${message} String does not contain: ${substring}`);
    }
}
function assertStringStartsWith(string, prefix, message = `String does not start with given prefix`) {
    /**
     * Asserts that a string starts with a specified prefix.
     *
     * @param string - The string to check.
     * @param prefix - The prefix to check for.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the string does not start with the prefix.
     */
    if (!string.startsWith(prefix)) {
        throw new AssertionException_1.AssertionException(`${message} String does not start with: ${prefix}`);
    }
}
function assertStringEndsWith(string, suffix, message = `String does not end with given suffix`) {
    /**
     * Asserts that a string ends with a specified suffix.
     *
     * @param string - The string to check.
     * @param suffix - The suffix to check for.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the string does not end with the suffix.
     */
    if (!string.endsWith(suffix)) {
        throw new AssertionException_1.AssertionException(`${message} String does not end with: ${suffix}`);
    }
}
function assertStringMatchesRegex(string, regex, message = `String does not match give pattern`) {
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
        throw new AssertionException_1.AssertionException(`${message} String does not match pattern: ${regex}`);
    }
}
function assertStringNotMatchesRegex(string, regex, message = `String matches give pattern`) {
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
        throw new AssertionException_1.AssertionException(`${message} String matches pattern: ${regex}`);
    }
}
function assertInstanceOf(expectedClass, obj, message = `Object is not an instance of class`) {
    /**
     * Asserts that an object is an instance of a specified class.
     *
     * @param expectedClass - The class that the object is expected to be an instance of.
     * @param obj - The object to check.
     * @param message - The message to include in the exception if the assertion fails.
     * @throws AssertionException - If the object is not an instance of the expected class.
     */
    if (!(obj instanceof expectedClass)) {
        throw new AssertionException_1.AssertionException(`${message} Object is not an instance of: ${expectedClass.name}`);
    }
}
function assertDate(obj, message = `Object is not a Date`) {
    /**
     * Asserts that the given object is a Date.
     *
     * @param obj - The object to check.
     * @param message - The error message to include in the exception if the assertion fails.
     * @throws AssertionException - If the object is not a Date.
     */
    if (!(obj instanceof Date)) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertDateFormat(date, format, message = `Date does not match format`) {
    /**
     * Asserts that the given date string matches the specified format.
     *
     * @param date - The date string to check.
     * @param format - The format string to compare against.
     * @param message - The error message to include in the exception if the assertion fails.
     * @throws AssertionException - If the date string does not match the format.
     */
    // Date parsing with format validation
    const parsedDate = (0, date_fns_1.parse)(date, format, new Date());
    if (!(0, date_fns_1.isValid)(parsedDate)) {
        throw new AssertionException_1.AssertionException(`${message} Date does not match format: ${format}`);
    }
}
function assertIsFunction(obj, message = `Object is not callable`) {
    /**
     * Asserts that the given object is callable (i.e., a function).
     *
     * @param obj - The object to check.
     * @param message - The error message to include in the exception if the assertion fails.
     * @throws AssertionException - If the object is not callable.
     */
    if (typeof obj !== "function") {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertNotDeepInclude(collection, element, message = `Collection deeply includes object`) {
    /**
     * Asserts that the given element is not deeply included in the collection.
     *
     * @param collection - The collection to check.
     * @param element - The element to check for.
     * @param message - The error message to include in the exception if the assertion fails.
     * @throws AssertionException - If the collection deeply includes the element.
     */
    if (lodash_1.default.some(collection, (item) => lodash_1.default.isEqual(item, element))) {
        throw new AssertionException_1.AssertionException(`${message} Collection deeply includes: ${JSON.stringify(element)}`);
    }
}
function assertDeepInclude(collection, element, message = `Collection does not include object`) {
    /**
     * Asserts that the given element is deeply included in the collection.
     *
     * @param collection - The collection to check.
     * @param element - The element to check for.
     * @param message - The error message to include in the exception if the assertion fails.
     * @throws AssertionException - If the collection does not deeply include the element.
     */
    if (!lodash_1.default.some(collection, (item) => lodash_1.default.isEqual(item, element))) {
        throw new AssertionException_1.AssertionException(`${message} Collection does not deeply include: ${JSON.stringify(element)}`);
    }
}
function assertNestedInclude(collection, nestedElement, message = `Collection does not include nested element or element is null`) {
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
            throw new AssertionException_1.AssertionException(`Element: ${element} is null`);
        }
        if (Array.isArray(element)) {
            if (element.includes(nestedElement)) {
                return;
            }
        }
        else if (typeof element === "object") {
            if (nestedElement in element) {
                return;
            }
        }
    }
    throw new AssertionException_1.AssertionException(`${message} Collection does not include nested element: ${JSON.stringify(nestedElement)}`);
}
function assertNotNestedInclude(collection, nestedElement, message = `Collection includes the nested element`) {
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
            throw new AssertionException_1.AssertionException(`Element: ${element} is null`);
        }
        if (Array.isArray(element)) {
            if (element.includes(nestedElement)) {
                throw new AssertionException_1.AssertionException(`${message} Collection includes the nested element: ${JSON.stringify(nestedElement)}`);
            }
        }
        else if (typeof element === "object") {
            if (nestedElement in element) {
                throw new AssertionException_1.AssertionException(`${message} Collection includes the nested element: ${JSON.stringify(nestedElement)}`);
            }
        }
    }
    // No need to throw an exception if the element is not found; the function completes successfully.
}
function assertCloseTo(actual, expected, delta, message = `Actual value is not within the delta of the expected value`) {
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
        throw new AssertionException_1.AssertionException(`${message} Expected: ${actual} to be close to: ${expected} within: ${delta}`);
    }
}
function assertNotCloseTo(actual, expected, delta, message = `Actual value is within the delta of the expected value`) {
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
        throw new AssertionException_1.AssertionException(`${message} Expected: ${actual} to not be close to: ${expected} within: ${delta}`);
    }
}
function assertCollectionsSameMembers(collection1, collection2, message = `Collections do not have the same members`) {
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
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertCollectionNotSameMembers(collection1, collection2, message = `Collections have the same members, but they should not.`) {
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
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertIsIncrementOf(value, reference, message = `Value is not an increment of the reference value.`) {
    /**
     * Asserts that the value is exactly one greater than the reference value.
     *
     * @param value - The value to check.
     * @param reference - The reference value.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the value is not an increment of the reference value.
     */
    if (value !== reference + 1) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} to be increment of: ${reference}`);
    }
}
function assertIsNotIncrementOf(value, reference, message = `Value is exactly one greater than the reference value.`) {
    /**
     * Asserts that the value is not exactly one greater than the reference value.
     *
     * @param value - The value to check.
     * @param reference - The reference value.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the value is exactly one greater than the reference value.
     */
    if (value === reference + 1) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} to not be increment of: ${reference}`);
    }
}
function assertNotIncrementOf(value, reference, message = `value is exactly one greater than the reference value.`) {
    /**
     * Asserts that the value is not exactly one greater than the reference value.
     *
     * @param value - The value to check.
     * @param reference - The reference value.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the value is exactly one greater than the reference value.
     */
    if (value === reference + 1) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} not to be increment of: ${reference}`);
    }
}
function assertIsDecrementOf(value, reference, message = `Value is not exactly one less than the reference value.`) {
    /**
     * Asserts that the value is exactly one less than the reference value.
     *
     * @param value - The value to check.
     * @param reference - The reference value.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the value is not exactly one less than the reference value.
     */
    if (value !== reference - 1) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} to be decrement of: ${reference}`);
    }
}
function assertNotDecrementOf(value, reference, message = `Value is exactly one less than the reference value.`) {
    /**
     * Asserts that the value is not exactly one less than the reference value.
     *
     * @param value - The value to check.
     * @param reference - The reference value.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the value is exactly one less than the reference value.
     */
    if (value === reference - 1) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} not to be decrement of: ${reference}`);
    }
}
function assertZero(value, message = `Expected value is not zero`) {
    /**
     * Asserts that the value is zero.
     *
     * @param value - The value to check.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the value is not zero.
     */
    if (value !== 0) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} to be zero`);
    }
}
function assertNotZero(value, message = `Expected value is zero`) {
    /**
     * Asserts that the value is not zero.
     *
     * @param value - The value to check.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the value is zero.
     */
    if (value === 0) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} not to be zero`);
    }
}
function assertPositive(value, message = `Value is not positive`) {
    /**
     * Asserts that the value is positive.
     *
     * @param value - The value to check.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the value is not positive.
     */
    if (value <= 0) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} to be positive`);
    }
}
function assertNegative(value, message = `Value is not negative`) {
    /**
     * Asserts that the value is negative.
     *
     * @param value - The value to check.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the value is not negative.
     */
    if (value >= 0) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} to be negative`);
    }
}
function assertOdd(value, message = `Value is not odd`) {
    /**
     * Asserts that the value is odd.
     *
     * @param value - The value to check.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the value is not odd.
     */
    if (value % 2 !== 1) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} to be odd`);
    }
}
function assertEven(value, message = `Value is not even`) {
    /**
     * Asserts that the value is even.
     *
     * @param value - The value to check.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the value is not even.
     */
    if (value % 2 !== 0) {
        throw new AssertionException_1.AssertionException(`${message} Expected: ${value} to be even`);
    }
}
function assertValidUrl(url, message = `String is not a valid URL`) {
    /**
     * Asserts that the given string is a valid URL.
     *
     * @param url - The URL to check.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the string is not a valid URL.
     */
    const urlPattern = /^https?:\/\/\S+$/;
    if (!urlPattern.test(url)) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertValidEmail(email, message = `Email address is not valid`) {
    /**
     * Asserts that the given string is a valid email address.
     *
     * @param email - The email address to check.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the email address is not valid.
     */
    const emailPattern = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailPattern.test(email)) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertIsArray(obj, message = `Object is not an array`) {
    /**
     * Asserts that the given object is a list (array).
     *
     * @param obj - The object to check.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the object is not an array.
     */
    if (!Array.isArray(obj)) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertIsNotArray(obj, message = `Object is an array, but should not be`) {
    /**
     * Asserts that the given object is not a list (array).
     *
     * @param obj - The object to check.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the object is an array.
     */
    if (Array.isArray(obj)) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertArrayLength(array, expectedLength, message = `Expected array length is different than actual array length`) {
    /**
     * Asserts that the length of the array matches the expected length.
     *
     * @param array - The array to check.
     * @param expectedLength - The expected length of the array.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the length of the array does not match the expected length.
     */
    if (array.length !== expectedLength) {
        throw new AssertionException_1.AssertionException(`${message} Expected array length: ${expectedLength}, but was: ${array.length}`);
    }
}
function assertObjectIsEmpty(obj, // Explicitly specify object or array
message = `Expected empty object, but was not.`) {
    /**
     * Asserts that the given object (dict, array, or string) is empty.
     *
     * @param obj - The object to check.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the object is not empty.
     */
    if ((typeof obj === "object" &&
        !Array.isArray(obj) &&
        obj !== null &&
        Object.keys(obj).length > 0) ||
        (Array.isArray(obj) && obj.length > 0) ||
        (typeof obj === "string" && obj.length > 0)) {
        throw new AssertionException_1.AssertionException(message);
    }
}
function assertObjectIsNotEmpty(obj, // Adjusted type to include arrays and strings
message = `Expected non-empty object, array, or string, but was empty.`) {
    /**
     * Asserts that the given object (dict), array, or string is not empty.
     *
     * @param obj - The object to check.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the object is empty.
     */
    if ((typeof obj === "object" &&
        obj !== null &&
        !Array.isArray(obj) &&
        Object.keys(obj).length === 0) ||
        (Array.isArray(obj) && obj.length === 0) ||
        (typeof obj === "string" && obj.length === 0)) {
        throw new AssertionException_1.AssertionException(message);
    }
}
function assertObjectIncludes(obj, value, message = `Object does not include value`) {
    /**
     * Asserts that the given object (dict) includes the specified value.
     *
     * @param obj - The dictionary to check.
     * @param value - The value to check for.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the object does not include the value.
     */
    if (!Object.values(obj).includes(value)) {
        throw new AssertionException_1.AssertionException(`${message} Object does not include value: ${value}`);
    }
}
function assertStringIsEmpty(s, message = `Expected empty string, but was not.`) {
    /**
     * Asserts that the given string is empty.
     *
     * @param s - The string to check.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the string is not empty.
     */
    if (s.length > 0) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertStringIsNotEmpty(s, message = `Expected non-empty string, but was empty.`) {
    /**
     * Asserts that the given string is not empty.
     *
     * @param s - The string to check.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the string is empty.
     */
    if (s.length === 0) {
        throw new AssertionException_1.AssertionException(`${message}`);
    }
}
function assertFunctionThrows(func, expectedException, message = `The function does not throw the expected exception.`) {
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
    }
    catch (e) {
        if (e instanceof expectedException) {
            return;
        }
        // Using type assertion to safely access error properties
        throw new AssertionException_1.AssertionException(`${message} Expected exception: ${expectedException.name}, but was: ${e instanceof Error ? e.constructor.name : "unknown"}`);
    }
    throw new AssertionException_1.AssertionException(`${message} Expected exception, but none was thrown.`);
}
function assertFunctionDoesNotThrow(func, message = `Expected no exception, but caught an exception.`) {
    /**
     * Asserts that the given function does not throw any exception.
     *
     * @param func - The function to call.
     * @param message - The error message if the assertion fails.
     * @throws AssertionException - If the function throws an exception.
     */
    try {
        func();
    }
    catch (e) {
        // Type assertion to ensure 'e' is an instance of Error
        const error = e;
        throw new AssertionException_1.AssertionException(`${message} Expected no exception, but caught: ${error.name}: ${error.message}`);
    }
}
function assertFunctionReturns(expectedValue, func, message = `Function does not return the expected value.`) {
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
        throw new AssertionException_1.AssertionException(`${message} Expected return: ${expectedValue}, but was: ${result}`);
    }
}

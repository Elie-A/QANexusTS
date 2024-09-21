import { AssertionHelper } from "../index";

describe("AssertionHelper Tests", () => {
  it("should assert that array length is correct", () => {
    const array = [1, 2, 3];
    AssertionHelper.assertArrayLength(array, 3);
  });

  it("should assert that collection length is correct", () => {
    const array = ["a", "b", "c"];
    AssertionHelper.assertCollectionLength(array, 3);
  });

  it("should assert that the collection is not empty", () => {
    const array = ["a", "b", "c"];
    AssertionHelper.assertCollectionIsNotEmpty(array);
  });

  it("should assert that the collection contains a specific element", () => {
    const array = ["a", "b", "c"];
    AssertionHelper.assertCollectionContains(array, "a");
  });

  it("should assert that the collection does not contain a specific element", () => {
    const array = [1, 2, 3];
    AssertionHelper.assertCollectionNotContains(array, 4);
  });

  it("should assert that two collections have the same members", () => {
    const array_1 = [1, 2, 3];
    const array_2 = [2, 1, 3];
    AssertionHelper.assertCollectionsSameMembers(array_1, array_2);
  });

  it("should assert that two collections do not have the same members", () => {
    const array_1 = [1, 2, 4];
    const array_2 = [2, 1, 3];
    AssertionHelper.assertCollectionNotSameMembers(array_1, array_2);
  });

  it("should assert that actual value is close to expected value", () => {
    const actual = 10;
    const expected = 10.5;
    const delta = 0.6;
    AssertionHelper.assertCloseTo(actual, expected, delta);
  });

  it("should assert that actual value is not close to expected value", () => {
    const actual = 10;
    const expected = 10.5;
    const delta = 0.1;
    AssertionHelper.assertNotCloseTo(actual, expected, delta);
  });

  it("should assert that a value is greater than another", () => {
    AssertionHelper.assertGreaterThan(2, 1);
  });

  it("should assert that a value is greater than or equal to another", () => {
    AssertionHelper.assertGreaterThanOrEqual(2, 2);
  });

  it("should fail when a value is not greater than or equal to another", () => {
    AssertionHelper.assertGreaterThanOrEqual(3, 2);
  });

  it("should assert that a value is less than another", () => {
    AssertionHelper.assertLessThan(1, 2);
  });

  it("should assert that a value is less than or equal to another", () => {
    AssertionHelper.assertLessThanOrEqual(2, 2);
  });

  it("should assert that a value is positive", () => {
    AssertionHelper.assertPositive(3);
  });

  it("should assert that a value is negative", () => {
    AssertionHelper.assertNegative(-3);
  });

  it("should assert that a value is prime", () => {
    AssertionHelper.assertIsPrime(3);
  });

  it("should assert that a value is even", () => {
    AssertionHelper.assertIsEven(4);
  });

  it("should assert that a value is odd", () => {
    AssertionHelper.assertIsOdd(3);
  });

  it("should assert that two values are equal", () => {
    AssertionHelper.assertEquals(3, 3);
  });

  it("should assert that two strings are equal", () => {
    AssertionHelper.assertEquals("a", "a");
  });

  it("should assert that a condition is false", () => {
    let condition = 1 > 2;
    AssertionHelper.assertIsFalse(condition);
  });

  it("should assert that a condition is true", () => {
    let condition = 1 < 2;
    AssertionHelper.assertIsTrue(condition);
  });

  it("should assert that null is correctly identified", () => {
    AssertionHelper.assertIsTypeOf(null, "null");
  });

  it("should assert that arrays are correctly identified", () => {
    AssertionHelper.assertIsTypeOf([1, 2, 3], "array");
  });

  it("should assert that Uint8Array is correctly identified", () => {
    AssertionHelper.assertIsTypeOf(new Uint8Array(), "Uint8Array");
  });

  it("should assert that Uint16Array is correctly identified", () => {
    AssertionHelper.assertIsTypeOf(new Uint16Array(), "Uint16Array");
  });

  it("should assert that Map is correctly identified", () => {
    AssertionHelper.assertIsTypeOf(new Map(), "Map");
  });

  it("should assert that Set is correctly identified", () => {
    AssertionHelper.assertIsTypeOf(new Set(), "Set");
  });

  it("should assert that WeakMap is correctly identified", () => {
    AssertionHelper.assertIsTypeOf(new WeakMap(), "WeakMap");
  });

  it("should assert that WeakSet is correctly identified", () => {
    AssertionHelper.assertIsTypeOf(new WeakSet(), "WeakSet");
  });

  it("should assert that Date is correctly identified", () => {
    AssertionHelper.assertIsTypeOf(new Date(), "Date");
  });

  it("should assert that RegExp is correctly identified", () => {
    AssertionHelper.assertIsTypeOf(/abc/, "RegExp");
  });

  it("should assert that plain objects are correctly identified", () => {
    AssertionHelper.assertIsTypeOf({}, "object");
  });

  it("should assert that strings are correctly identified", () => {
    AssertionHelper.assertIsTypeOf("hello", "string");
  });

  it("should assert that numbers are correctly identified", () => {
    AssertionHelper.assertIsTypeOf(123, "number");
  });

  it("should assert that booleans are correctly identified", () => {
    AssertionHelper.assertIsTypeOf(true, "boolean");
  });

  it("should assert a valid Date", () => {
    const date = new Date();
    AssertionHelper.assertDate(date, "Expected a valid date");
  });

  it("should assert Date format", () => {
    const date = "2023-10-01";
    const format = "yyyy-MM-dd";
    AssertionHelper.assertDateFormat(date, format, "Date format mismatch");
  });

  it("should assert deep equality of objects", () => {
    const obj1 = { name: "John", age: 30 };
    const obj2 = { name: "John", age: 30 };
    AssertionHelper.assertDeepEquals(
      obj1,
      obj2,
      "Objects are not deeply equal"
    );
  });

  it("should assert deep inclusion of an element", () => {
    const collection = [{ id: 1 }, { id: 2 }];
    const element = { id: 1 };
    AssertionHelper.assertDeepInclude(
      collection,
      element,
      "Element not deeply included"
    );
  });

  it("should assert two collections are disjoint", () => {
    const collection1 = [1, 2, 3];
    const collection2 = [4, 5, 6];
    AssertionHelper.assertDisjoint(
      collection1,
      collection2,
      "Collections are not disjoint"
    );
  });

  it("should assert an object is empty", () => {
    const obj = {};
    AssertionHelper.assertEmptyObject(obj, "Object is not empty");
  });

  it("should assert that a function does not throw", () => {
    const func = () => {};
    AssertionHelper.assertFunctionDoesNotThrow(
      func,
      "Function threw an exception"
    );
  });

  it("should assert that a function returns the expected value", () => {
    const func = () => 42;
    AssertionHelper.assertFunctionReturns(
      42,
      func,
      "Function return value mismatch"
    );
  });

  it("should assert that a function throws an exception", () => {
    const func = () => {
      throw new Error("Test error");
    };
    AssertionHelper.assertFunctionThrows(
      func,
      Error,
      "Function did not throw the expected exception"
    );
  });

  it("should assert an object has a property value", () => {
    const obj = { name: "John" };
    AssertionHelper.assertHasPropertyValue(
      obj,
      "name",
      "John",
      "Object property value mismatch"
    );
  });

  it("should assert a value is in a range", () => {
    const value = 5;
    AssertionHelper.assertInRange(value, 1, 10, "Value is not in range");
  });

  it("should assert a value is in an inclusive range", () => {
    const value = 5;
    AssertionHelper.assertInRangeIncluded(
      value,
      5,
      10,
      "Value is not in the inclusive range"
    );
  });

  it("should assert an object is an instance of a class", () => {
    class Person {}
    const person = new Person();
    AssertionHelper.assertInstanceOf(
      Person,
      person,
      "Object is not an instance of the class"
    );
  });

  it("should assert a value is an array", () => {
    const array = [1, 2, 3];
    AssertionHelper.assertIsArray(array, "Object is not an array");
  });

  it("should assert a collection is empty", () => {
    const collection: unknown[] = [];
    AssertionHelper.assertIsCollectionEmpty(
      collection,
      "Collection is not empty"
    );
  });

  it("should assert a value is a decrement of another", () => {
    AssertionHelper.assertIsDecrementOf(
      9,
      10,
      "Value is not a decrement of reference"
    );
  });

  it("should assert a value is a function", () => {
    const func = () => {};
    AssertionHelper.assertIsFunction(func, "Object is not a function");
  });

  it("should assert a value is an increment of another", () => {
    AssertionHelper.assertIsIncrementOf(
      11,
      10,
      "Value is not an increment of reference"
    );
  });

  it("should assert a value is not an array", () => {
    const obj = {};
    AssertionHelper.assertIsNotArray(obj, "Object should not be an array");
  });

  it("should assert a value is not an increment of another", () => {
    AssertionHelper.assertIsNotIncrementOf(
      11,
      9,
      "Value is an increment of reference"
    );
  });

  it("should assert an object is not null or undefined", () => {
    const obj = {};
    AssertionHelper.assertIsNotNullOrUndefined(
      obj,
      "Object is null or undefined"
    );
  });

  it("should assert a value is not a number", () => {
    const obj = "not a number";
    AssertionHelper.assertIsNotNumber(obj, "Object should not be a number");
  });

  it("should assert a value is null or undefined", () => {
    const obj = null;
    AssertionHelper.assertIsNullOrUndefined(
      obj,
      "Object is neither null nor undefined"
    );
  });

  it("should assert a value is a number", () => {
    const num = 42;
    AssertionHelper.assertIsNumber(num, "Object is not a number");
  });

  it("should assert an object is of a specific class", () => {
    class Car {}
    const car = new Car();
    AssertionHelper.assertIsTypeOfClass(
      Car,
      car,
      "Object is not of expected class type"
    );
  });

  it("should assert a collection includes a nested element by property", () => {
    const collection = [{ id: 1 }, { name: "test" }];
    AssertionHelper.assertNestedInclude(collection, "id", 1);
    AssertionHelper.assertNestedInclude(collection, "name", "test");
  });

  it("should assert a value is not a decrement of another", () => {
    AssertionHelper.assertNotDecrementOf(10, 9);
  });

  it("should assert two objects are not deeply equal", () => {
    const obj1 = { name: "John", age: 30 };
    const obj2 = { name: "John", age: 40 };
    AssertionHelper.assertNotDeepEquals(obj1, obj2, "Objects are deeply equal");
  });

  it("should assert a collection does not deeply include an element", () => {
    const collection = [{ id: 1 }, { id: 2 }];
    const element = { id: 3 };
    AssertionHelper.assertNotDeepInclude(
      collection,
      element,
      "Collection deeply includes the element"
    );
  });

  it("should assert two objects are not equal", () => {
    AssertionHelper.assertNotEquals(
      1,
      2,
      "Objects are equal but should not be"
    );
  });

  it("should assert a value is not in a range", () => {
    const value = 11;
    AssertionHelper.assertNotInRange(value, 1, 10, "Value is in the range");
  });

  it("should assert a value is not in an inclusive range", () => {
    const value = 0;
    AssertionHelper.assertNotInRangeIncluded(
      value,
      1,
      10,
      "Value is in the inclusive range"
    );
  });

  it("should assert a value is not an increment of another", () => {
    AssertionHelper.assertNotIncrementOf(
      10,
      8,
      "Value is an increment of reference"
    );
  });

  it("should assert a collection does not include a nested element by property", () => {
    const collection = [{ id: 1 }, { name: "test" }];
    AssertionHelper.assertNotNestedInclude(collection, "id", 2);
    AssertionHelper.assertNotNestedInclude(collection, "name", "example");
  });

  it("should assert a value is not zero", () => {
    AssertionHelper.assertNotZero(1, "Value is zero");
  });

  it("should assert an object has specific keys", () => {
    const obj = { name: "John", age: 30 };
    AssertionHelper.assertObjectHasKeys(
      obj,
      ["name", "age"],
      "Object does not have the required keys"
    );
  });

  it("should assert an object has a specific property", () => {
    const obj = { name: "John" };
    AssertionHelper.assertObjectHasProperty(
      obj,
      "name",
      "Object does not have the specified property"
    );
  });

  it("should assert an object includes a specific value", () => {
    const obj = { name: "John", age: 30 };
    AssertionHelper.assertObjectIncludes(
      obj,
      "John",
      "Object does not include the specified value"
    );
  });

  it("should assert an object is empty", () => {
    const obj = {};
    AssertionHelper.assertObjectIsEmpty(obj, "Object is not empty");
  });

  it("should assert an object is not empty", () => {
    const obj = { name: "John" };
    AssertionHelper.assertObjectIsNotEmpty(obj, "Object is empty");
  });

  it("should assert a string contains a substring", () => {
    const str = "Hello, world!";
    AssertionHelper.assertStringContains(
      str,
      "world",
      "String does not contain the substring"
    );
  });

  it("should assert a string ends with a suffix", () => {
    const str = "Hello, world!";
    AssertionHelper.assertStringEndsWith(
      str,
      "world!",
      "String does not end with the specified suffix"
    );
  });

  it("should assert a string is empty", () => {
    const str = "";
    AssertionHelper.assertStringIsEmpty(str, "String is not empty");
  });

  it("should assert a string is not empty", () => {
    const str = "Hello!";
    AssertionHelper.assertStringIsNotEmpty(str, "String is empty");
  });

  it("should assert a string has a specific length", () => {
    const str = "Hello!";
    AssertionHelper.assertStringLength(str, 6, "String length mismatch");
  });

  it("should assert a string matches a regex", () => {
    const str = "hello123";
    AssertionHelper.assertStringMatchesRegex(
      str,
      "hello[0-9]+",
      "String does not match the regex"
    );
  });

  it("should assert a string does not match a regex", () => {
    const str = "hello123";
    AssertionHelper.assertStringNotMatchesRegex(
      str,
      "bye[0-9]+",
      "String matches the regex"
    );
  });

  it("should assert a string starts with a prefix", () => {
    const str = "Hello, world!";
    AssertionHelper.assertStringStartsWith(
      str,
      "Hello",
      "String does not start with the prefix"
    );
  });

  it("should assert that a function throws", () => {
    const func = () => {
      throw new Error("Test error");
    };
    AssertionHelper.assertThrows(func, "Function did not throw an exception");
  });

  it("should assert a valid email", () => {
    const email = "test@example.com";
    AssertionHelper.assertValidEmail(email, "Email is not valid");
  });

  it("should assert a valid URL", () => {
    const url = "https://example.com";
    AssertionHelper.assertValidUrl(url, "URL is not valid");
  });

  it("should assert a value is zero", () => {
    AssertionHelper.assertZero(0, "Value is not zero");
  });
});

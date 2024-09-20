# QANexus

QANexus is a TypeScript library designed for handling quality assurance (QA) tasks such as assertions, data generation, and more. The library provides utility functions and predefined constants for working with complex data generation and validation, tailored to various QA needs.

## Features

- **Assertions Module (`qaNexusAssertion`)**: Provides custom assertion helpers, constants, and exception handling to enhance the testing and validation processes.
- **Data Generation Module (`qaNexusDataGeneration`)**: Allows for generating complex data like phone numbers, dates, and handling different data models. Includes support for enums, constants, and utility methods for generating complex data.

## Installation

### Local Installation

To install the QANexus library locally, follow these steps:

1. Clone the repository or download the project files.
2. Navigate to the project directory in your terminal.
3. Run the following command to install the library's dependencies:

```bash
npm install
```

### Library Installation From npm

```bash
npm install qanexus
```

## Functions and Modules

### Assertion Helpers

- generateBinaryData
- generateBoolean
- generateByte
- generateByteArray
- generateChar
- generateDate
- generateDouble
- generateEmail
- generateFloat
- generateGaussian
- generateHex
- generateHexColor
- generateInt
- generateIpAddress
- generateIpv6Address
- generateLong
- generateMacAddress
- generatePhoneNumber
- generateRandomComplexNumber
- generateRandomEven
- generateRandomExponential
- generateRandomFromSet
- generateRandomOdd
- generateRandomPercentage
- generateRandomPrime
- generateRandomWithCustomDistribution
- generateShort
- generateString
- generateTime
- generateTimestamp
- generateUniqueRandomSequence
- generateUnixTimestamp
- generateUuid
- isNumeric
- isPrime
- readAndSaveSchema

### Assertion Helpers

- assertArrayLength
- assertCloseTo
- assertCollectionContains
- assertCollectionIsNotEmpty
- assertCollectionLength
- assertCollectionNotContains
- assertCollectionNotSameMembers
- assertCollectionsSameMembers
- assertDate
- assertDateFormat
- assertDeepEquals
- assertDeepInclude
- assertDisjoint
- assertEmptyObject
- assertEquals
- assertEven
- assertFunctionDoesNotThrow
- assertFunctionReturns
- assertFunctionThrows
- assertGreaterThan
- assertGreaterThanOrEqual
- assertHasPropertyValue
- assertInRange
- assertInRangeIncluded
- assertInstanceOf
- assertIsArray
- assertIsCollectionEmpty
- assertIsDecrementOf
- assertIsFalse
- assertIsFunction
- assertIsIncrementOf
- assertIsNotArray
- assertIsNotIncrementOf
- assertIsNotNullOrUndefined
- assertIsNotNumber
- assertIsNullOrUndefined
- assertIsNumber
- assertIsTrue
- assertIsTypeOf
- assertLessThan
- assertLessThanOrEqual
- assertNegative
- assertNestedInclude
- assertNotCloseTo
- assertNotDecrementOf
- assertNotDeepEquals
- assertNotDeepInclude
- assertNotEquals
- assertNotInRange
- assertNotInRangeIncluded
- assertNotIncrementOf
- assertNotNestedInclude
- assertNotZero
- assertObjectHasKeys
- assertObjectHasProperty
- assertObjectIncludes
- assertObjectIsEmpty
- assertObjectIsNotEmpty
- assertOdd
- assertPositive
- assertStringContains
- assertStringEndsWith
- assertStringIsEmpty
- assertStringIsNotEmpty
- assertStringLength
- assertStringMatchesRegex
- assertStringNotMatchesRegex
- assertStringStartsWith
- assertThrows
- assertValidEmail
- assertValidUrl
- assertZero

## Documentation

You can refer to [TypeDoc](https://github.com/Elie-A/QANexusTS/tree/master/docs)

## License

This project is licensed under the MIT License.

## Issues, Bug Reporting

If you encounter any issues or bugs, please report them on the [IssuesTracker](https://github.com/Elie-A/QANexusTS/issues) with detailed steps on how to reproduce the issue

## Improvements, Suggestions

We welcome contributions! If you have any improvements or suggestions, follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Submit a Pull Request (PR) with detailed explanations. PRs with minimal or unclear details may be rejected.

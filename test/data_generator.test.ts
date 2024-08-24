import { generateUuid } from "../src/dataGenerator/utils/DataGenerator";
import { UuidType } from "../src/dataGenerator/enums/UUIDEnums";
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from "uuid";

// Mock UUID library methods to return predictable results
jest.mock("uuid", () => ({
  v1: jest.fn(() => "mocked-v1-uuid"),
  v3: jest.fn(() => "mocked-v3-uuid"),
  v4: jest.fn(() => "mocked-v4-uuid"),
  v5: jest.fn(() => "mocked-v5-uuid"),
}));

describe("generateUuid", () => {
  it("should generate a v4 UUID if version not provided", () => {
    const uuid = generateUuid();
    expect(uuid).toBe("mocked-v4-uuid");
  });

  it("should generate a v1 UUID", () => {
    const uuid = generateUuid(UuidType.V1);
    expect(uuid).toBe("mocked-v1-uuid");
  });

  it("should generate a v3 UUID with the provided name and namespace", () => {
    const name = "test-name";
    const namespace = "test-namespace";
    const uuid = generateUuid(UuidType.V3, name, namespace);
    expect(uuid).toBe("mocked-v3-uuid");
    expect(uuidv3).toHaveBeenCalledWith(name, namespace);
  });

  it("should generate a v4 UUID", () => {
    const uuid = generateUuid(UuidType.V4);
    expect(uuid).toBe("mocked-v4-uuid");
  });

  it("should generate a v5 UUID with the provided name and namespace", () => {
    const name = "test-name";
    const namespace = "test-namespace";
    const uuid = generateUuid(UuidType.V5, name, namespace);
    expect(uuid).toBe("mocked-v5-uuid");
    expect(uuidv5).toHaveBeenCalledWith(name, namespace);
  });

  it("should throw an error for unsupported UUID types", () => {
    expect(() => generateUuid("unsupported" as UuidType)).toThrowError(
      "Unsupported UUID type: unsupported"
    );
  });

  it("should throw an error if name or namespace is missing for UUID v3 or v5", () => {
    expect(() => generateUuid(UuidType.V3)).toThrowError(
      "Namespace and name must be provided for UUID v3"
    );
    expect(() => generateUuid(UuidType.V5)).toThrowError(
      "Namespace and name must be provided for UUID v5"
    );
  });
});

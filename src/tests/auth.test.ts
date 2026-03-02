import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("returns null if no authorization header", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null if authorization header has no space", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "InvalidFormat",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null if scheme is not ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer 12345",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns API key when format is correct", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-key",
    };
    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

  test("returns null if ApiKey has no value", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };
    expect(getAPIKey(headers)).toBeNull();
  });
});

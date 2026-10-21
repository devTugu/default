import { z } from "zod";
import { describe, expect, it } from "vitest";
import { parseWith } from "./parse";

describe("parseWith", () => {
  it("returns parsed data when the contract matches", () => {
    const schema = z.object({ id: z.number() });
    expect(parseWith(schema, "/test")({ id: 1 })).toEqual({ id: 1 });
  });

  it("throws with the endpoint in the error message", () => {
    const schema = z.object({ id: z.number() });
    expect(() => parseWith(schema, "/users")({})).toThrow(
      "API contract mismatch: /users",
    );
  });
});

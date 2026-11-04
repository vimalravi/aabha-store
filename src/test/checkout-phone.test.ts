import { describe, expect, it } from "vitest";

import { normalisePhone } from "@/components/checkout-dialog";

// The checkout only opens WhatsApp for valid Indian mobile numbers.
describe("checkout phone validation", () => {
  it("accepts plain 10-digit mobile numbers starting 6-9", () => {
    expect(normalisePhone("9847012345")).toBe("9847012345");
    expect(normalisePhone("8714324466")).toBe("8714324466");
  });

  it("accepts spaces and dashes", () => {
    expect(normalisePhone("98470 12345")).toBe("9847012345");
  });

  it("accepts the +91 country-code prefix", () => {
    expect(normalisePhone("+91 9847012345")).toBe("9847012345");
    expect(normalisePhone("919847012345")).toBe("9847012345");
  });

  it("rejects landline-style, short and invalid numbers", () => {
    expect(normalisePhone("12345")).toBeNull();
    expect(normalisePhone("0471234567")).toBeNull();
    expect(normalisePhone("1234567890")).toBeNull();
    expect(normalisePhone("")).toBeNull();
  });
});

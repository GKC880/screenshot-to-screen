import { describe, expect, it } from "vitest";
import { calculateBookingTotal } from "@/lib/adventures";

describe("sample booking total", () => {
  it("multiplies the displayed ₹2,999 per-person price for two people", () => {
    expect(calculateBookingTotal(2999, 2)).toBe(5998);
  });
});

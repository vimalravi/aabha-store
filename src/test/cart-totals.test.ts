import { describe, expect, it } from "vitest";

import { PRODUCTS, resolveCoupon } from "@/data/catalog";
import { computeTotals, normaliseCart } from "@/lib/cart";
import { buildOrderMessage, buildWhatsAppLink } from "@/lib/whatsapp";

// Real catalogue products used as fixtures.
const e1 = PRODUCTS.find((p) => p.id === "e1")!; // ₹599
const n1 = PRODUCTS.find((p) => p.id === "n1")!; // ₹2190

describe("cart totals", () => {
  it("sums line totals without a coupon", () => {
    const totals = computeTotals(
      [
        { productId: "e1", qty: 2 },
        { productId: "n1", qty: 1 },
      ],
      PRODUCTS,
      null,
    );
    expect(totals.subtotal).toBe(599 * 2 + 2190);
    expect(totals.discount).toBe(0);
    expect(totals.total).toBe(599 * 2 + 2190);
    expect(totals.itemCount).toBe(3);
  });

  it("applies FESTIVE20 (20% off) only above its ₹1999 minimum", () => {
    const below = computeTotals([{ productId: "e1", qty: 1 }], PRODUCTS, "FESTIVE20");
    expect(below.discount).toBe(0);

    const above = computeTotals([{ productId: "n1", qty: 1 }], PRODUCTS, "FESTIVE20");
    expect(above.discount).toBe(Math.round(2190 * 0.2));
    expect(above.total).toBe(2190 - Math.round(2190 * 0.2));
  });

  it("applies AABHA10 (10% off) with no minimum", () => {
    const totals = computeTotals([{ productId: "e1", qty: 1 }], PRODUCTS, "AABHA10");
    expect(totals.discount).toBe(Math.round(599 * 0.1));
  });

  it("ignores unknown coupon codes", () => {
    const totals = computeTotals([{ productId: "e1", qty: 1 }], PRODUCTS, "FAKE50");
    expect(totals.discount).toBe(0);
    expect(totals.discountLabel).toBeNull();
  });

  it("rejects FESTIVE20 below the minimum via resolveCoupon", () => {
    expect(resolveCoupon("festive20", 1998)).toBeNull();
    expect(resolveCoupon("FESTIVE20", 1999)?.percent).toBe(20);
  });

  it("merges duplicate product lines and drops zero quantities", () => {
    const merged = normaliseCart([
      { productId: "e1", qty: 1 },
      { productId: "e1", qty: 2 },
      { productId: "n1", qty: 0 },
    ]);
    expect(merged).toEqual([{ productId: "e1", qty: 3 }]);
  });
});

describe("WhatsApp checkout message", () => {
  const customer = { name: "Ravi V", phone: "9876543210", address: "Kowdiar, Trivandrum 695003" };

  it("includes customer details, items, discount and grand total", () => {
    const message = buildOrderMessage(
      customer,
      [{ productId: "e1", qty: 2 }, { productId: "n1", qty: 1 }],
      PRODUCTS,
      "AABHA10",
    );

    expect(message).toContain("Aabha");
    expect(message).toContain("Ravi V");
    expect(message).toContain("9876543210");
    expect(message).toContain("Kowdiar, Trivandrum 695003");
    expect(message).toContain(e1.name);
    expect(message).toContain(n1.name);
    expect(message).toContain("-₹" + Math.round((599 * 2 + 2190) * 0.1).toLocaleString("en-IN"));
    expect(message).toContain("Grand Total");
  });

  it("produces a wa.me link with the store number and an encoded message", () => {
    const message = buildOrderMessage(customer, [{ productId: "e1", qty: 1 }], PRODUCTS, null);
    const link = buildWhatsAppLink(message, "918714324466");
    expect(link.startsWith("https://wa.me/918714324466?text=")).toBe(true);
    const encoded = link.split("?text=")[1] ?? "";
    expect(decodeURIComponent(encoded)).toBe(message);
  });
});

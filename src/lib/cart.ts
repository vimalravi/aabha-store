/**
 * Pure cart maths — shared by the cart drawer, the WhatsApp checkout
 * message and the unit tests in src/test/cart-totals.test.ts.
 */
import { resolveCoupon, type Coupon, type Product } from "@/data/catalog";

export interface CartLine {
  productId: string;
  qty: number;
}

export interface Totals {
  /** Sum of line totals before discount */
  subtotal: number;
  /** Amount removed by the coupon */
  discount: number;
  /** Coupon label applied, or null */
  discountLabel: string | null;
  /** What the customer pays */
  total: number;
  /** Total number of units across lines */
  itemCount: number;
}

/** Merge duplicate product ids and drop empty lines. */
export function normaliseCart(lines: CartLine[]): CartLine[] {
  const map = new Map<string, number>();
  for (const line of lines) {
    if (line.qty <= 0) continue;
    map.set(line.productId, (map.get(line.productId) ?? 0) + line.qty);
  }
  return [...map].map(([productId, qty]) => ({ productId, qty }));
}

export function computeTotals(
  lines: CartLine[],
  products: Product[],
  couponCode: string | null,
): Totals {
  const byId = new Map(products.map((p) => [p.id, p]));
  let subtotal = 0;
  let itemCount = 0;

  for (const line of normaliseCart(lines)) {
    const product = byId.get(line.productId);
    if (!product) continue;
    subtotal += product.price * line.qty;
    itemCount += line.qty;
  }

  const coupon: Coupon | null = couponCode ? resolveCoupon(couponCode, subtotal) : null;
  const discount = coupon ? Math.round((subtotal * coupon.percent) / 100) : 0;

  return {
    subtotal,
    discount,
    discountLabel: coupon ? `${coupon.label} (${coupon.code})` : null,
    total: subtotal - discount,
    itemCount,
  };
}

export const CART_STORAGE_KEY = "aabha-cart-v1";
export const COUPON_STORAGE_KEY = "aabha-coupon-v1";

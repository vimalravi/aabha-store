/**
 * Builds the pre-filled WhatsApp order message.
 * Kept pure so it can be unit-tested.
 */
import { BRAND_NAME, formatINR } from "@/data/catalog";
import { computeTotals, type CartLine } from "@/lib/cart";
import type { Product } from "@/data/catalog";

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
}

/** Build the human-readable order text sent to the store's WhatsApp number. */
export function buildOrderMessage(
  customer: CustomerDetails,
  lines: CartLine[],
  products: Product[],
  couponCode: string | null,
): string {
  const totals = computeTotals(lines, products, couponCode);
  const byId = new Map(products.map((p) => [p.id, p]));

  const itemLines = lines
    .map((line, index) => {
      const product = byId.get(line.productId);
      if (!product) return null;
      const lineTotal = product.price * line.qty;
      return [
        `${index + 1}. ${product.name}`,
        `    Qty: ${line.qty} × ${formatINR(product.price)} = ${formatINR(lineTotal)}`,
      ].join("\n");
    })
    .filter(Boolean)
    .join("\n");

  const discountLine = totals.discount > 0 ? `\nDiscount (${couponCode}): -${formatINR(totals.discount)}` : "";

  return [
    `✨ *New Order — ${BRAND_NAME} Art Jewellery* ✨`,
    "",
    `*Name:* ${customer.name}`,
    `*Phone:* ${customer.phone}`,
    `*Address:* ${customer.address}`,
    "",
    "*Order Details*",
    itemLines,
    "",
    `Subtotal: ${formatINR(totals.subtotal)}`,
    discountLine,
    `*Grand Total: ${formatINR(totals.total)}*`,
    "",
    "Hello! I would like to place this order. Please confirm availability and delivery details. Thank you! 🙏",
    `— Sent from the ${BRAND_NAME} storefront`,
  ]
    .filter((l) => l !== undefined)
    .join("\n");
}

/** Encode the message and return the wa.me deep link. */
export function buildWhatsAppLink(message: string, whatsappNumber: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

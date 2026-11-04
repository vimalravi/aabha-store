/**
 * Slide-in cart drawer: quantity controls, coupon code field, running
 * totals and a checkout button that opens the order form.
 */
import { useEffect, useRef, useState } from "react";
import { Minus, Plus, Tag, Trash2, X } from "lucide-react";

import { COUPONS, PRODUCTS, formatINR } from "@/data/catalog";
import type { CartApi } from "@/hooks/use-cart";

export function CartDrawer({
  open,
  onClose,
  cart,
  onCheckout,
}: {
  open: boolean;
  onClose: () => void;
  cart: CartApi;
  onCheckout: () => void;
}) {
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management + Escape to close.
  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const { lines, totals, couponCode } = cart;
  const byId = new Map(PRODUCTS.map((p) => [p.id, p]));

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    const known = COUPONS.find((c) => c.code === code);
    if (!known) {
      setCouponError("That code isn't valid. Try AABHA10 or FESTIVE20.");
      return;
    }
    if (totals.subtotal < known.minSubtotal) {
      setCouponError(`${code} needs a minimum order of ${formatINR(known.minSubtotal)}.`);
      return;
    }
    cart.setCouponCode(code);
    setCouponError(null);
    setCouponInput("");
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-foreground/40 backdrop-blur-sm"
      />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-lift">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-display text-2xl font-semibold">
            Your Cart{" "}
            <span className="text-base text-muted-foreground">
              ({totals.itemCount} item{totals.itemCount === 1 ? "" : "s"})
            </span>
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl transition-colors hover:bg-accent"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-display text-xl">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">
              Add some sparkle — explore our necklaces, jhumkas and bridal sets.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 inline-flex min-h-11 items-center rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Line items */}
            <ul className="flex-1 divide-y overflow-y-auto px-5">
              {lines.map((line) => {
                const product = byId.get(line.productId);
                if (!product) return null;
                return (
                  <li key={line.productId} className="flex gap-3 py-4">
                    <img
                      src={product.image}
                      alt={product.alt}
                      width={80}
                      height={80}
                      loading="lazy"
                      className="size-20 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <p className="truncate text-sm font-semibold">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatINR(product.price)} each
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        {/* Quantity stepper */}
                        <div className="flex items-center rounded-lg border">
                          <button
                            type="button"
                            onClick={() => cart.setQty(line.productId, line.qty - 1)}
                            aria-label={`Decrease quantity of ${product.name}`}
                            className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-l-lg transition-colors hover:bg-accent"
                          >
                            <Minus className="size-4" aria-hidden="true" />
                          </button>
                          <span
                            className="min-w-9 text-center text-sm font-semibold"
                            aria-label={`Quantity of ${product.name}: ${line.qty}`}
                          >
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => cart.setQty(line.productId, line.qty + 1)}
                            aria-label={`Increase quantity of ${product.name}`}
                            className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-r-lg transition-colors hover:bg-accent"
                          >
                            <Plus className="size-4" aria-hidden="true" />
                          </button>
                        </div>
                        <span className="text-sm font-bold">{formatINR(product.price * line.qty)}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => cart.removeFromCart(line.productId)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="inline-flex min-h-9 min-w-9 shrink-0 items-center justify-center self-start rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Coupon + totals */}
            <div className="border-t px-5 py-4">
              {couponCode ? (
                <div className="mb-3 flex items-center justify-between rounded-xl bg-secondary px-3 py-2.5">
                  <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Tag className="size-4" aria-hidden="true" /> {couponCode} applied
                  </span>
                  <button
                    type="button"
                    onClick={() => cart.setCouponCode(null)}
                    className="min-h-9 rounded-lg px-2 text-xs font-semibold text-muted-foreground underline underline-offset-2 hover:text-foreground"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  <div className="flex gap-2">
                    <label className="sr-only" htmlFor="coupon-code">
                      Coupon code
                    </label>
                    <input
                      id="coupon-code"
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError(null);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                      placeholder="Coupon code — try AABHA10"
                      className="min-h-11 flex-1 rounded-xl border bg-card px-3 text-sm uppercase placeholder:normal-case focus:outline-2 focus:outline-offset-1 focus:outline-ring"
                    />
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="inline-flex min-h-11 items-center rounded-xl border border-gold-deep/50 px-4 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-destructive">
                      {couponError}
                    </p>
                  )}
                </div>
              )}

              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-semibold">{formatINR(totals.subtotal)}</dd>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <dt>Discount</dt>
                    <dd className="font-semibold">−{formatINR(totals.discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2 text-base">
                  <dt className="font-bold">Total</dt>
                  <dd className="font-bold" data-testid="cart-total">
                    {formatINR(totals.total)}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-gold px-6 py-3 text-sm font-bold tracking-wide text-primary-foreground shadow-elegant transition-opacity hover:opacity-90"
              >
                Place Order via WhatsApp
              </button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Free shipping across India · Cash on delivery available
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Checkout dialog: collects the customer's name, phone and delivery
 * address, then opens WhatsApp with a pre-filled order message.
 * Placed on WhatsApp is final — no payment is taken on the site.
 */
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";

import { formatINR, PRODUCTS, WHATSAPP_NUMBER } from "@/data/catalog";
import { buildOrderMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import type { CartApi } from "@/hooks/use-cart";

interface FormState {
  name: string;
  phone: string;
  address: string;
}

const EMPTY_FORM: FormState = { name: "", phone: "", address: "" };

/** Normalise an Indian mobile number to 10 digits, or null when invalid. */
export function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  const local = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local) ? local : null;
}

function validate(form: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!normalisePhone(form.phone)) errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (form.address.trim().length < 10)
    errors.address = "Please include house/street, area, city and PIN code.";
  return errors;
}

export function CheckoutDialog({
  open,
  onClose,
  cart,
}: {
  open: boolean;
  onClose: () => void;
  cart: CartApi;
}) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    nameInputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const { lines, totals } = cart;
  if (lines.length === 0) {
    return (
      <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Checkout">
        <button
          type="button"
          aria-label="Close checkout"
          onClick={onClose}
          className="absolute inset-0 h-full w-full bg-foreground/40 backdrop-blur-sm"
        />
        <div className="absolute inset-x-4 top-1/2 mx-auto max-w-sm -translate-y-1/2 rounded-2xl border bg-background p-6 text-center shadow-lift">
          <p className="font-display text-xl font-semibold">Your cart is empty</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Add a few sparkling pieces before placing your order.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to Shopping
          </button>
        </div>
      </div>
    );
  }

  const setField = (field: keyof FormState) => (value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const message = buildOrderMessage(
      {
        name: form.name.trim(),
        phone: normalisePhone(form.phone) ?? form.phone.trim(),
        address: form.address.trim(),
      },
      lines,
      PRODUCTS,
      cart.couponCode,
    );
    const link = buildWhatsAppLink(message, WHATSAPP_NUMBER);
    window.open(link, "_blank", "noopener,noreferrer");
    cart.clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Checkout">
      <button
        type="button"
        aria-label="Close checkout"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-foreground/40 backdrop-blur-sm"
      />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl border bg-background shadow-lift sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:max-h-none sm:rounded-none sm:rounded-l-3xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-display text-2xl font-semibold">Place Your Order</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl transition-colors hover:bg-accent"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <form className="px-5 py-5" onSubmit={submit} noValidate>
          <p className="text-sm text-muted-foreground">
            Fill in your details and we'll open WhatsApp with your order ready to send.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="checkout-name" className="text-sm font-semibold">
                Full name
              </label>
              <input
                id="checkout-name"
                ref={nameInputRef}
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setField("name")(e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "checkout-name-error" : undefined}
                className="mt-1.5 min-h-11 w-full rounded-xl border bg-card px-3 text-sm focus:outline-2 focus:outline-offset-1 focus:outline-ring"
              />
              {errors.name && (
                <p id="checkout-name-error" role="alert" className="mt-1 text-xs font-medium text-destructive">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="checkout-phone" className="text-sm font-semibold">
                Mobile number
              </label>
              <input
                id="checkout-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={(e) => setField("phone")(e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "checkout-phone-error" : undefined}
                className="mt-1.5 min-h-11 w-full rounded-xl border bg-card px-3 text-sm focus:outline-2 focus:outline-offset-1 focus:outline-ring"
              />
              {errors.phone && (
                <p id="checkout-phone-error" role="alert" className="mt-1 text-xs font-medium text-destructive">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="checkout-address" className="text-sm font-semibold">
                Delivery address
              </label>
              <textarea
                id="checkout-address"
                rows={3}
                autoComplete="street-address"
                placeholder="House / flat, street, area, city, PIN code"
                value={form.address}
                onChange={(e) => setField("address")(e.target.value)}
                aria-invalid={Boolean(errors.address)}
                aria-describedby={errors.address ? "checkout-address-error" : undefined}
                className="mt-1.5 min-h-24 w-full rounded-xl border bg-card px-3 py-2.5 text-sm focus:outline-2 focus:outline-offset-1 focus:outline-ring"
              />
              {errors.address && (
                <p id="checkout-address-error" role="alert" className="mt-1 text-xs font-medium text-destructive">
                  {errors.address}
                </p>
              )}
            </div>
          </div>

          <dl className="mt-5 space-y-1.5 rounded-xl bg-secondary/70 px-4 py-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Items ({totals.itemCount})</dt>
              <dd className="font-semibold">{formatINR(totals.subtotal)}</dd>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-primary">
                <dt>Discount ({cart.couponCode})</dt>
                <dd className="font-semibold">−{formatINR(totals.discount)}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-border/70 pt-2 text-base">
              <dt className="font-bold">Total to pay</dt>
              <dd className="font-bold" data-testid="checkout-total">
                {formatINR(totals.total)}
              </dd>
            </div>
          </dl>

          <button
            type="submit"
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-gold px-6 py-3 text-sm font-bold tracking-wide text-primary-foreground shadow-elegant transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-5" aria-hidden="true" /> Send Order on WhatsApp
          </button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Pay on delivery or via UPI after we confirm · Free shipping across India
          </p>
        </form>
      </div>
    </div>
  );
}

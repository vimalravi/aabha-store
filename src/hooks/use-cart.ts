/**
 * Cart state hook — persisted to localStorage.
 * Storage is only touched in effects (never during render/SSR) so the
 * server-rendered HTML and the first client render always agree.
 */
import { useCallback, useEffect, useMemo, useState } from "react";

import { PRODUCTS } from "@/data/catalog";
import {
  CART_STORAGE_KEY,
  COUPON_STORAGE_KEY,
  computeTotals,
  normaliseCart,
  type CartLine,
} from "@/lib/cart";

function loadStoredCart(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return normaliseCart(
      parsed.filter(
        (l): l is CartLine =>
          typeof l === "object" &&
          l !== null &&
          typeof (l as CartLine).productId === "string" &&
          typeof (l as CartLine).qty === "number",
      ),
    );
  } catch {
    return [];
  }
}

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Restore saved cart + coupon once on the client.
  useEffect(() => {
    setLines(loadStoredCart());
    setCouponCode(window.localStorage.getItem(COUPON_STORAGE_KEY));
    setLoaded(true);
  }, []);

  // Persist on every change after the initial restore.
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
      if (couponCode) window.localStorage.setItem(COUPON_STORAGE_KEY, couponCode);
      else window.localStorage.removeItem(COUPON_STORAGE_KEY);
    } catch {
      /* storage unavailable (private mode) — cart still works in memory */
    }
  }, [lines, couponCode, loaded]);

  const addToCart = useCallback((productId: string, qty = 1) => {
    setLines((prev) => normaliseCart([...prev, { productId, qty }]));
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setLines((prev) =>
      normaliseCart(
        prev.map((l) => (l.productId === productId ? { ...l, qty } : l)),
      ),
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
    setCouponCode(null);
  }, []);

  const totals = useMemo(
    () => computeTotals(lines, PRODUCTS, couponCode),
    [lines, couponCode],
  );

  return {
    lines,
    couponCode,
    setCouponCode,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    totals,
  };
}

export type CartApi = ReturnType<typeof useCart>;

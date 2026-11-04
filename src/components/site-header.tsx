/**
 * Site header: offer strip, logo, search, navigation, cart button and a
 * collapsible mobile menu. Sticky so the cart is always one tap away.
 */
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";

import { AabhaLogo } from "@/components/aabha-logo";
import { CATEGORIES, COUPONS, formatINR } from "@/data/catalog";

const NAV_LINKS = [
  { href: "#shop", label: "Shop" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
}: {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu when shrinking to desktop or on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const festive = COUPONS.find((c) => c.code === "FESTIVE20")!;

  return (
    <header className="sticky top-0 z-40">
      {/* Offer strip */}
      <div className="bg-gradient-maroon px-4 py-2.5 text-center text-[12px] font-medium tracking-[0.08em] text-primary-foreground sm:text-[13px]">
        ✦ Festive Sparkle — {festive.percent}% OFF on orders above {formatINR(festive.minSubtotal)} with code{" "}
        <strong className="rounded bg-gold/20 px-1.5 py-0.5 font-bold tracking-widest text-gold-soft">{festive.code}</strong> · Free shipping across India ✦
      </div>

      <div className="glass border-b border-gold-deep/15 shadow-[0_8px_30px_-18px_oklch(0.35_0.06_45/40%)]">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-6">
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-accent md:hidden"
          >
            {menuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>

          <a href="#top" className="shrink-0" aria-label="Aabha — home">
            <AabhaLogo className="h-12 w-auto" />
          </a>

          {/* Search (desktop) */}
          <div className="relative mx-auto hidden w-full max-w-md md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search jewellery — necklaces, jhumkas, rings…"
              aria-label="Search products"
              className="min-h-11 w-full rounded-full border border-gold-deep/20 bg-card/80 pl-10 pr-4 text-sm shadow-inner transition-shadow focus:shadow-elegant text-foreground placeholder:text-muted-foreground focus:outline-2 focus:outline-offset-1 focus:outline-ring"
            />
          </div>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 text-sm font-semibold tracking-wide text-foreground transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-gold after:transition-transform after:duration-300 hover:text-primary hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Cart button */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            className="relative inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-accent"
          >
            <ShoppingBag className="size-6" aria-hidden="true" />
            {cartCount > 0 && (
              <span
                data-testid="cart-badge"
                className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-gradient-maroon text-[11px] font-bold text-primary-foreground ring-2 ring-background"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Search (mobile) */}
        <div className="px-4 pb-3 md:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search jewellery…"
              aria-label="Search products"
              className="min-h-11 w-full rounded-full border border-gold-deep/20 bg-card/80 pl-10 pr-4 text-sm shadow-inner transition-shadow focus:shadow-elegant text-foreground placeholder:text-muted-foreground focus:outline-2 focus:outline-offset-1 focus:outline-ring"
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-b bg-background shadow-lift md:hidden"
        >
          <ul className="mx-auto max-w-7xl px-4 py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block min-h-11 border-b border-border/60 py-3 text-sm font-semibold text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Categories
          </p>
          <ul className="mx-auto max-w-7xl px-4 pb-4">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <a
                  href={`#cat-${c.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="block min-h-11 py-2.5 text-sm text-foreground"
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

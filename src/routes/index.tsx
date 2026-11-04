import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { CartDrawer } from "@/components/cart-drawer";
import { CheckoutDialog } from "@/components/checkout-dialog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  AboutSection,
  ContactSection,
  FaqSection,
  Hero,
  OffersStrip,
  ShopSection,
} from "@/components/storefront-sections";
import { PRODUCTS } from "@/data/catalog";
import { useCart } from "@/hooks/use-cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Aabha — Artificial Jewellery, Trivandrum | Necklaces, Jhumkas & Bridal Sets",
      },
      {
        name: "description",
        content:
          "Shop hand-finished artificial jewellery from Aabha, Trivandrum — temple necklaces, jhumkas, bangles, rings, mangalsutra and bridal sets. Free shipping across India, cash on delivery, easy exchange.",
      },
      {
        property: "og:title",
        content: "Aabha — Temple Traditions, Everyday Sparkle",
      },
      {
        property: "og:description",
        content:
          "Hand-finished artificial jewellery from Trivandrum. Necklaces, jhumkas, bangles and bridal sets with free shipping across India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const cart = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const query = searchQuery.trim().toLowerCase();
  const searching = query.length > 0;

  const visibleProducts = useMemo(() => {
    if (!searching) return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query),
    );
  }, [searching, query]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cart.totals.itemCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-1">
        <Hero />
        <OffersStrip />
        <ShopSection
          products={visibleProducts}
          searching={searching}
          onAdd={cart.addToCart}
        />
        <AboutSection />
        <FaqSection />
        <ContactSection />
      </main>

      <SiteFooter />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onCheckout={() => setCheckoutOpen(true)}
      />
      <CheckoutDialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)} cart={cart} />
    </div>
  );
}

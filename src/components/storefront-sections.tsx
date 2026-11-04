/**
 * Storefront content sections: hero, coupon offers, shop grid, About,
 * FAQ and Contact — all rendered on the single-page home route.
 */
import { ChevronRight, Clock, Gem, MapPin, MessageCircle, Sparkles, Truck } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import {
  BRAND_CITY,
  BRAND_NAME,
  CATEGORIES,
  COUPONS,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  formatINR,
  type Product,
} from "@/data/catalog";
import heroImg from "@/assets/aabha-hero.jpg";
import aboutImg from "@/assets/aabha-about.jpg";

/* ------------------------------- Hero ------------------------------- */

export function Hero() {
  return (
    <section id="top" aria-label="Welcome to Aabha" className="relative overflow-hidden bg-ivory-glow">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-gold/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div className="animate-fade-up order-2 text-center lg:order-1 lg:text-left">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold-deep">
            Artificial Jewellery · {BRAND_CITY}
          </p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            Temple Traditions,
            <span className="animate-shimmer block italic text-gradient-gold">Everyday Sparkle</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0">
            Hand-finished necklaces, jhumkas, bangles and bridal sets — the glow of gold
            without the weight of its price. Delivering shimmer across India.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#shop"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-maroon px-8 text-sm font-bold tracking-wide text-primary-foreground shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elegant"
            >
              Shop the Collection <ChevronRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#offers"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-gold-deep/50 bg-card/70 px-8 text-sm font-semibold text-primary backdrop-blur transition-colors hover:bg-secondary"
            >
              View Today's Offers
            </a>
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-3 text-center sm:max-w-sm lg:text-left">
            {[
              ["500+", "Happy customers"],
              ["Free", "Shipping in India"],
              ["7-day", "Easy exchange"],
            ].map(([stat, label]) => (
              <div key={label} className="rounded-2xl border border-gold-deep/15 bg-card/80 px-2 py-3 shadow-elegant backdrop-blur">
                <dt className="font-display text-lg font-bold text-primary">{stat}</dt>
                <dd className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative order-1 lg:order-2">
          {/* Gold offset frame + floating badge */}
          <div aria-hidden="true" className="absolute inset-0 mx-auto max-w-xl translate-x-3 translate-y-3 rounded-[2rem] border border-gold-deep/50 sm:translate-x-5 sm:translate-y-5" />
          <div className="animate-float-soft absolute -bottom-4 left-2 z-10 flex items-center gap-2 rounded-full border border-gold-deep/30 bg-card px-4 py-2 shadow-lift sm:left-10">
            <Gem className="size-4 text-gold-deep" aria-hidden="true" />
            <span className="text-xs font-bold tracking-wide">Hand-finished in Kerala</span>
          </div>
          <img
            src={heroImg}
            alt="Model wearing Aabha's gold-tone antique necklace and jhumka set"
            width={1200}
            height={900}
            fetchPriority="high"
            className="mx-auto aspect-[4/3] w-full max-w-xl relative mx-auto aspect-[4/3] w-full max-w-xl rounded-[2rem] border border-gold-deep/20 object-cover shadow-lift"
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Offers ------------------------------ */

export function OffersStrip() {
  return (
    <section id="offers" aria-label="Current offers" className="scroll-mt-32 bg-secondary/60">
      <div className="reveal mx-auto max-w-7xl px-4 py-14">
        <SectionHeading eyebrow="Festive Offers" title="Sparkle for Less" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {COUPONS.map((coupon) => (
            <div
              key={coupon.code}
              className="flex items-center justify-between gap-4 rounded-2xl border border-gold-deep/30 bg-gradient-to-r from-card to-secondary px-6 py-5 shadow-elegant transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div>
                <p className="font-display text-xl font-semibold">{coupon.label}</p>
                <p className="text-xs text-muted-foreground">
                  {coupon.minSubtotal > 0
                    ? `On orders above ${formatINR(coupon.minSubtotal)}`
                    : "No minimum order"}
                </p>
              </div>
              <span
                data-testid={`coupon-${coupon.code}`}
                className="shrink-0 rounded-lg border-2 border-dashed border-primary-foreground/50 bg-gradient-maroon px-3.5 py-2 text-sm font-bold tracking-[0.2em] text-primary-foreground shadow-elegant"
              >
                {coupon.code}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Apply codes in the cart before checkout.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------- Shop grid ----------------------------- */

export function ShopSection({
  products,
  searching,
  onAdd,
}: {
  products: Product[];
  searching: boolean;
  onAdd: (productId: string) => void;
}) {
  const grouped = CATEGORIES.map((cat) => ({
    cat,
    items: products.filter((p) => p.categoryId === cat.id),
  }));

  return (
    <section id="shop" aria-label="Shop our collection" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-14 sm:py-20">
      <SectionHeading eyebrow="Collections" title="Shop Our Sparkle" />

      {searching && (
        <p role="status" className="mt-6 text-center text-sm text-muted-foreground">
          {products.length === 0
            ? "Nothing matched your search — try “jhumka”, “pearl” or “bridal”."
            : `Showing ${products.length} piece${products.length === 1 ? "" : "s"} matching your search.`}
        </p>
      )}

      {grouped.map(({ cat, items }) =>
        items.length === 0 ? null : (
          <div key={cat.id} id={`cat-${cat.id}`} className="reveal mt-14 scroll-mt-32">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/70 pb-3">
              <h3 className="font-display text-3xl font-semibold">{cat.name}</h3>
              <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">{cat.tagline}</p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={onAdd} />
              ))}
            </div>
          </div>
        ),
      )}
    </section>
  );
}

/* ------------------------------ About ------------------------------- */

export function AboutSection() {
  return (
    <section id="about" aria-label="About Aabha" className="scroll-mt-32">
      <div className="reveal mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading align="left" eyebrow="Our Story" title="Aabha — The Glow of Grace" />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Born in {BRAND_CITY}, {BRAND_NAME} began with a simple belief: every woman deserves
            jewellery that makes her feel festive — whether she is at a wedding, at work or
            at a chai break. We curate artificial jewellery with antique temple work, kundan,
            polki-look stones and modern minimal pieces, finished by hand and priced for
            everyday joy.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Each piece is quality-checked for plating, stone setting and clasp strength
            before it is wrapped in our signature gift box and shipped to your doorstep.
          </p>
          <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
            {[
              { icon: Sparkles, label: "Hand-finished" },
              { icon: Truck, label: "Ships across India" },
              { icon: Clock, label: "Quality-checked" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 rounded-xl border border-gold-deep/15 bg-card px-3 py-2.5 shadow-elegant">
                <Icon className="size-4 text-gold-deep" aria-hidden="true" />
                <span className="font-semibold">{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <img
          src={aboutImg}
          alt="Close-up of Aabha's gold-tone jewellery arranged on a festive backdrop"
          width={1200}
          height={900}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-[2rem] border border-gold-deep/20 object-cover shadow-lift"
        />
      </div>
    </section>
  );
}

/* ------------------------------- FAQ -------------------------------- */

const FAQS = [
  {
    q: "How long does shipping take?",
    a: "Orders are dispatched within 1–2 business days and typically reach you in 3–6 business days anywhere in India. Shipping is free on every order, and cash on delivery is available.",
  },
  {
    q: "What is your return or exchange policy?",
    a: "If a piece arrives damaged or isn't what you ordered, message us on WhatsApp within 7 days of delivery. We offer a free exchange or full refund for unused items returned in their original packaging. Personalised and pierced jewellery (ear studs worn once) can't be exchanged for hygiene reasons.",
  },
  {
    q: "How do I care for my artificial jewellery?",
    a: "Keep pieces away from water, perfume and direct sunlight. Wipe gently with a soft dry cloth after wear and store each piece in the pouch or box provided. Worn this way, the plating stays bright for years.",
  },
  {
    q: "Is the gold real?",
    a: "No — all Aabha pieces are high-quality artificial (fashion) jewellery with gold-tone antique plating. That's how we keep temple-style, kundan and polki-look designs affordable.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="scroll-mt-32 bg-secondary/60">
      <div className="reveal mx-auto max-w-3xl px-4 py-14 sm:py-20">
        <SectionHeading eyebrow="Good to Know" title="Frequently Asked Questions" />
        <div className="mt-8 space-y-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-gold-deep/15 bg-card px-6 py-4 shadow-elegant transition-colors open:border-gold-deep/40 open:bg-card"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronRight
                  className="size-5 shrink-0 text-gold-deep transition-transform group-open:rotate-90"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Contact ------------------------------ */

export function ContactSection() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello ${BRAND_NAME}! I have a question about your jewellery.`,
  )}`;

  return (
    <section id="contact" aria-label="Contact Aabha" className="scroll-mt-32">
      <div className="reveal mx-auto max-w-3xl px-4 py-14 text-center sm:py-20">
        <SectionHeading eyebrow="Say Hello" title="We'd Love to Hear From You" />
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Questions about a design, a bulk order for a wedding, or help choosing a gift?
          Message us on WhatsApp — we usually reply within a few hours during store hours.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-maroon px-8 text-sm font-bold tracking-wide text-primary-foreground shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elegant"
        >
          <MessageCircle className="size-5" aria-hidden="true" /> Chat on WhatsApp ·{" "}
          {WHATSAPP_DISPLAY}
        </a>
        <dl className="mx-auto mt-8 grid max-w-md gap-3 text-sm sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-gold-deep/15 bg-card px-4 py-3 text-left shadow-elegant">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
            <div>
              <dt className="font-semibold">Studio</dt>
              <dd className="text-muted-foreground">{BRAND_NAME}, {BRAND_CITY}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-gold-deep/15 bg-card px-4 py-3 text-left shadow-elegant">
            <Clock className="mt-0.5 size-4 shrink-0 text-gold-deep" aria-hidden="true" />
            <div>
              <dt className="font-semibold">Store hours</dt>
              <dd className="text-muted-foreground">Mon–Sat, 10 am – 7 pm IST</dd>
            </div>
          </div>
        </dl>
      </div>
    </section>
  );
}

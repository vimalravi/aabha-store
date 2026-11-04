/**
 * Site footer: brand mark, quick links, category list, coupon reminder,
 * WhatsApp contact and copyright.
 */
import { AabhaLogo } from "@/components/aabha-logo";
import { CATEGORIES, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/data/catalog";

const QUICK_LINKS = [
  { href: "#shop", label: "Shop" },
  { href: "#offers", label: "Offers" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function SiteFooter() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <footer className="relative overflow-hidden bg-gradient-maroon text-primary-foreground">
      <div className="gold-rule absolute inset-x-0 top-0" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="inline-block rounded-xl bg-background/95 px-3 py-1.5"><AabhaLogo className="h-11 w-auto" /></span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/75">
            Hand-finished artificial jewellery from Trivandrum — temple traditions,
            everyday sparkle, delivered across India.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gold">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Categories">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gold">Categories</h2>
          <ul className="mt-4 space-y-2.5">
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#cat-${cat.id}`}
                  className="text-sm text-primary-foreground/70 transition-colors hover:text-gold"
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-gold">Reach Us</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
            <li>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gold underline underline-offset-4 hover:text-primary-foreground"
              >
                WhatsApp · {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>Mon–Sat, 10 am – 7 pm IST</li>
            <li>Free shipping across India</li>
            <li>Cash on delivery available</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Aabha · Trivandrum, Kerala</p>
          <p>Made with ♥ for everyday sparkle</p>
        </div>
      </div>
    </footer>
  );
}

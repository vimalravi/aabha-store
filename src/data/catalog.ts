/**
 * Aabha catalogue data.
 *
 * ------------------------------------------------------------------
 * PLACEHOLDER IMAGES: every `image` below points at a free Unsplash
 * photo used as a stand-in. To use real product photography, either
 *  - drop files into `public/images/...` and set
 *      image: "/images/necklace-01.jpg"
 *  - or paste any hosted image URL.
 * The `alt` text should describe the actual product once real photos
 * are in place.
 * ------------------------------------------------------------------
 */

export interface Category {
  id: string;
  name: string;
  tagline: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  image: string;
  alt: string;
  /** Original (struck-through) price in ₹ */
  originalPrice: number;
  /** Current discounted price in ₹ */
  price: number;
  description: string;
  /** Shows the extra "Festive Offer" badge */
  festive?: boolean;
}

export interface Coupon {
  code: string;
  label: string;
  /** Percentage off the subtotal, e.g. 20 = 20% */
  percent: number;
  /** Minimum subtotal (₹) required, 0 = no minimum */
  minSubtotal: number;
}

export const WHATSAPP_NUMBER = "918714324466";
export const WHATSAPP_DISPLAY = "+91 87143 24466";
export const BRAND_NAME = "Aabha";
export const BRAND_CITY = "Trivandrum, Kerala";

/** Build an Unsplash placeholder URL (swap for real photo paths any time). */
const u = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=800&q=80`;

export const CATEGORIES: Category[] = [
  { id: "necklaces", name: "Necklaces", tagline: "Statement strings & delicate chains" },
  { id: "earrings", name: "Earrings", tagline: "Jhumkas, hoops & studs" },
  { id: "bangles", name: "Bangles", tagline: "Stacks, cuffs & bracelets" },
  { id: "rings", name: "Rings", tagline: "Solitaires & everyday bands" },
  { id: "bridal", name: "Bridal Sets", tagline: "Complete wedding-day looks" },
  { id: "mangalsutra", name: "Mangalsutra", tagline: "Sacred black-bead classics" },
  { id: "pendants", name: "Pendants", tagline: "Charms close to the heart" },
];

export const PRODUCTS: Product[] = [
  // ----- Necklaces -----
  {
    id: "n1",
    name: "Aarohi Antique Gold-Tone Temple Necklace",
    categoryId: "necklaces",
    image: u("1611652022419-a9419f74343d"),
    alt: "Antique gold-tone temple necklace with intricate detailing worn on a collarbone",
    originalPrice: 2899,
    price: 2190,
    description: "Hand-finished antique plating with temple motifs and an adjustable dori closure.",
  },
  {
    id: "n2",
    name: "Noor Layered Pendant Necklace",
    categoryId: "necklaces",
    image: u("1506630448388-4e683c67ddb0"),
    alt: "Layered gold-tone pendant necklaces with drop charms on a soft fabric backdrop",
    originalPrice: 1699,
    price: 1289,
    description: "Two-tier chain layering with a matte coin pendant — an effortless daily drape.",
    festive: true,
  },
  {
    id: "n3",
    name: "Rivaa Solitaire Drop Necklace",
    categoryId: "necklaces",
    image: u("1599643478518-a784e5dc4c8f"),
    alt: "Gold-tone chain necklace with a faceted teardrop gemstone pendant",
    originalPrice: 1299,
    price: 999,
    description: "A single faceted drop stone set on a fine 18-inch gold-tone cable chain.",
  },
  {
    id: "n4",
    name: "Ivya Pearl Charm Necklace",
    categoryId: "necklaces",
    image: u("1600721391689-2564bb8055de"),
    alt: "Delicate gold-tone necklace with a freshwater pearl charm worn on a model",
    originalPrice: 1499,
    price: 1149,
    description: "Lustrous shell-pearl charm on a whisper-thin chain — perfect for office wear.",
  },

  // ----- Earrings -----
  {
    id: "e1",
    name: "Zoya Gold-Tone Hoop Earrings",
    categoryId: "earrings",
    image: u("1617038220319-276d3cfab638"),
    alt: "Pair of twisted gold-tone hoop earrings photographed on neutral stones",
    originalPrice: 799,
    price: 599,
    description: "Feather-light twisted hoops with a secure clasp — all-day comfort.",
  },
  {
    id: "e2",
    name: "Meher Sapphire-Blue Heart Drops",
    categoryId: "earrings",
    image: u("1630019852942-f89202989a59"),
    alt: "Gold-tone drop earrings with sapphire-blue heart crystals on white fabric",
    originalPrice: 999,
    price: 749,
    description: "Faceted heart crystals in deep sapphire blue, suspended from fine hooks.",
  },
  {
    id: "e3",
    name: "Rani Antique Kundan Studs",
    categoryId: "earrings",
    image: u("1617922001439-4a2e6562f328"),
    alt: "Round antique gold-tone kundan stud earrings with a central stone",
    originalPrice: 899,
    price: 679,
    description: "Classic kundan-set studs with a domed centre stone and beaded rim.",
    festive: true,
  },
  {
    id: "e4",
    name: "Tara Temple Jhumka Earrings",
    categoryId: "earrings",
    image: u("1601121141461-9d6647bca1ed"),
    alt: "Traditional gold-tone temple jhumka earrings with beaded droplets",
    originalPrice: 1199,
    price: 899,
    description: "Temple-style jhumkas with tiny ghungroo droplets for a festive sway.",
  },

  // ----- Bangles -----
  {
    id: "b1",
    name: "Suhana Rose-Gold Bangle Pair",
    categoryId: "bangles",
    image: u("1611591437281-460bfbe1220a"),
    alt: "Pair of rose-gold bangles with pavé-style crystal lining",
    originalPrice: 1099,
    price: 829,
    description: "A matched pair of rose-gold bangles lined with hand-set crystal accents.",
  },
  {
    id: "b2",
    name: "Kavia Twisted Chain Bracelet",
    categoryId: "bangles",
    image: u("1602173574767-37ac01994b2a"),
    alt: "Chunky gold-tone twisted chain bracelet resting on a magazine",
    originalPrice: 949,
    price: 719,
    description: "Bold twisted-link bracelet with a lobster clasp and 1-inch extender.",
  },
  {
    id: "b3",
    name: "Anaya Textured Gold Bangle",
    categoryId: "bangles",
    image: u("1611591437281-460bfbe1220a"),
    alt: "Textured antique gold-tone bangle with etched surface detail",
    originalPrice: 1299,
    price: 979,
    description: "Etched antique texture on a wide gold-tone bangle — a karwa chath favourite.",
    festive: true,
  },
  {
    id: "b4",
    name: "Diya Charm Stack Bracelet",
    categoryId: "bangles",
    image: u("1602173574767-37ac01994b2a"),
    alt: "Delicate gold-tone chain bracelet with small hanging charms",
    originalPrice: 799,
    price: 599,
    description: "Dainty charm bracelet that layers beautifully with your existing stacks.",
  },

  // ----- Rings -----
  {
    id: "r1",
    name: "Ambar Solitaire Halo Ring",
    categoryId: "rings",
    image: u("1605100804763-247f67b3557e"),
    alt: "Silver-tone ring with a round solitaire stone in a crystal halo setting",
    originalPrice: 1199,
    price: 899,
    description: "Brilliant-cut solitaire framed by a halo of micro-pavé crystals.",
  },
  {
    id: "r2",
    name: "Gulnaaz Rose Stone Cocktail Ring",
    categoryId: "rings",
    image: u("1603561591411-07134e71a2a9"),
    alt: "Gold-tone cocktail ring with a large rectangular rose-pink stone",
    originalPrice: 1099,
    price: 829,
    description: "A statement emerald-cut blush stone — dinner-party jewellery at its finest.",
    festive: true,
  },
  {
    id: "r3",
    name: "Rhea Minimal Band Ring",
    categoryId: "rings",
    image: u("1605100804763-247f67b3557e"),
    alt: "Slim gold-tone band ring with a brushed finish",
    originalPrice: 499,
    price: 399,
    description: "A whisper-thin brushed band that pairs with everything you own.",
  },
  {
    id: "r4",
    name: "Siya Rose-Tone Statement Ring",
    categoryId: "rings",
    image: u("1603561591411-07134e71a2a9"),
    alt: "Rose-tone ring with a halo of crystals around a central stone",
    originalPrice: 899,
    price: 679,
    description: "Rose-tone setting with a clustered crystal halo and split shank.",
  },

  // ----- Bridal Sets -----
  {
    id: "bs1",
    name: "Rajkumari Bridal Temple Set",
    categoryId: "bridal",
    image: u("1601121141461-9d6647bca1ed"),
    alt: "Traditional South Indian gold-tone temple bridal necklace set with jhumkas",
    originalPrice: 4999,
    price: 3749,
    description: "Necklace, jhumkas and maang tikka in a temple-work finish — wedding-ready.",
  },
  {
    id: "bs2",
    name: "Maharani Polki Necklace Set",
    categoryId: "bridal",
    image: u("1620656798579-1984d9e87df7"),
    alt: "Regal polki-style necklace set with uncut-look stones on a velvet backdrop",
    originalPrice: 3999,
    price: 2999,
    description: "Uncut-look polki stones framed in gold-tone meenakari detailing.",
    festive: true,
  },
  {
    id: "bs3",
    name: "Kanika Kundan Bridal Suite",
    categoryId: "bridal",
    image: u("1506630448388-4e683c67ddb0"),
    alt: "Layered kundan bridal necklace set with matching drop earrings",
    originalPrice: 3499,
    price: 2649,
    description: "Three-piece kundan suite: layered necklace, chandbalis and a tikka.",
  },
  {
    id: "bs4",
    name: "Devika Reception Necklace Set",
    categoryId: "bridal",
    image: u("1611652022419-a9419f74343d"),
    alt: "Contemporary gold-tone reception necklace set with a choker-style fit",
    originalPrice: 2799,
    price: 2099,
    description: "A sleek choker set with matching studs for the reception evening.",
  },

  // ----- Mangalsutra -----
  {
    id: "m1",
    name: "Sanjana Black-Bead Mangalsutra",
    categoryId: "mangalsutra",
    image: u("1600721391689-2564bb8055de"),
    alt: "Classic black-bead mangalsutra with a gold-tone pendant worn on a model",
    originalPrice: 1499,
    price: 1129,
    description: "Timeless black-bead strand with a polished gold-tone vati pendant.",
  },
  {
    id: "m2",
    name: "Vaani Gold-Tone Tanmaniya",
    categoryId: "mangalsutra",
    image: u("1599643478518-a784e5dc4c8f"),
    alt: "Mangalsutra with a faceted tanmaniya pendant on a gold-tone chain",
    originalPrice: 1899,
    price: 1429,
    description: "Double-strand black beads crowned with a sparkling tanmaniya drop.",
    festive: true,
  },
  {
    id: "m3",
    name: "Prisha Diamond-Cut Mangalsutra",
    categoryId: "mangalsutra",
    image: u("1611652022419-a9419f74343d"),
    alt: "Modern diamond-cut pendant mangalsutra on a fine black-bead chain",
    originalPrice: 2199,
    price: 1649,
    description: "Contemporary diamond-cut pendant for everyday elegance with tradition.",
  },
  {
    id: "m4",
    name: "Nitya Heart-Pendant Mangalsutra",
    categoryId: "mangalsutra",
    image: u("1588444837495-c6cfeb53f32d"),
    alt: "Mangalsutra with a crystal heart-shaped pendant on a fine chain",
    originalPrice: 1299,
    price: 979,
    description: "A crystal heart pendant strung on fine black beads — a modern twist.",
  },

  // ----- Pendants -----
  {
    id: "p1",
    name: "Kiara Heart Halo Pendant",
    categoryId: "pendants",
    image: u("1588444837495-c6cfeb53f32d"),
    alt: "Open heart-shaped pendant lined with crystals on a fine chain",
    originalPrice: 999,
    price: 749,
    description: "An open crystal-lined heart on an 18-inch chain — a gift-box favourite.",
  },
  {
    id: "p2",
    name: "Mitali Freshwater Pearl Pendant",
    categoryId: "pendants",
    image: u("1515562141207-7a88fb7ce338"),
    alt: "Freshwater pearl pendant on a delicate chain presented in a gift box",
    originalPrice: 1199,
    price: 899,
    description: "A single lustrous freshwater pearl — arrives in our signature gift box.",
  },
  {
    id: "p3",
    name: "Trishna Celestial Gem Pendant",
    categoryId: "pendants",
    image: u("1599643478518-a784e5dc4c8f"),
    alt: "Teal gemstone pendant framed by gold-tone celestial detailing",
    originalPrice: 1499,
    price: 1129,
    description: "A teal faceted gem framed by celestial gold-tone filigree work.",
    festive: true,
  },
  {
    id: "p4",
    name: "Avni Oval Locket Pendant",
    categoryId: "pendants",
    image: u("1600721391689-2564bb8055de"),
    alt: "Oval gold-tone locket pendant on a fine cable chain",
    originalPrice: 899,
    price: 679,
    description: "A vintage-inspired oval locket that opens to hold two tiny photos.",
  },
];

/** Coupon codes shown around the storefront. */
export const COUPONS: Coupon[] = [
  { code: "AABHA10", label: "Aabha Welcome — 10% off", percent: 10, minSubtotal: 0 },
  { code: "FESTIVE20", label: "Festive Sparkle — 20% off", percent: 20, minSubtotal: 1999 },
];

/**
 * Resolve a coupon code against the current subtotal.
 * Returns null when the code is unknown or the minimum is not met.
 */
export function resolveCoupon(code: string, subtotal: number): Coupon | null {
  const normalized = code.trim().toUpperCase();
  const coupon = COUPONS.find((c) => c.code === normalized);
  if (!coupon || subtotal < coupon.minSubtotal) return null;
  return coupon;
}

/** Format a rupee amount without decimals, Indian digit grouping. */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

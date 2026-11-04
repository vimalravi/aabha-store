/**
 * Product card — image (with placeholder fallback), discount badges,
 * pricing, short description and a touch-friendly Add to Cart button.
 */
import { useState } from "react";
import { Check, Plus } from "lucide-react";

import { formatINR, type Product } from "@/data/catalog";

export function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (productId: string) => void;
}) {
  const [justAdded, setJustAdded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const discountPct = Math.round((1 - product.price / product.originalPrice) * 100);

  // Fallback image keeps the grid tidy if a placeholder URL ever breaks.
  const imageSrc = imageFailed
    ? `https://picsum.photos/seed/aabha-${product.id}/600/700`
    : product.image;

  const handleAdd = () => {
    onAdd(product.id);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold-deep/15 bg-card shadow-elegant transition-all duration-500 hover:-translate-y-1 hover:border-gold-deep/40 hover:shadow-lift">
      <div className="relative overflow-hidden bg-secondary" style={{ aspectRatio: "4 / 5" }}>
        <img
          src={imageSrc}
          alt={product.alt}
          width={600}
          height={750}
          loading="lazy"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
        />

        {/* Soft vignette for depth */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Discount badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          <span className="rounded-full bg-gradient-gold px-2.5 py-1 text-[11px] font-bold tracking-wide text-primary-foreground shadow-elegant">
            {discountPct}% OFF
          </span>
          {product.festive && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary-foreground">
              Festive Offer
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-xl leading-snug font-semibold text-foreground">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{product.description}</p>

        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-xl font-bold text-primary tabular-nums">{formatINR(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">
            {formatINR(product.originalPrice)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Add ${product.name} to cart`}
          className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-gold-deep/40 bg-secondary px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-gradient-maroon hover:text-primary-foreground hover:shadow-elegant active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {justAdded ? (
            <>
              <Check className="size-4" aria-hidden="true" /> Added to Cart
            </>
          ) : (
            <>
              <Plus className="size-4" aria-hidden="true" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </article>
  );
}

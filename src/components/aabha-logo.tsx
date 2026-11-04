/**
 * Aabha brand logo — inline SVG.
 * A Cormorant Garamond wordmark with a lotus-gem ornament and gold gradient.
 * Rendered in the header, footer and (as a standalone variant) the favicon.
 */
export function AabhaLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 196 56"
      role="img"
      aria-label="Aabha"
      className={className}
      data-testid="aabha-logo"
    >
      <defs>
        <linearGradient id="aabhaGoldGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--gold-deep, #8a6a1f)" />
          <stop offset="50%" stopColor="var(--gold, #d9b45b)" />
          <stop offset="100%" stopColor="var(--gold-deep, #8a6a1f)" />
        </linearGradient>
      </defs>

      {/* Ornamental lotus-gem motif sitting over the initial letter */}
      <g stroke="url(#aabhaGoldGrad)" fill="none" strokeWidth="1.4" strokeLinecap="round">
        {/* Gem */}
        <path d="M14 6 l6 4.5 -6 4.5 -6 -4.5 Z" fill="url(#aabhaGoldGrad)" stroke="none" />
        {/* Lotus petals cradling the gem */}
        <path d="M6 12 q-3 6 1 10" />
        <path d="M22 12 q3 6 -1 10" />
        <path d="M10.5 15 q-1.5 5 .5 8.5" />
        <path d="M17.5 15 q1.5 5 -.5 8.5" />
      </g>

      {/* Wordmark */}
      <text
        x="32"
        y="40"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontWeight="600"
        fontSize="34"
        letterSpacing="2"
        fill="var(--foreground, currentColor)"
      >
        Aabha
      </text>

      {/* Filigree flourish under the wordmark */}
      <g stroke="url(#aabhaGoldGrad)" strokeWidth="1.2" strokeLinecap="round">
        <path d="M32 46 q30 -5 62 0" fill="none" />
        <circle cx="97" cy="46" r="1.8" fill="url(#aabhaGoldGrad)" stroke="none" />
      </g>
    </svg>
  );
}

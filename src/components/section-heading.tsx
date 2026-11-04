/** Eyebrow + display title + gold ornament divider used by every section. */
export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <header className={centered ? "text-center" : "text-left"}>
      <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold-deep">{eyebrow}</p>
      <Tag className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
        {title}
      </Tag>
      <div className={`mt-4 flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        <span className="gold-rule w-14 sm:w-20" />
        <span aria-hidden="true" className="size-1.5 rotate-45 bg-gradient-gold" />
        <span className="gold-rule w-14 sm:w-20" />
      </div>
    </header>
  );
}

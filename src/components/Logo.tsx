import { business } from "@/data/business";

/**
 * The MegaDream mark: yellow disc with the "MD" monogram, matching the
 * brochure logo.
 *
 * Placeholder until the high-resolution logo file is supplied — swap the <svg>
 * for an <img> pointing at the real asset and the layout stays identical.
 */
export function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label={`${business.name} logo`}>
      <circle cx="24" cy="24" r="23" fill="#f5c518" />
      <text
        x="24"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="19"
        fontWeight="600"
        letterSpacing="0.5"
        fill="#2b241d"
      >
        MD
      </text>
    </svg>
  );
}

/** Logo mark plus wordmark, used in the navbar and footer. */
export default function Logo({
  className = "",
  textClassName = "text-white",
}: {
  className?: string;
  textClassName?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="w-8 h-8 shrink-0" />
      <span className={`font-serif-display text-lg md:text-xl tracking-[0.18em] font-medium ${textClassName}`}>
        MEGADREAM
      </span>
    </span>
  );
}

import { business } from "@/data/business";
import logoMark from "@/assets/img/logo-mark.webp";

/**
 * The client's supplied logo mark — the gold disc with its monogram.
 *
 * Cut from the artwork the client sent, which had the mark sitting on a black
 * field above a wordmark. Only the disc is kept, masked to its own ellipse so
 * the backdrop and the glow around it drop out while the dark monogram inside
 * stays intact. That matters because every place this renders sits on a dark
 * background, where a baked-in black square would show as a hard edge.
 *
 * `object-contain` keeps the ellipse undistorted in the square boxes the
 * callers ask for (`w-8 h-8` and friends).
 */
export function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <img
      src={logoMark}
      alt={`${business.name} logo`}
      className={`${className} object-contain select-none`}
      draggable={false}
    />
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

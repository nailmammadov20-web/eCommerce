import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductVisualProps {
  imageId?: string | null;
  imageAlt?: string;
  wattage?: number;
  className?: string;
}

/**
 * Renders the real DB-stored product photo when one has been uploaded via the
 * admin panel, otherwise falls back to a stylized abstract render so the
 * (intentionally small) catalog never shows a broken-image icon.
 */
export function ProductVisual({ imageId, imageAlt, wattage, className }: ProductVisualProps) {
  if (imageId) {
    return (
      <div className={cn("relative overflow-hidden rounded-3xl bg-muted", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/api/images/${imageId}`}
          alt={imageAlt ?? ""}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(70,110,255,0.35),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {wattage ? (
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-2 select-none text-center text-[7rem] leading-none font-bold text-white/[0.06] sm:text-[9rem]"
        >
          {wattage}W
        </span>
      ) : null}

      <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10 backdrop-blur-sm sm:h-28 sm:w-28">
        <Zap className="h-11 w-11 text-electric" strokeWidth={1.25} />
      </div>

      {wattage ? (
        <span className="absolute right-4 bottom-4 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/10 backdrop-blur-sm">
          {wattage}W
        </span>
      ) : null}
    </div>
  );
}

"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useHydrated } from "@/lib/hooks/use-hydrated";

export function WishlistButton() {
  const hydrated = useHydrated();
  const items = useWishlistStore((s) => s.items);
  const count = hydrated ? items.length : 0;

  return (
    <Link
      href="/wishlist"
      aria-label="Seçilmişlər"
      className="relative hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent md:inline-flex"
    >
      <Heart className="h-5 w-5" strokeWidth={1.5} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-electric px-1 text-[10px] font-medium text-electric-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}

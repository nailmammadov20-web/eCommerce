"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore, cartItemCount } from "@/lib/store/cart-store";
import { useHydrated } from "@/lib/hooks/use-hydrated";

export function CartButton() {
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const count = hydrated ? cartItemCount(items) : 0;

  return (
    <Link
      href="/cart"
      aria-label="Səbət"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent"
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-electric px-1 text-[10px] font-medium text-electric-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}

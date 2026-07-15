"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { ProductVisual } from "@/components/shared/product-visual";
import { useCartStore, type CartItem } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartItemRow({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 border-b border-border py-6 last:border-0">
      <Link href={`/shop/${item.slug}`} className="shrink-0">
        <ProductVisual className="h-24 w-24" />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/shop/${item.slug}`} className="font-medium hover:text-electric">
              {item.name}
            </Link>
            {item.variantName && <p className="mt-0.5 text-sm text-muted-foreground">{item.variantName}</p>}
          </div>
          <button
            aria-label="Sil"
            onClick={() => removeItem(item.productId, item.variantId)}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center rounded-full border border-border">
            <button
              aria-label="Azalt"
              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
            <button
              aria-label="Artır"
              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
}

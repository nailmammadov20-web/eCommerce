"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItemRow } from "@/components/cart/cart-item-row";
import { useCartStore, cartSubtotal } from "@/lib/store/cart-store";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { formatPrice } from "@/lib/utils";

export function CartPageClient() {
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);

  if (!hydrated) {
    return <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8" />;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" strokeWidth={1.25} />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">Səbətiniz boşdur</h1>
        <p className="mt-3 text-muted-foreground">Mağazamıza baxın və ideal adapterinizi tapın.</p>
        <Button render={<Link href="/shop" />} size="lg" className="mt-8 rounded-full">
          Mağazaya bax
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    );
  }

  const subtotal = cartSubtotal(items);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">Səbət</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          {items.map((item) => (
            <CartItemRow key={`${item.productId}-${item.variantId ?? "base"}`} item={item} />
          ))}
        </div>

        <div className="h-fit rounded-3xl border border-border p-6">
          <h2 className="font-semibold">Sifariş xülasəsi</h2>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-muted-foreground">Ara cəm</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Çatdırılma haqqı checkout səhifəsində hesablanır.</p>
          <Button render={<Link href="/checkout" />} size="lg" className="mt-6 w-full rounded-full">
            Checkouta keç
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

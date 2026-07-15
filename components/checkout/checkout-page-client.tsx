"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { ProductVisual } from "@/components/shared/product-visual";
import { useCartStore } from "@/lib/store/cart-store";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { formatPrice } from "@/lib/utils";

export function CheckoutPageClient() {
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);

  if (!hydrated) {
    return <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8" />;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight">Səbətiniz boşdur</h1>
        <p className="mt-3 text-muted-foreground">Checkout etmək üçün əvvəlcə mağazadan məhsul seçin.</p>
        <Button render={<Link href="/shop" />} size="lg" className="mt-8 rounded-full">
          Mağazaya bax
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">Checkout</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <CheckoutForm />

        <div className="h-fit rounded-3xl border border-border p-6">
          <h2 className="font-semibold">Sifarişiniz</h2>
          <div className="mt-4 space-y-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId ?? "base"}`} className="flex items-center gap-3">
                <ProductVisual className="h-14 w-14 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  {item.variantName && <p className="text-xs text-muted-foreground">{item.variantName}</p>}
                  <p className="text-xs text-muted-foreground">Miqdar: {item.quantity}</p>
                </div>
                <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

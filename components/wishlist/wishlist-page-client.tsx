"use client";

import Link from "next/link";
import { Heart, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/shared/product-visual";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { formatPrice } from "@/lib/utils";

export function WishlistPageClient() {
  const hydrated = useHydrated();
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);

  if (!hydrated) {
    return <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8" />;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <Heart className="mx-auto h-12 w-12 text-muted-foreground" strokeWidth={1.25} />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">Seçilmişlər siyahınız boşdur</h1>
        <p className="mt-3 text-muted-foreground">Bəyəndiyiniz məhsulları ürək işarəsinə klikləyərək buraya əlavə edin.</p>
        <Button render={<Link href="/shop" />} size="lg" className="mt-8 rounded-full">
          Mağazaya bax
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">Seçilmişlər</h1>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.productId} className="group relative">
            <button
              onClick={() => remove(item.productId)}
              aria-label="Seçilmişlərdən sil"
              className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-muted-foreground shadow-sm hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </button>
            <Link href={`/shop/${item.slug}`}>
              <ProductVisual imageId={item.imageId} imageAlt={item.name} wattage={item.wattage} className="aspect-square w-full" />
              <div className="mt-4 flex items-center justify-between">
                <h3 className="font-medium">{item.name}</h3>
                <span className="font-semibold">{formatPrice(item.price)}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

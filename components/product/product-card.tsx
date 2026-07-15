"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import { ProductVisual } from "@/components/shared/product-visual";
import { QuickViewDialog } from "@/components/product/quick-view-dialog";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { formatPrice, cn } from "@/lib/utils";

export interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  wattage: number;
  connectorType: string;
  imageId?: string | null;
  stock: number;
  isDemo?: boolean;
  rating?: number | null;
  reviewCount?: number;
}

export function ProductCard({
  id,
  slug,
  name,
  price,
  compareAtPrice,
  wattage,
  connectorType,
  imageId,
  stock,
  isDemo = false,
  rating = null,
  reviewCount = 0,
}: ProductCardProps) {
  const hydrated = useHydrated();
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => (hydrated ? s.has(id) : false));
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const hasDiscount = !!compareAtPrice && compareAtPrice > price;
  const discountPercent = hasDiscount ? Math.round((1 - price / compareAtPrice!) * 100) : 0;
  const purchasable = !isDemo && stock > 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ productId: id, variantId: null, name, price, slug, quantity: 1, maxStock: stock });
    toast.success(`${name} səbətə əlavə olundu`);
  }

  function handleToggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggleWishlist({ productId: id, name, slug, price, imageId, wattage });
  }

  return (
    <div className="group flex flex-col">
      <div className="relative">
        <Link href={`/shop/${slug}`}>
          <ProductVisual imageId={imageId} imageAlt={name} wattage={wattage} className="aspect-square w-full" />
        </Link>

        {hasDiscount && (
          <span className="absolute top-2 left-2 rounded-full bg-electric px-2.5 py-1 text-xs font-semibold text-electric-foreground">
            -{discountPercent}%
          </span>
        )}
        {isDemo && (
          <span className="absolute top-2 left-2 rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background">
            Tezliklə
          </span>
        )}

        <button
          onClick={handleToggleWishlist}
          aria-label="Seçilmişlərə əlavə et"
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-muted-foreground shadow-sm transition-colors hover:text-destructive"
        >
          <Heart className={cn("h-4 w-4", isWishlisted && "fill-destructive text-destructive")} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setQuickViewOpen(true);
          }}
          className="absolute inset-x-2 bottom-2 flex items-center justify-center gap-1.5 rounded-full bg-background/95 py-2 text-xs font-medium opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
        >
          <Eye className="h-3.5 w-3.5" /> Sürətli baxış
        </button>
      </div>

      <Link href={`/shop/${slug}`} className="mt-4 block">
        <h3 className="font-medium transition-colors group-hover:text-electric">{name}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {wattage}W · {connectorType}
        </p>
        {reviewCount > 0 && rating != null && (
          <div className="mt-1.5 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-electric text-electric" />
            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
        )}
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold">{formatPrice(price)}</span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(compareAtPrice!)}</span>
          )}
        </div>

        {purchasable ? (
          <button
            onClick={handleAddToCart}
            aria-label="Səbətə at"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:bg-foreground/85"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        ) : (
          <span className="text-xs text-muted-foreground">{isDemo ? "Tezliklə" : "Stokda yoxdur"}</span>
        )}
      </div>

      <QuickViewDialog
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
        product={{
          id,
          slug,
          name,
          shortDescription: `${wattage}W · ${connectorType}`,
          price,
          compareAtPrice,
          wattage,
          connectorType,
          imageId,
          stock,
          isDemo,
        }}
      />
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag, Zap, Clock, Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { formatPrice, cn } from "@/lib/utils";

interface Variant {
  id: string;
  name: string;
  priceOverride: number | null;
  stock: number;
}

interface AddToCartPanelProps {
  productId: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  variants: Variant[];
  isDemo?: boolean;
  imageId?: string | null;
  wattage: number;
}

export function AddToCartPanel({
  productId,
  slug,
  name,
  price,
  compareAtPrice,
  stock,
  variants,
  isDemo = false,
  imageId,
  wattage,
}: AddToCartPanelProps) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const hydrated = useHydrated();
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => (hydrated ? s.has(productId) : false));
  const [variantId, setVariantId] = useState<string | null>(variants[0]?.id ?? null);
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = variants.find((v) => v.id === variantId) ?? null;
  const effectivePrice = selectedVariant?.priceOverride ?? price;
  const effectiveStock = selectedVariant ? selectedVariant.stock : stock;
  const inStock = effectiveStock > 0;
  const hasDiscount = !!compareAtPrice && compareAtPrice > price;

  const maxQuantity = useMemo(() => Math.max(1, Math.min(effectiveStock, 10)), [effectiveStock]);

  function handleAddToCart() {
    addItem({
      productId,
      variantId: selectedVariant?.id ?? null,
      variantName: selectedVariant?.name ?? null,
      name,
      price: effectivePrice,
      slug,
      quantity,
      maxStock: effectiveStock,
    });
    toast.success(`${name} səbətə əlavə olundu`);
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push("/checkout");
  }

  function handleToggleWishlist() {
    toggleWishlist({ productId, name, slug, price, imageId, wattage });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-semibold">{formatPrice(effectivePrice)}</span>
        {hasDiscount && (
          <span className="text-lg text-muted-foreground line-through">{formatPrice(compareAtPrice!)}</span>
        )}
        {!isDemo &&
          (inStock ? (
            <span className="text-sm text-emerald-600 dark:text-emerald-500">Stokda var</span>
          ) : (
            <span className="text-sm text-destructive">Stokda yoxdur</span>
          ))}
      </div>

      {isDemo && (
        <div className="flex items-center gap-2 rounded-2xl bg-secondary/50 p-4 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0 text-electric" strokeWidth={1.5} />
          Bu məhsul tezliklə kataloqumuza əlavə olunacaq. Hazırda sifariş vermək mümkün deyil.
        </div>
      )}

      {variants.length > 0 && (
        <div>
          <span className="text-sm font-medium">Seçim</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setVariantId(variant.id)}
                disabled={variant.stock === 0}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  variantId === variant.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground/40"
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Miqdar</span>
        <div className="flex items-center rounded-full border border-border">
          <button
            aria-label="Azalt"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={isDemo}
            className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-sm font-medium">{quantity}</span>
          <button
            aria-label="Artır"
            onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
            disabled={isDemo}
            className="flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        {isDemo ? (
          <Button size="lg" disabled className="h-12 flex-1 rounded-full">
            Tezliklə
          </Button>
        ) : (
          <>
            <Button
              size="lg"
              variant="outline"
              disabled={!inStock}
              onClick={handleAddToCart}
              className="h-12 flex-1 rounded-full"
            >
              <ShoppingBag className="mr-1.5 h-4 w-4" />
              Səbətə at
            </Button>
            <Button size="lg" disabled={!inStock} onClick={handleBuyNow} className="h-12 flex-1 rounded-full">
              <Zap className="mr-1.5 h-4 w-4" />
              İndi al
            </Button>
          </>
        )}
        <button
          onClick={handleToggleWishlist}
          aria-label="Seçilmişlərə əlavə et"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:border-foreground/40"
        >
          <Heart className={cn("h-4.5 w-4.5", isWishlisted && "fill-destructive text-destructive")} />
        </button>
      </div>
    </div>
  );
}

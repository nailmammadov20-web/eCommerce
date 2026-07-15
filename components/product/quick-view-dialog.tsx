"use client";

import Link from "next/link";
import { toast } from "sonner";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/shared/product-visual";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils";

export interface QuickViewProduct {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number | null;
  wattage: number;
  connectorType: string;
  imageId?: string | null;
  stock: number;
  isDemo: boolean;
}

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: QuickViewProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const inStock = product.stock > 0;
  const hasDiscount = !!product.compareAtPrice && product.compareAtPrice > product.price;

  function handleAdd() {
    addItem({
      productId: product.id,
      variantId: null,
      name: product.name,
      price: product.price,
      slug: product.slug,
      quantity: 1,
      maxStock: product.stock,
    });
    toast.success(`${product.name} səbətə əlavə olundu`);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <div className="grid gap-6 pt-2 sm:grid-cols-2">
          <ProductVisual
            imageId={product.imageId}
            imageAlt={product.name}
            wattage={product.wattage}
            className="aspect-square w-full"
          />
          <div>
            <DialogHeader>
              <DialogTitle className="text-xl">{product.name}</DialogTitle>
            </DialogHeader>
            <p className="mt-2 text-sm text-muted-foreground">{product.shortDescription}</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
              {hasDiscount && (
                <span className="text-muted-foreground line-through">{formatPrice(product.compareAtPrice!)}</span>
              )}
            </div>
            <div className="mt-6 flex flex-col gap-2">
              {product.isDemo ? (
                <Button disabled className="rounded-full">
                  Tezliklə
                </Button>
              ) : (
                <Button onClick={handleAdd} disabled={!inStock} className="rounded-full">
                  <ShoppingBag className="mr-1.5 h-4 w-4" /> Səbətə at
                </Button>
              )}
              <Button variant="outline" render={<Link href={`/shop/${product.slug}`} />} className="rounded-full">
                Ətraflı bax
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

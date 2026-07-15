import Link from "next/link";
import { ArrowRight, Zap, Cable } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/shared/product-visual";
import { Reveal } from "@/components/shared/reveal";
import { formatPrice } from "@/lib/utils";

interface FeaturedChargerProps {
  product: {
    slug: string;
    name: string;
    shortDescription: string;
    price: number;
    wattage: number;
    connectorType: string;
    imageId?: string | null;
  };
}

export function FeaturedCharger({ product }: FeaturedChargerProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <ProductVisual
            imageId={product.imageId}
            imageAlt={product.name}
            wattage={product.wattage}
            className="aspect-square w-full"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <span className="text-sm font-medium tracking-wide text-electric uppercase">Seçilmiş məhsul</span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{product.name}</h2>
          <p className="mt-5 text-lg text-muted-foreground">{product.shortDescription}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm">
              <Zap className="h-4 w-4 text-electric" strokeWidth={1.5} />
              {product.wattage}W sürətli şarj
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm">
              <Cable className="h-4 w-4 text-electric" strokeWidth={1.5} />
              {product.connectorType}
            </span>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <span className="text-3xl font-semibold">{formatPrice(product.price)}</span>
            <Button render={<Link href={`/shop/${product.slug}`} />} size="lg" className="h-12 rounded-full px-8">
              Məhsula bax
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

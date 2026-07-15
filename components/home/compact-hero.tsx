"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductVisual } from "@/components/shared/product-visual";

interface CompactHeroProps {
  headline: string;
  subtitle: string;
  ctaLabel: string;
  product: {
    slug: string;
    wattage: number;
    imageId?: string | null;
  } | null;
}

export function CompactHero({ headline, subtitle, ctaLabel, product }: CompactHeroProps) {
  return (
    <section className="border-b border-border/60 bg-black text-white">
      <div className="mx-auto grid min-h-[36vh] max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:py-0 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {headline}
          </h1>
          <p className="mt-4 max-w-md text-white/70">{subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              render={<Link href="/shop" />}
              size="lg"
              className="h-12 rounded-full bg-electric px-7 text-electric-foreground hover:bg-electric/90"
            >
              {ctaLabel}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              render={<Link href="/compatibility-checker" />}
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/20 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
            >
              Uyğunluğu yoxla
            </Button>
          </div>
        </motion.div>

        {product && (
          <Link href={`/shop/${product.slug}`} className="mx-auto w-full max-w-xs lg:max-w-sm">
            <ProductVisual imageId={product.imageId} wattage={product.wattage} className="aspect-square w-full" />
          </Link>
        )}
      </div>
    </section>
  );
}

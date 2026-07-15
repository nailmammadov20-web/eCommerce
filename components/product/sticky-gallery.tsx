"use client";

import { useState } from "react";
import { ProductVisual } from "@/components/shared/product-visual";

interface GalleryImage {
  id: string;
  alt: string;
}

interface StickyGalleryProps {
  images: GalleryImage[];
  productName: string;
  wattage: number;
}

export function StickyGallery({ images, productName, wattage }: StickyGalleryProps) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="lg:sticky lg:top-24">
        <ProductVisual imageAlt={productName} wattage={wattage} className="aspect-square w-full" />
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-24">
      <ProductVisual imageId={images[active].id} imageAlt={images[active].alt} wattage={wattage} className="aspect-square w-full" />
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition-colors ${
                i === active ? "border-electric" : "border-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api/images/${img.id}`} alt={img.alt} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

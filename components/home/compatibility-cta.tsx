"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Brand {
  id: string;
  slug: string;
  name: string;
}

export function CompatibilityCta({ brands }: { brands: Brand[] }) {
  const router = useRouter();
  const [brandSlug, setBrandSlug] = useState<string | null>(null);

  function handleSubmit() {
    router.push(brandSlug ? `/compatibility-checker?brand=${brandSlug}` : "/compatibility-checker");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-secondary/30 px-8 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background sm:mx-0">
            <Sparkles className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Telefon modelinizi seçin</h2>
          <p className="mt-1.5 text-muted-foreground">Sizə uyğun adapteri saniyələr içində tapaq.</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Select
            items={brands.map((b) => ({ value: b.slug, label: b.name }))}
            value={brandSlug ?? undefined}
            onValueChange={(value) => setBrandSlug(value)}
          >
            <SelectTrigger className="h-12 w-full rounded-xl sm:w-48">
              <SelectValue placeholder="Marka seçin" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.slug}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="lg" onClick={handleSubmit} className="h-12 rounded-xl">
            Düzgün adapteri tap
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

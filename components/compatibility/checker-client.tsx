"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Cable, Clock, ArrowRight, Smartphone, Layers } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";

interface Brand {
  id: string;
  slug: string;
  name: string;
  models: { id: string; name: string }[];
}

interface Rule {
  phoneModelId: string;
  maxWattage: number;
  cableType: string;
  connectorType: string;
  estimatedChargeMinutes: number;
  compatibilityScore: number;
  notes: string | null;
  recommendedProduct: { name: string; slug: string; price: number } | null;
}

function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes} dəq`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} saat ${m} dəq` : `${h} saat`;
}

function scoreColor(score: number) {
  if (score >= 80) return "text-emerald-600 dark:text-emerald-500";
  if (score >= 50) return "text-amber-600 dark:text-amber-500";
  return "text-destructive";
}

function StepBadge({ active, done, children }: { active: boolean; done: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
        done || active ? "bg-electric text-electric-foreground" : "bg-secondary text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function CompatibilityCheckerClient({
  brands,
  rules,
  initialBrandSlug,
}: {
  brands: Brand[];
  rules: Rule[];
  initialBrandSlug?: string;
}) {
  const [brandId, setBrandId] = useState<string | null>(
    () => brands.find((b) => b.slug === initialBrandSlug)?.id ?? null,
  );
  const [modelId, setModelId] = useState<string | null>(null);

  const selectedBrand = brands.find((b) => b.id === brandId) ?? null;
  const rule = rules.find((r) => r.phoneModelId === modelId) ?? null;

  return (
    <div>
      <div className="rounded-3xl border border-border bg-secondary/20 p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <StepBadge active done={!!brandId}>1</StepBadge>
              Marka
            </label>
            <Select
              items={brands.map((brand) => ({ value: brand.id, label: brand.name }))}
              value={brandId ?? undefined}
              onValueChange={(value) => {
                setBrandId(value as string);
                setModelId(null);
              }}
            >
              <SelectTrigger className="mt-2 h-12 w-full rounded-xl bg-background">
                <Smartphone className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                <SelectValue placeholder="Marka seçin" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <StepBadge active={!!selectedBrand} done={!!modelId}>2</StepBadge>
              Model
            </label>
            <Select
              items={(selectedBrand?.models ?? []).map((model) => ({ value: model.id, label: model.name }))}
              value={modelId ?? undefined}
              onValueChange={(value) => setModelId(value as string)}
              disabled={!selectedBrand}
            >
              <SelectTrigger className="mt-2 h-12 w-full rounded-xl bg-background">
                <Layers className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                <SelectValue placeholder="Model seçin" />
              </SelectTrigger>
              <SelectContent>
                {selectedBrand?.models.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {brands.length} marka · {brands.reduce((sum, b) => sum + b.models.length, 0)}+ model dəstəklənir
        </p>
      </div>

      {rule && (
        <div className="mt-10 rounded-3xl border border-border p-8 sm:p-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Uyğunluq nəticəsi</h3>
            <span className={cn("text-3xl font-semibold", scoreColor(rule.compatibilityScore))}>
              {rule.compatibilityScore}%
            </span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase">
                <Zap className="h-3.5 w-3.5 text-electric" /> Dəstəklənən güc
              </div>
              <p className="mt-1.5 text-lg font-medium">{rule.maxWattage}W</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase">
                <Cable className="h-3.5 w-3.5 text-electric" /> Kabel növü
              </div>
              <p className="mt-1.5 text-lg font-medium">{rule.cableType}</p>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase">
                <Clock className="h-3.5 w-3.5 text-electric" /> Təxmini şarj müddəti
              </div>
              <p className="mt-1.5 text-lg font-medium">{formatMinutes(rule.estimatedChargeMinutes)} (tam enerji)</p>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            {rule.recommendedProduct ? (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Tövsiyə olunan adapter</span>
                  <p className="text-lg font-semibold">{rule.recommendedProduct.name}</p>
                  <span className="text-muted-foreground">{formatPrice(rule.recommendedProduct.price)}</span>
                </div>
                <Button render={<Link href={`/shop/${rule.recommendedProduct.slug}`} />} className="rounded-full">
                  Məhsula bax
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-muted-foreground">
                  {rule.notes ?? "Hazırda kataloqumuzda bu model üçün tam uyğun məhsul yoxdur."}
                </p>
                <Button render={<Link href="/shop" />} variant="outline" className="mt-4 rounded-full">
                  Mağazaya bax
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

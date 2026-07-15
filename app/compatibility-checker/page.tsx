import type { Metadata } from "next";
import { db } from "@/lib/db";
import { CompatibilityCheckerClient } from "@/components/compatibility/checker-client";

export const metadata: Metadata = {
  title: "Uyğunluq Yoxlayıcısı — Telefonunuz üçün ideal adapteri tapın",
  description:
    "Telefon markanızı və modelinizi seçin, dəstəklənən gücü, kabel növünü, təxmini şarj müddətini və tövsiyə olunan adapteri öyrənin.",
};

export default async function CompatibilityCheckerPage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string }>;
}) {
  const { brand } = await searchParams;
  const [brands, rules] = await Promise.all([
    db.phoneBrand.findMany({
      orderBy: { order: "asc" },
      include: { models: { orderBy: { name: "asc" } } },
    }),
    db.compatibilityRule.findMany({
      include: { recommendedProduct: { select: { name: true, slug: true, price: true } } },
    }),
  ]);

  const formattedRules = rules.map((rule) => ({
    phoneModelId: rule.phoneModelId,
    maxWattage: rule.maxWattage,
    cableType: rule.cableType,
    connectorType: rule.connectorType,
    estimatedChargeMinutes: rule.estimatedChargeMinutes,
    compatibilityScore: rule.compatibilityScore,
    notes: rule.notes,
    recommendedProduct: rule.recommendedProduct
      ? {
          name: rule.recommendedProduct.name,
          slug: rule.recommendedProduct.slug,
          price: Number(rule.recommendedProduct.price),
        }
      : null,
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Uyğunluq Yoxlayıcısı</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Markanızı və modelinizi seçin — tövsiyə olunan adapteri, dəstəklənən gücü və təxmini şarj müddətini
          dərhal görün.
        </p>
      </div>

      <div className="mt-12">
        <CompatibilityCheckerClient
          brands={brands}
          rules={formattedRules}
          initialBrandSlug={brand}
        />
      </div>
    </div>
  );
}

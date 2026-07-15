import Link from "next/link";
import { Zap, PlugZap, Cable, Car, Radio, BatteryCharging, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "gan-adapterler": Zap,
  "usb-c-adapterler": PlugZap,
  "lightning-kabeller": Cable,
  kabeller: Cable,
  "car-chargers": Car,
  "wireless-chargers": Radio,
  "power-banks": BatteryCharging,
};

interface CategoryTilesProps {
  categories: { slug: string; name: string; productCount: number }[];
}

export function CategoryTiles({ categories }: CategoryTilesProps) {
  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Kateqoriyalar</h2>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = iconMap[category.slug] ?? Zap;
          return (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="group relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-black p-4 text-center transition-transform hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(70,110,255,0.3),transparent_60%)]" />
              <Icon className="relative h-7 w-7 text-electric" strokeWidth={1.5} />
              <span className="relative mt-2.5 text-sm font-medium text-white">{category.name}</span>
              <span className="relative mt-0.5 text-xs text-white/50">{category.productCount} məhsul</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { Search } from "lucide-react";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mağaza — Telefon Adapterləri və Kabellər",
  description:
    "Volt mağazasında sürətli şarj adapterləri, GaN adapterlər və USB-C kabelləri kəşf edin. Bakıda çatdırılma, 24 ay zəmanət.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;

  const [categories, products] = await Promise.all([
    db.category.findMany({ orderBy: { order: "asc" } }),
    db.product.findMany({
      where: {
        status: "ACTIVE",
        ...(category ? { category: { slug: category } } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { shortDescription: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: { images: { orderBy: { position: "asc" }, take: 1 } },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const reviewStats = await db.review.groupBy({
    by: ["productId"],
    where: { status: "APPROVED", productId: { in: products.map((p) => p.id) } },
    _avg: { rating: true },
    _count: { rating: true },
  });
  const reviewMap = new Map(reviewStats.map((r) => [r.productId, r]));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Mağaza</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Diqqətlə seçilmiş, hər biri sınaqdan keçirilmiş şarj həlləri.
        </p>
      </div>

      {q && (
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          &ldquo;{q}&rdquo; üçün {products.length} nəticə
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-2">
        <Link
          href="/shop"
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            !category ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40",
          )}
        >
          Hamısı
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.slug}`}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              category === cat.slug
                ? "border-foreground bg-foreground text-background"
                : "border-border hover:border-foreground/40",
            )}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {products.length > 0 ? (
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const stats = reviewMap.get(product.id);
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                price={Number(product.price)}
                compareAtPrice={product.compareAtPrice ? Number(product.compareAtPrice) : null}
                wattage={product.wattage}
                connectorType={product.connectorType}
                stock={product.stock}
                isDemo={product.isDemo}
                imageId={product.images[0]?.id ?? null}
                rating={stats?._avg.rating ?? null}
                reviewCount={stats?._count.rating ?? 0}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-16 rounded-3xl border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">
            {q ? "Axtarışınıza uyğun məhsul tapılmadı." : "Bu kateqoriyada hələ məhsul yoxdur. Tezliklə əlavə olunacaq."}
          </p>
        </div>
      )}
    </div>
  );
}

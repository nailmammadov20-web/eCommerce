import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { CompactHero } from "@/components/home/compact-hero";
import { CategoryTiles } from "@/components/home/category-tiles";
import { WhyVolt } from "@/components/home/why-volt";
import { CompatibilityCta } from "@/components/home/compatibility-cta";
import { ReviewsSection } from "@/components/home/reviews-section";
import { KnowledgeCards } from "@/components/home/knowledge-cards";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ProductCard, type ProductCardProps } from "@/components/product/product-card";
import { getSiteUrl } from "@/lib/utils";

interface HeroSettings {
  headline: string;
  subtitle: string;
  ctaLabel: string;
}

export default async function HomePage() {
  const [heroSetting, heroProduct, products, categoriesRaw, brands, approvedReviews, posts] = await Promise.all([
    db.adminSetting.findUnique({ where: { key: "homepage_hero" } }),
    db.product.findFirst({
      where: { slug: "volt-air-33w-gan-adapteri" },
      include: { images: { orderBy: { position: "asc" }, take: 1 } },
    }),
    db.product.findMany({
      where: { status: "ACTIVE" },
      include: { images: { orderBy: { position: "asc" }, take: 1 } },
      orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
      take: 8,
    }),
    db.category.findMany({ orderBy: { order: "asc" }, include: { _count: { select: { products: true } } } }),
    db.phoneBrand.findMany({ orderBy: { order: "asc" }, select: { id: true, slug: true, name: true } }),
    db.review.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      take: 3,
      include: { product: { select: { name: true } } },
    }),
    db.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { slug: true, title: true, excerpt: true },
    }),
  ]);

  const hero = (heroSetting?.value as unknown as HeroSettings) ?? {
    headline: "Telefonunuz üçün düzgün adapteri seçin.",
    subtitle: "Sürətli, təhlükəsiz və orijinal şarj həlləri — Bakıda çatdırılma ilə.",
    ctaLabel: "Məhsullara bax",
  };

  const reviewStats = await db.review.groupBy({
    by: ["productId"],
    where: { status: "APPROVED", productId: { in: products.map((p) => p.id) } },
    _avg: { rating: true },
    _count: { rating: true },
  });
  const reviewMap = new Map(reviewStats.map((r) => [r.productId, r]));

  function toCardProps(product: (typeof products)[number]): ProductCardProps {
    const stats = reviewMap.get(product.id);
    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: Number(product.price),
      compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
      wattage: product.wattage,
      connectorType: product.connectorType,
      stock: product.stock,
      isDemo: product.isDemo,
      imageId: product.images[0]?.id ?? null,
      rating: stats?._avg.rating ?? null,
      reviewCount: stats?._count.rating ?? 0,
    };
  }

  const categories = categoriesRaw.map((c) => ({ slug: c.slug, name: c.name, productCount: c._count.products }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Volt",
            url: getSiteUrl(),
            description: "Azərbaycanda premium telefon adapterləri və şarj aksesuarları brendi.",
          }),
        }}
      />

      <CompactHero
        headline={hero.headline}
        subtitle={hero.subtitle}
        ctaLabel={hero.ctaLabel}
        product={
          heroProduct
            ? { slug: heroProduct.slug, wattage: heroProduct.wattage, imageId: heroProduct.images[0]?.id ?? null }
            : null
        }
      />

      {products.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Məhsullar</h2>
            <Link
              href="/shop"
              className="hidden shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              Hamısına bax <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} {...toCardProps(product)} />
            ))}
          </div>
        </section>
      )}

      <CategoryTiles categories={categories} />

      <WhyVolt />

      <CompatibilityCta brands={brands} />

      {approvedReviews.length >= 3 && (
        <ReviewsSection
          reviews={approvedReviews.map((r) => ({
            id: r.id,
            authorName: r.authorName,
            rating: r.rating,
            title: r.title,
            body: r.body,
            createdAt: r.createdAt,
            productName: r.product.name,
          }))}
        />
      )}

      <KnowledgeCards posts={posts} />
      <NewsletterSection />
    </>
  );
}

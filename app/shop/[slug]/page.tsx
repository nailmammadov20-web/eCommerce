import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { StickyGallery } from "@/components/product/sticky-gallery";
import { AddToCartPanel } from "@/components/product/add-to-cart-panel";
import { FeatureStrip } from "@/components/product/feature-strip";
import { ReviewsSection } from "@/components/product/reviews-section";
import { RelatedGuides } from "@/components/product/related-guides";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { scoreCompatibility } from "@/lib/compatibility-score";

export async function generateStaticParams() {
  const products = await db.product.findMany({ where: { status: "ACTIVE" }, select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

async function getProduct(slug: string) {
  return db.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { position: "asc" } },
      variants: true,
      category: true,
      reviews: { where: { status: "APPROVED" }, orderBy: { createdAt: "desc" } },
    },
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });
  if (!product) return {};

  return {
    title: product.metaTitle ?? `${product.name} — Bakıda Sifariş`,
    description: product.metaDescription ?? product.shortDescription,
    openGraph: { title: product.name, description: product.shortDescription },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const [compatibleModels, productFaqs, relatedPosts] = await Promise.all([
    db.compatibilityRule.findMany({
      where: { recommendedProductId: product.id },
      include: { phoneModel: { include: { brand: true } } },
      orderBy: { compatibilityScore: "desc" },
      take: 12,
    }),
    db.fAQ.findMany({ where: { published: true, category: "PRODUCT" }, orderBy: { order: "asc" } }),
    db.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 2,
      select: { slug: true, title: true, excerpt: true },
    }),
  ]);

  const brandGroups = compatibleModels.reduce<Record<string, string[]>>((acc, rule) => {
    const brandName = rule.phoneModel.brand.name;
    acc[brandName] = acc[brandName] ?? [];
    acc[brandName].push(rule.phoneModel.name);
    return acc;
  }, {});

  const chargeEstimate = scoreCompatibility({
    phoneMaxWattage: product.wattage,
    phoneConnector: product.connectorType,
    productWattage: product.wattage,
    productConnector: product.connectorType,
    batteryCapacityMah: 4500,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.shortDescription,
            sku: product.sku,
            offers: {
              "@type": "Offer",
              price: product.price.toString(),
              priceCurrency: "AZN",
              availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
          }),
        }}
      />

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.2fr_0.9fr] lg:gap-8">
        {/* Description column — text-first, reads left on desktop, third on mobile */}
        <div className="order-3 lg:order-1">
          <p className="text-sm font-medium tracking-wide text-electric uppercase">{product.category.name}</p>
          <h1 className="mt-2 text-3xl leading-tight font-semibold tracking-tight">{product.name}</h1>
          <p className="mt-4 text-muted-foreground">{product.shortDescription}</p>
          <div className="mt-6 whitespace-pre-line text-sm text-muted-foreground">{product.story}</div>

          <Accordion className="mt-8">
            <AccordionItem value="specs">
              <AccordionTrigger className="text-sm font-medium">Texniki xüsusiyyətlər</AccordionTrigger>
              <AccordionContent>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Çıxış gücü</dt>
                    <dd className="font-medium">{product.wattage}W</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Qoşulma növü</dt>
                    <dd className="font-medium">{product.connectorType}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Kabel</dt>
                    <dd className="text-right font-medium">{product.cableType}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">SKU</dt>
                    <dd className="font-medium">{product.sku}</dd>
                  </div>
                </dl>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="charging-speed">
              <AccordionTrigger className="text-sm font-medium">Şarj sürəti</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {product.name}, orta ölçülü (4500mAh) telefon batareyasını təxminən{" "}
                <strong className="text-foreground">{chargeEstimate.to80Minutes} dəqiqəyə</strong> 0-80%
                səviyyəsinə, tam dolana qədər isə təxminən{" "}
                <strong className="text-foreground">{chargeEstimate.fullMinutes} dəqiqəyə</strong> qədər doldurur.
                Faktiki müddət telefonunuzun dəstəklədiyi maksimum gücdən asılı olaraq dəyişə bilər.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="box">
              <AccordionTrigger className="text-sm font-medium">Qutuda nə var</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {product.whatsInBox.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="warranty">
              <AccordionTrigger className="text-sm font-medium">Zəmanət</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Bu məhsul {product.warrantyMonths} ay rəsmi zəmanətlə satılır. Ətraflı məlumat üçün{" "}
                <a href="/warranty" className="underline underline-offset-2">
                  zəmanət səhifəmizə
                </a>{" "}
                baxın.
              </AccordionContent>
            </AccordionItem>

            {Object.keys(brandGroups).length > 0 && (
              <AccordionItem value="compatibility">
                <AccordionTrigger className="text-sm font-medium">Telefon uyğunluğu</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">Bu adapter aşağıdakı modellər üçün tövsiyə olunur:</p>
                  <div className="mt-3 space-y-3">
                    {Object.entries(brandGroups).map(([brand, models]) => (
                      <div key={brand}>
                        <span className="text-sm font-medium">{brand}</span>
                        <div className="mt-1.5 flex flex-wrap gap-2">
                          {models.map((model) => (
                            <span key={model} className="rounded-full bg-secondary px-3 py-1 text-xs">
                              {model}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {productFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left text-sm font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Gallery — always shown first on mobile, centered on desktop */}
        <div className="order-1 lg:order-2">
          <StickyGallery
            images={product.images.map((img) => ({ id: img.id, alt: img.alt }))}
            productName={product.name}
            wattage={product.wattage}
          />
        </div>

        {/* Buy panel — price, variant, favorite, add to cart */}
        <div className="order-2 lg:order-3">
          <AddToCartPanel
            productId={product.id}
            slug={product.slug}
            name={product.name}
            price={Number(product.price)}
            compareAtPrice={product.compareAtPrice ? Number(product.compareAtPrice) : null}
            stock={product.stock}
            isDemo={product.isDemo}
            imageId={product.images[0]?.id ?? null}
            wattage={product.wattage}
            variants={product.variants.map((v) => ({
              id: v.id,
              name: v.name,
              priceOverride: v.priceOverride ? Number(v.priceOverride) : null,
              stock: v.stock,
            }))}
          />
        </div>
      </div>

      <p className="mt-16 text-center text-xs tracking-wide text-muted-foreground uppercase">
        Volt tərəfindən dizayn edilib · Bakıda anbarlanır və yoxlanılır
      </p>

      <div className="mt-6">
        <FeatureStrip wattage={product.wattage} connectorType={product.connectorType} warrantyMonths={product.warrantyMonths} />
      </div>

      <div className="mt-20 border-t border-border pt-16">
        <ReviewsSection productSlug={product.slug} reviews={product.reviews} />
      </div>

      <div className="mt-16 border-t border-border pt-16">
        <RelatedGuides posts={relatedPosts} />
      </div>
    </div>
  );
}

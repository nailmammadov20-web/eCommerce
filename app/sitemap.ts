import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes = [
    "",
    "/shop",
    "/compatibility-checker",
    "/charging-guide",
    "/blog",
    "/faq",
    "/warranty",
    "/shipping",
    "/returns",
    "/contact",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const [products, posts] = await Promise.all([
    db.product.findMany({ where: { status: "ACTIVE" }, select: { slug: true, updatedAt: true } }),
    db.blogPost.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
  ]);

  const productRoutes = products.map((product) => ({
    url: `${siteUrl}/shop/${product.slug}`,
    lastModified: product.updatedAt,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}

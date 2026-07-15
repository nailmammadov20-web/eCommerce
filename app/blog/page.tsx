import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bloq — Şarj Bilikləri və Məsləhətlər",
  description: "GaN texnologiyası, sürətli şarj, batareya sağlamlığı və adapter seçimi haqqında məqalələr.",
};

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Bloq</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Şarj texnologiyaları, batareya sağlamlığı və düzgün seçim haqqında bilikli məqalələr.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-3xl border border-border p-8 transition-colors hover:border-foreground/30"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
              <BookOpen className="h-5 w-5 text-electric" strokeWidth={1.5} />
            </div>
            <h2 className="mt-5 text-lg font-semibold">{post.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
              <span>{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
              <span className="inline-flex items-center gap-1 font-medium text-foreground">
                Oxu <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

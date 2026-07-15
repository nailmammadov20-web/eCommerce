import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await db.blogPost.findMany({ where: { status: "PUBLISHED" }, select: { slug: true } });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug } });
  if (!post) return {};

  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await db.blogPost.findUnique({ where: { slug, status: "PUBLISHED" } });

  if (!post) notFound();

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt?.toISOString(),
            dateModified: post.updatedAt.toISOString(),
          }),
        }}
      />

      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Bloqa qayıt
      </Link>

      <h1 className="mt-6 text-4xl font-semibold tracking-tight">{post.title}</h1>
      <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
        {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
        {post.tags.length > 0 && (
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 space-y-5 text-lg leading-relaxed text-muted-foreground">
        {paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

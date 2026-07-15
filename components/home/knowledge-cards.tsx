import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";

interface KnowledgeCardsProps {
  posts: { slug: string; title: string; excerpt: string }[];
}

export function KnowledgeCards({ posts }: KnowledgeCardsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="flex items-end justify-between gap-4">
        <div>
          <span className="text-sm font-medium tracking-wide text-electric uppercase">Bilik Bazası</span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Şarj biliyi</h2>
        </div>
        <Link
          href="/blog"
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:flex"
        >
          Bütün yazılar <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-border p-8 transition-colors hover:border-foreground/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
                <BookOpen className="h-5 w-5 text-electric" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{post.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                Oxu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

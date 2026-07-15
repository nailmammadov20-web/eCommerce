import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

interface RelatedGuidesProps {
  posts: { slug: string; title: string; excerpt: string }[];
}

export function RelatedGuides({ posts }: RelatedGuidesProps) {
  if (posts.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold">Əlaqəli bələdçilər</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-start gap-3 rounded-2xl border border-border p-5 transition-colors hover:border-foreground/30"
          >
            <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-electric" strokeWidth={1.5} />
            <div>
              <h3 className="font-medium">{post.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{post.excerpt}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium">
                Oxu <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

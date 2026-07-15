import { Star } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ReviewCard {
  id: string;
  authorName: string;
  rating: number;
  title: string;
  body: string;
  createdAt: Date;
  productName: string;
}

export function ReviewsSection({ reviews }: { reviews: ReviewCard[] }) {
  return (
    <section className="border-t border-border/60 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Müştəri rəyləri</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
                  {review.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">{review.authorName}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</p>
                </div>
              </div>
              <div className="mt-3 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 w-3.5 ${star <= review.rating ? "fill-electric text-electric" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <h3 className="mt-2 font-medium">{review.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{review.body}</p>
              <p className="mt-3 text-xs text-muted-foreground/70">{review.productName}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

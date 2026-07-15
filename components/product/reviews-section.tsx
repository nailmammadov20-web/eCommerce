import { MessageSquare, Star } from "lucide-react";
import { ReviewForm } from "@/components/product/review-form";
import { formatDate, cn } from "@/lib/utils";

interface ReviewItem {
  id: string;
  authorName: string;
  rating: number;
  title: string;
  body: string;
  createdAt: Date;
}

export function ReviewsSection({ productSlug, reviews }: { productSlug: string; reviews: ReviewItem[] }) {
  const average = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <h2 className="text-2xl font-semibold">Rəylər</h2>
        {reviews.length > 0 ? (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn("h-4 w-4", star <= Math.round(average) ? "fill-electric text-electric" : "text-muted-foreground")}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {average.toFixed(1)} ({reviews.length} rəy)
            </span>
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-start rounded-2xl border border-dashed border-border p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
              <MessageSquare className="h-5 w-5 text-electric" strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Bu məhsul üçün hələ rəy yoxdur. Onu sınayan ilk müştəri siz olsanız, təcrübənizi bölüşün — digər
              alıcılara kömək edər.
            </p>
          </div>
        )}

        <div className="mt-8 space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-border pb-6 last:border-0">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn("h-3.5 w-3.5", star <= review.rating ? "fill-electric text-electric" : "text-muted-foreground")}
                  />
                ))}
              </div>
              <h4 className="mt-2 font-medium">{review.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{review.body}</p>
              <p className="mt-2 text-xs text-muted-foreground/70">
                {review.authorName} · {formatDate(review.createdAt)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ReviewForm productSlug={productSlug} />
    </div>
  );
}

import { db } from "@/lib/db";
import { ReviewActions } from "@/components/admin/review-actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteReview } from "@/lib/actions/admin/reviews.actions";
import { formatDate } from "@/lib/utils";

const statusLabels: Record<string, string> = { PENDING: "Gözləmədə", APPROVED: "Təsdiqləndi", REJECTED: "Rədd edildi" };

export default async function AdminReviewsPage() {
  const reviews = await db.review.findMany({
    include: { product: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Rəylər</h1>

      <div className="mt-8 space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="rounded-2xl border border-border p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  {review.product.name} · {formatDate(review.createdAt)}
                </p>
                <p className="mt-1 font-medium">
                  {review.title} · {review.rating}/5
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{review.body}</p>
                <p className="mt-1 text-xs text-muted-foreground">— {review.authorName}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">{statusLabels[review.status]}</span>
                <ReviewActions reviewId={review.id} />
                <DeleteButton action={deleteReview.bind(null, review.id)} />
              </div>
            </div>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-sm text-muted-foreground">Hələ rəy yoxdur.</p>}
      </div>
    </div>
  );
}

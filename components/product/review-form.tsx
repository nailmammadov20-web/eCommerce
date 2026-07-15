"use client";

import { useActionState, useState } from "react";
import { Star } from "lucide-react";
import { submitReview } from "@/lib/actions/review.actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState = { success: false, message: "" };

export function ReviewForm({ productSlug }: { productSlug: string }) {
  const [rating, setRating] = useState(5);
  const [state, formAction, isPending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => submitReview(productSlug, formData),
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-border p-6">
      <h3 className="font-semibold">Rəy yazın</h3>

      <div>
        <span className="text-sm font-medium">Qiymətləndirmə</span>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} type="button" onClick={() => setRating(star)} aria-label={`${star} ulduz`}>
              <Star
                className={cn("h-6 w-6", star <= rating ? "fill-electric text-electric" : "text-muted-foreground")}
              />
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
      </div>

      <Input name="authorName" placeholder="Adınız" required />
      <Input name="title" placeholder="Rəyin başlığı" required />
      <Textarea name="body" placeholder="Təcrübənizi bölüşün..." required rows={4} />

      <Button type="submit" disabled={isPending} className="rounded-full">
        {isPending ? "Göndərilir..." : "Rəyi göndər"}
      </Button>

      {state.message && (
        <p className={cn("text-sm", state.success ? "text-emerald-600 dark:text-emerald-500" : "text-destructive")}>
          {state.message}
        </p>
      )}
    </form>
  );
}

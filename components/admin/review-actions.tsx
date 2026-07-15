"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateReviewStatus } from "@/lib/actions/admin/reviews.actions";

export function ReviewActions({ reviewId }: { reviewId: string }) {
  const [isPending, startTransition] = useTransition();

  function handle(status: "APPROVED" | "REJECTED") {
    startTransition(async () => {
      await updateReviewStatus(reviewId, status);
      toast.success(status === "APPROVED" ? "Rəy təsdiqləndi." : "Rəy rədd edildi.");
    });
  }

  return (
    <div className="flex gap-1.5">
      <Button size="sm" variant="outline" disabled={isPending} onClick={() => handle("APPROVED")}>
        <Check className="mr-1 h-3.5 w-3.5" /> Təsdiqlə
      </Button>
      <Button size="sm" variant="ghost" disabled={isPending} onClick={() => handle("REJECTED")}>
        <X className="mr-1 h-3.5 w-3.5" /> Rədd et
      </Button>
    </div>
  );
}

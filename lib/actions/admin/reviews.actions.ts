"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";

export async function updateReviewStatus(reviewId: string, status: "APPROVED" | "REJECTED") {
  await requireAdmin();
  const review = await db.review.update({ where: { id: reviewId }, data: { status }, include: { product: true } });
  revalidatePath("/admin/reviews");
  revalidatePath(`/shop/${review.product.slug}`);
}

export async function deleteReview(reviewId: string) {
  await requireAdmin();
  const review = await db.review.delete({ where: { id: reviewId }, include: { product: true } });
  revalidatePath("/admin/reviews");
  revalidatePath(`/shop/${review.product.slug}`);
}

"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { reviewSchema } from "@/lib/validations/review";

export async function submitReview(productSlug: string, formData: FormData) {
  const product = await db.product.findUnique({ where: { slug: productSlug }, select: { id: true } });
  if (!product) {
    return { success: false, message: "Məhsul tapılmadı." };
  }

  const parsed = reviewSchema.safeParse({
    productId: product.id,
    authorName: formData.get("authorName"),
    rating: formData.get("rating"),
    title: formData.get("title"),
    body: formData.get("body"),
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Məlumatları yoxlayın." };
  }

  await db.review.create({
    data: {
      productId: parsed.data.productId,
      authorName: parsed.data.authorName,
      rating: parsed.data.rating,
      title: parsed.data.title,
      body: parsed.data.body,
      status: "PENDING",
    },
  });

  revalidatePath(`/shop/${productSlug}`);
  return { success: true, message: "Rəyiniz üçün təşəkkürlər! Yoxlanıldıqdan sonra dərc olunacaq." };
}

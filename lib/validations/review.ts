import { z } from "zod";

export const reviewSchema = z.object({
  productId: z.string().min(1),
  authorName: z.string().min(2, "Adınızı daxil edin"),
  rating: z.coerce.number().int().min(1).max(5),
  title: z.string().min(3, "Başlıq daxil edin"),
  body: z.string().min(10, "Rəyinizi daxil edin"),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

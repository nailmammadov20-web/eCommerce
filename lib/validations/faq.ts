import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().min(3, "Sualı daxil edin"),
  answer: z.string().min(3, "Cavabı daxil edin"),
  category: z.enum(["GENERAL", "SHIPPING", "WARRANTY", "PRODUCT"]),
  order: z.coerce.number().int().default(0),
  published: z.boolean().default(true),
});

export type FaqInput = z.infer<typeof faqSchema>;

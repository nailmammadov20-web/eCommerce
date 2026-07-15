import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Ad daxil edin"),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug yalnız kiçik hərf, rəqəm və tire ola bilər"),
  description: z.string().optional(),
  order: z.coerce.number().int().default(0),
});

export type CategoryInput = z.infer<typeof categorySchema>;

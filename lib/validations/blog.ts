import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(3, "Başlıq daxil edin"),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug yalnız kiçik hərf, rəqəm və tire ola bilər"),
  excerpt: z.string().min(10, "Qısa təsviri daxil edin"),
  content: z.string().min(20, "Məzmunu daxil edin"),
  tags: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

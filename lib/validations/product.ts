import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Məhsulun adını daxil edin"),
  slug: z.string().min(2, "URL slug daxil edin").regex(/^[a-z0-9-]+$/, "Slug yalnız kiçik hərf, rəqəm və tire ola bilər"),
  shortDescription: z.string().min(10, "Qısa təsviri daxil edin"),
  story: z.string().min(20, "Məhsul hekayəsini daxil edin"),
  price: z.coerce.number().positive("Qiymət müsbət olmalıdır"),
  sku: z.string().min(2, "SKU daxil edin"),
  stock: z.coerce.number().int().min(0),
  wattage: z.coerce.number().int().positive("Vat gücünü daxil edin"),
  cableType: z.string().min(2),
  connectorType: z.string().min(2),
  whatsInBox: z.array(z.string()).min(1, "Ən azı bir element daxil edin"),
  warrantyMonths: z.coerce.number().int().positive(),
  status: z.enum(["ACTIVE", "COMING_SOON", "DRAFT"]),
  featured: z.boolean().default(false),
  categoryId: z.string().min(1, "Kateqoriya seçin"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;

export const productVariantSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  sku: z.string().min(1),
  priceOverride: z.coerce.number().positive().optional(),
  stock: z.coerce.number().int().min(0),
  attributes: z.record(z.string(), z.string()).default({}),
});

export type ProductVariantInput = z.infer<typeof productVariantSchema>;

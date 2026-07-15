import { z } from "zod";

export const checkoutSchema = z.object({
  customerName: z.string().min(2, "Adınızı daxil edin"),
  customerPhone: z.string().min(9, "Düzgün telefon nömrəsi daxil edin"),
  customerEmail: z.string().email("Düzgün e-poçt ünvanı daxil edin").optional().or(z.literal("")),
  city: z.string().min(2, "Şəhəri daxil edin"),
  addressLine: z.string().min(5, "Ünvanı daxil edin"),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        productId: z.string(),
        variantId: z.string().optional(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1, "Səbət boşdur"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

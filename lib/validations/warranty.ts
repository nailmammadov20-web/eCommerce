import { z } from "zod";

export const warrantyClaimSchema = z.object({
  name: z.string().min(2, "Adınızı daxil edin"),
  email: z.string().email("Düzgün e-poçt ünvanı daxil edin"),
  phone: z.string().min(9, "Düzgün telefon nömrəsi daxil edin"),
  productId: z.string().optional(),
  orderId: z.string().optional(),
  issueDescription: z.string().min(10, "Problemi ətraflı təsvir edin"),
});

export type WarrantyClaimInput = z.infer<typeof warrantyClaimSchema>;

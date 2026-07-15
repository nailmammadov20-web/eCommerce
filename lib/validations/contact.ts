import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Adınızı daxil edin"),
  email: z.string().email("Düzgün e-poçt ünvanı daxil edin"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Mövzunu daxil edin"),
  message: z.string().min(10, "Mesajınızı daxil edin"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Düzgün e-poçt ünvanı daxil edin"),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

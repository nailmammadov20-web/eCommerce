import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Düzgün e-poçt ünvanı daxil edin"),
  password: z.string().min(6, "Şifrə ən azı 6 simvol olmalıdır"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Adınızı daxil edin"),
  email: z.string().email("Düzgün e-poçt ünvanı daxil edin"),
  password: z.string().min(6, "Şifrə ən azı 6 simvol olmalıdır"),
  phone: z.string().min(9, "Düzgün telefon nömrəsi daxil edin").optional().or(z.literal("")),
});

export type RegisterInput = z.infer<typeof registerSchema>;

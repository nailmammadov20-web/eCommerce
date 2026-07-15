"use server";

import { db } from "@/lib/db";
import { newsletterSchema } from "@/lib/validations/contact";

export async function subscribeNewsletter(formData: FormData) {
  const parsed = newsletterSchema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return { success: false, message: "Düzgün e-poçt ünvanı daxil edin." };
  }

  await db.newsletterSubscriber.upsert({
    where: { email: parsed.data.email },
    update: { active: true },
    create: { email: parsed.data.email },
  });

  return { success: true, message: "Uğurla abunə oldunuz!" };
}

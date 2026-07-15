"use server";

import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validations/contact";

export async function submitContactMessage(formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Məlumatları yoxlayın." };
  }

  await db.contactMessage.create({ data: parsed.data });

  return { success: true, message: "Mesajınız göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq." };
}

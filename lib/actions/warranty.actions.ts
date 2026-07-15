"use server";

import { db } from "@/lib/db";
import { warrantyClaimSchema } from "@/lib/validations/warranty";
import { auth } from "@/lib/auth";

export async function submitWarrantyClaim(formData: FormData) {
  const session = await auth();

  const parsed = warrantyClaimSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    orderId: formData.get("orderId") || undefined,
    issueDescription: formData.get("issueDescription"),
  });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Məlumatları yoxlayın." };
  }

  await db.warrantyClaim.create({
    data: {
      ...parsed.data,
      userId: session?.user?.id,
    },
  });

  return { success: true, message: "Zəmanət müraciətiniz qəbul edildi. 24-48 saat ərzində sizinlə əlaqə saxlayacağıq." };
}

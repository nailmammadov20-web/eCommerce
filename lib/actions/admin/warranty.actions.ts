"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";

const validStatuses = ["PENDING", "IN_REVIEW", "APPROVED", "REJECTED", "RESOLVED"] as const;

export async function updateWarrantyClaim(claimId: string, formData: FormData) {
  await requireAdmin();
  const status = formData.get("status");
  const adminNotes = formData.get("adminNotes");

  if (typeof status !== "string" || !validStatuses.includes(status as (typeof validStatuses)[number])) {
    throw new Error("Yanlış status.");
  }

  await db.warrantyClaim.update({
    where: { id: claimId },
    data: { status: status as (typeof validStatuses)[number], adminNotes: (adminNotes as string) || null },
  });
  revalidatePath("/admin/warranty-claims");
  revalidatePath("/account/warranty");
}

"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";

export async function updateMessageStatus(messageId: string, status: "NEW" | "READ" | "REPLIED") {
  await requireAdmin();
  await db.contactMessage.update({ where: { id: messageId }, data: { status } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(messageId: string) {
  await requireAdmin();
  await db.contactMessage.delete({ where: { id: messageId } });
  revalidatePath("/admin/messages");
}

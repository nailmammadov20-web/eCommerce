"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";

const validStatuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"] as const;

export async function updateOrderStatus(orderId: string, status: (typeof validStatuses)[number]) {
  await requireAdmin();
  if (!validStatuses.includes(status)) throw new Error("Yanlış status.");

  await db.order.update({ where: { id: orderId }, data: { status } });
  revalidatePath("/admin/orders");
  revalidatePath("/account/orders");
}

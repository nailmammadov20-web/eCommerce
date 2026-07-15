"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";

export async function updateProductStock(productId: string, stock: number) {
  await requireAdmin();
  if (stock < 0) throw new Error("Stok mənfi ola bilməz.");
  await db.product.update({ where: { id: productId }, data: { stock } });
  revalidatePath("/admin/inventory");
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function updateVariantStock(variantId: string, stock: number) {
  await requireAdmin();
  if (stock < 0) throw new Error("Stok mənfi ola bilməz.");
  await db.productVariant.update({ where: { id: variantId }, data: { stock } });
  revalidatePath("/admin/inventory");
  revalidatePath("/shop");
}

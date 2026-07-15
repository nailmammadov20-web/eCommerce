"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";
import { productSchema } from "@/lib/validations/product";

function parseProductForm(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    shortDescription: formData.get("shortDescription"),
    story: formData.get("story"),
    price: formData.get("price"),
    sku: formData.get("sku"),
    stock: formData.get("stock"),
    wattage: formData.get("wattage"),
    cableType: formData.get("cableType"),
    connectorType: formData.get("connectorType"),
    whatsInBox: String(formData.get("whatsInBox") ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    warrantyMonths: formData.get("warrantyMonths"),
    status: formData.get("status"),
    featured: formData.get("featured") === "on",
    categoryId: formData.get("categoryId"),
    metaTitle: formData.get("metaTitle") || undefined,
    metaDescription: formData.get("metaDescription") || undefined,
  });
}

export async function createProduct(_prevState: string | undefined, formData: FormData) {
  await requireAdmin();
  const parsed = parseProductForm(formData);
  if (!parsed.success) return parsed.error.issues[0]?.message ?? "Məlumatları yoxlayın.";

  const product = await db.product.create({ data: parsed.data });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  redirect(`/admin/products/${product.id}`);
}

export async function updateProduct(productId: string, _prevState: string | undefined, formData: FormData) {
  await requireAdmin();
  const parsed = parseProductForm(formData);
  if (!parsed.success) return parsed.error.issues[0]?.message ?? "Məlumatları yoxlayın.";

  await db.product.update({ where: { id: productId }, data: parsed.data });
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/shop");
  return "Yadda saxlanıldı.";
}

export async function deleteProduct(productId: string) {
  await requireAdmin();
  try {
    await db.product.delete({ where: { id: productId } });
  } catch {
    throw new Error(
      "Bu məhsul sifarişlərdə istifadə olunub və silinə bilməz. Bunun əvəzinə statusunu 'Qaralama' edin.",
    );
  }
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function addProductImage(productId: string, formData: FormData) {
  await requireAdmin();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) throw new Error("Fayl seçilməyib.");

  const existingCount = await db.productImage.count({ where: { productId } });
  const buffer = Buffer.from(await file.arrayBuffer());

  await db.productImage.create({
    data: {
      productId,
      data: buffer,
      mimeType: file.type || "image/jpeg",
      alt: (formData.get("alt") as string) || "",
      position: existingCount,
      isPrimary: existingCount === 0,
    },
  });

  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/shop");
}

export async function deleteProductImage(productId: string, imageId: string) {
  await requireAdmin();
  await db.productImage.delete({ where: { id: imageId } });
  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/shop");
}

export async function setPrimaryImage(productId: string, imageId: string) {
  await requireAdmin();
  await db.$transaction([
    db.productImage.updateMany({ where: { productId }, data: { isPrimary: false } }),
    db.productImage.update({ where: { id: imageId }, data: { isPrimary: true } }),
  ]);
  revalidatePath(`/admin/products/${productId}`);
  revalidatePath("/shop");
}

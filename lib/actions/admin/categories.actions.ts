"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";
import { categorySchema } from "@/lib/validations/category";

function parseForm(formData: FormData) {
  return categorySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description") || undefined,
    order: formData.get("order") || 0,
  });
}

export async function createCategory(_prevState: string | undefined, formData: FormData) {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) return parsed.error.issues[0]?.message ?? "Məlumatları yoxlayın.";

  await db.category.create({ data: parsed.data });
  revalidatePath("/admin/categories");
  revalidatePath("/shop");
  return "Kateqoriya yaradıldı.";
}

export async function updateCategory(categoryId: string, _prevState: string | undefined, formData: FormData) {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) return parsed.error.issues[0]?.message ?? "Məlumatları yoxlayın.";

  await db.category.update({ where: { id: categoryId }, data: parsed.data });
  revalidatePath("/admin/categories");
  revalidatePath("/shop");
  return "Yadda saxlanıldı.";
}

export async function deleteCategory(categoryId: string) {
  await requireAdmin();
  try {
    await db.category.delete({ where: { id: categoryId } });
  } catch {
    throw new Error("Bu kateqoriyada məhsullar var, əvvəlcə onları başqa kateqoriyaya köçürün.");
  }
  revalidatePath("/admin/categories");
  revalidatePath("/shop");
}

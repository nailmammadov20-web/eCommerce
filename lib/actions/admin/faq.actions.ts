"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";
import { faqSchema } from "@/lib/validations/faq";

function parseForm(formData: FormData) {
  return faqSchema.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
    category: formData.get("category"),
    order: formData.get("order") || 0,
    published: formData.get("published") === "on",
  });
}

export async function createFaq(_prevState: string | undefined, formData: FormData) {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) return parsed.error.issues[0]?.message ?? "Məlumatları yoxlayın.";

  await db.fAQ.create({ data: parsed.data });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
  return "Sual yaradıldı.";
}

export async function updateFaq(faqId: string, _prevState: string | undefined, formData: FormData) {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) return parsed.error.issues[0]?.message ?? "Məlumatları yoxlayın.";

  await db.fAQ.update({ where: { id: faqId }, data: parsed.data });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
  return "Yadda saxlanıldı.";
}

export async function deleteFaq(faqId: string) {
  await requireAdmin();
  await db.fAQ.delete({ where: { id: faqId } });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}

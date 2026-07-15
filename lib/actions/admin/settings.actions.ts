"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";

export async function updateHeroSettings(_prevState: string | undefined, formData: FormData) {
  await requireAdmin();
  const headline = String(formData.get("headline") ?? "");
  const subtitle = String(formData.get("subtitle") ?? "");
  const ctaLabel = String(formData.get("ctaLabel") ?? "");

  if (!headline || !subtitle || !ctaLabel) return "Bütün sahələri doldurun.";

  await db.adminSetting.upsert({
    where: { key: "homepage_hero" },
    update: { value: { headline, subtitle, ctaLabel } },
    create: { key: "homepage_hero", value: { headline, subtitle, ctaLabel }, description: "Ana səhifə hero mətni" },
  });
  revalidatePath("/admin/homepage");
  revalidatePath("/");
  return "Yadda saxlanıldı.";
}

export async function updateComingSoonItems(_prevState: string | undefined, formData: FormData) {
  await requireAdmin();
  const raw = String(formData.get("items") ?? "");

  const items = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, blurb, eta] = line.split("|").map((s) => s.trim());
      return { name: name ?? "", blurb: blurb ?? "", eta: eta ?? "" };
    })
    .filter((item) => item.name);

  await db.adminSetting.upsert({
    where: { key: "coming_soon_items" },
    update: { value: items },
    create: { key: "coming_soon_items", value: items, description: "Tezliklə bölməsi elementləri" },
  });
  revalidatePath("/admin/homepage");
  revalidatePath("/");
  return "Yadda saxlanıldı.";
}

export async function updateWhatsappNumber(_prevState: string | undefined, formData: FormData) {
  await requireAdmin();
  const number = String(formData.get("number") ?? "").replace(/\D/g, "");
  if (!number) return "Düzgün nömrə daxil edin.";

  await db.adminSetting.upsert({
    where: { key: "whatsapp_number" },
    update: { value: { number } },
    create: { key: "whatsapp_number", value: { number }, description: "WhatsApp sifariş nömrəsi" },
  });
  revalidatePath("/admin/homepage");
  revalidatePath("/contact");
  return "Yadda saxlanıldı.";
}

export async function updateSeoDefaults(_prevState: string | undefined, formData: FormData) {
  await requireAdmin();
  const defaultMetaTitle = String(formData.get("defaultMetaTitle") ?? "");
  const defaultMetaDescription = String(formData.get("defaultMetaDescription") ?? "");

  if (!defaultMetaTitle || !defaultMetaDescription) return "Bütün sahələri doldurun.";

  await db.adminSetting.upsert({
    where: { key: "seo_defaults" },
    update: { value: { defaultMetaTitle, defaultMetaDescription } },
    create: {
      key: "seo_defaults",
      value: { defaultMetaTitle, defaultMetaDescription },
      description: "Sayt üzrə default SEO dəyərləri",
    },
  });
  revalidatePath("/admin/seo");
  return "Yadda saxlanıldı.";
}

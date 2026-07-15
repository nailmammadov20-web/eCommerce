import { db } from "@/lib/db";
import { SeoSettingsForm } from "@/components/admin/seo-settings-form";

interface SeoDefaults {
  defaultMetaTitle: string;
  defaultMetaDescription: string;
}

export default async function AdminSeoPage() {
  const setting = await db.adminSetting.findUnique({ where: { key: "seo_defaults" } });
  const defaults = (setting?.value as unknown as SeoDefaults) ?? {
    defaultMetaTitle: "",
    defaultMetaDescription: "",
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-semibold tracking-tight">SEO ayarları</h1>
      <p className="mt-2 text-muted-foreground">
        Səhifə üzrə xüsusi meta məlumat olmadıqda istifadə olunan default dəyərlər.
      </p>

      <div className="mt-8 rounded-2xl border border-border p-6">
        <SeoSettingsForm defaultValues={defaults} />
      </div>
    </div>
  );
}

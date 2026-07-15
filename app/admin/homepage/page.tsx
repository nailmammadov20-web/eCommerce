import { db } from "@/lib/db";
import { HeroSettingsForm } from "@/components/admin/hero-settings-form";
import { ComingSoonForm } from "@/components/admin/coming-soon-form";
import { WhatsappSettingsForm } from "@/components/admin/whatsapp-settings-form";

interface HeroSettings {
  headline: string;
  subtitle: string;
  ctaLabel: string;
}

interface ComingSoonItem {
  name: string;
  blurb: string;
  eta: string;
}

export default async function AdminHomepagePage() {
  const [heroSetting, comingSoonSetting, whatsappSetting] = await Promise.all([
    db.adminSetting.findUnique({ where: { key: "homepage_hero" } }),
    db.adminSetting.findUnique({ where: { key: "coming_soon_items" } }),
    db.adminSetting.findUnique({ where: { key: "whatsapp_number" } }),
  ]);

  const hero = (heroSetting?.value as unknown as HeroSettings) ?? {
    headline: "",
    subtitle: "",
    ctaLabel: "",
  };
  const comingSoonItems = (comingSoonSetting?.value as unknown as ComingSoonItem[]) ?? [];
  const whatsappNumber = (whatsappSetting?.value as unknown as { number: string })?.number ?? "";

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Ana səhifə redaktoru</h1>
        <p className="mt-2 text-muted-foreground">Ana səhifədəki dinamik məzmunu buradan idarə edin.</p>
      </div>

      <section className="rounded-2xl border border-border p-6">
        <h2 className="font-semibold">Hero bölməsi</h2>
        <div className="mt-4">
          <HeroSettingsForm defaultValues={hero} />
        </div>
      </section>

      <section className="rounded-2xl border border-border p-6">
        <h2 className="font-semibold">&ldquo;Tezliklə&rdquo; bölməsi</h2>
        <div className="mt-4">
          <ComingSoonForm items={comingSoonItems} />
        </div>
      </section>

      <section className="rounded-2xl border border-border p-6">
        <h2 className="font-semibold">WhatsApp sifariş nömrəsi</h2>
        <div className="mt-4">
          <WhatsappSettingsForm defaultValue={whatsappNumber} />
        </div>
      </section>
    </div>
  );
}

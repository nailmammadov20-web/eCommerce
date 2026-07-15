import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ChargeCalculator } from "@/components/charging-guide/charge-calculator";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Şarj Bələdçisi — Sürətli Şarj Haqqında Hər Şey",
  description:
    "GaN texnologiyası, Power Delivery, düzgün vatt gücü seçimi və batareya sağlamlığı haqqında ətraflı bələdçi. Şarj müddəti kalkulyatoru ilə sınayın.",
};

const protocols = [
  {
    name: "USB Power Delivery (PD)",
    description:
      "Ən geniş yayılmış sürətli şarj standartıdır. Əksər USB-C telefonlar, planşetlər və noutbuklar tərəfindən dəstəklənir. Cihaz və adapter arasında gərginlik/cərəyan barədə danışıq aparır.",
  },
  {
    name: "PPS (Programmable Power Supply)",
    description:
      "PD-nin genişlənməsidir. Gərginliyi daha kiçik addımlarla tənzimləyərək istiliyi azaldır və Samsung kimi bəzi brendlərin öz sürətli şarj rejimləri üçün tələb olunur.",
  },
  {
    name: "Quick Charge (QC)",
    description:
      "Qualcomm tərəfindən inkişaf etdirilib, əsasən daha köhnə Android telefonlarda rast gəlinir. Müasir adapterlərin çoxu geriyə uyğunluq üçün QC-ni də dəstəkləyir.",
  },
];

const batteryTips = [
  "Telefonunuzu 20-80% aralığında saxlamağa çalışın.",
  "Yalnız sertifikatlı adapterlərdən istifadə edin.",
  "Birbaşa günəş işığında və ya isti mühitdə şarj etməkdən çəkinin.",
  "Qalın case ilə şarj edərkən qızma olarsa, case-i çıxarın.",
  "Uzun müddət istifadə etməyəcəksinizsə, telefonu ~50% enerji ilə saxlayın.",
];

export default function ChargingGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Şarj Bələdçisi</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Sürətli şarjın arxasındakı elmi, düzgün vatt gücü seçimini və batareyanızı necə qoruyacağınızı öyrənin.
        </p>
      </div>

      <div className="mt-16">
        <ChargeCalculator />
      </div>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold">Sürətli şarj protokolları</h2>
        <div className="mt-6 space-y-6">
          {protocols.map((protocol) => (
            <div key={protocol.name} className="rounded-2xl border border-border p-6">
              <h3 className="font-semibold">{protocol.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{protocol.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold">Telefonunuz üçün düzgün vatt gücünü necə seçmək olar?</h2>
        <p className="mt-4 text-muted-foreground">
          Telefonunuzun dəstəklədiyi maksimum gücdən yüksək vatt gücünə malik adapter almaq zərər vermir — müasir
          telefonlar özləri qəbul etdikləri gücü tənzimləyir. Amma real sürət artımı üçün adapterin ən azı
          telefonun maksimum gücünə bərabər olması vacibdir. Əgər bir neçə cihazı (məsələn, telefon və noutbuku)
          eyni adapterlə şarj etmək istəyirsinizsə, ümumi tələbatı qarşılayan daha yüksək güclü (65W+) model seçin.
        </p>
        <p className="mt-4 text-muted-foreground">
          Dəqiq tövsiyə üçün{" "}
          <Link href="/compatibility-checker" className="underline underline-offset-2">
            Uyğunluq Yoxlayıcısından
          </Link>{" "}
          istifadə edin.
        </p>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold">Batareya sağlamlığı üçün məsləhətlər</h2>
        <ul className="mt-6 space-y-3">
          {batteryTips.map((tip) => (
            <li key={tip} className="flex items-start gap-3 text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 rounded-3xl bg-secondary/30 p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold">Hazırsınız?</h2>
        <p className="mt-3 text-muted-foreground">Kolleksiyamıza baxın və ideal adapterinizi tapın.</p>
        <Button render={<Link href="/shop" />} size="lg" className="mt-6 rounded-full">
          Mağazaya bax
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </section>
    </div>
  );
}

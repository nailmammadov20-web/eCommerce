import type { Metadata } from "next";
import { Truck, MapPin, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Çatdırılma",
  description: "Volt çatdırılma zonaları, müddətləri və ödəniş üsulları haqqında ətraflı məlumat.",
};

const zones = [
  { area: "Bakı şəhəri daxilində", time: "1-2 iş günü", cost: "50 AZN-dən yuxarı sifarişlərdə pulsuz, aşağıda 5 AZN" },
  { area: "Bakıətrafı qəsəbələr", time: "2-3 iş günü", cost: "7 AZN" },
  { area: "Digər bölgələr (Azərbaycan üzrə)", time: "2-4 iş günü", cost: "10 AZN" },
];

const paymentMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp üzərindən sifariş",
    description: "Sifarişinizi tamamladıqdan sonra WhatsApp açılır və sifariş detallarını orada təsdiqləyirik.",
  },
];

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background">
          <Truck className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Çatdırılma</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Bütün sifarişlər diqqətlə qablaşdırılır və etibarlı kuryer xidməti ilə çatdırılır.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <MapPin className="h-5 w-5 text-electric" /> Çatdırılma zonaları
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left">
              <tr>
                <th className="px-5 py-3 font-medium">Zona</th>
                <th className="px-5 py-3 font-medium">Müddət</th>
                <th className="px-5 py-3 font-medium">Qiymət</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone) => (
                <tr key={zone.area} className="border-t border-border">
                  <td className="px-5 py-3">{zone.area}</td>
                  <td className="px-5 py-3 text-muted-foreground">{zone.time}</td>
                  <td className="px-5 py-3 text-muted-foreground">{zone.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-lg font-semibold">Ödəniş üsulları</h2>
        <div className="mt-4 grid gap-4 sm:max-w-sm">
          {paymentMethods.map((method) => (
            <div key={method.title} className="rounded-2xl border border-border p-6">
              <method.icon className="h-5 w-5 text-electric" strokeWidth={1.5} />
              <h3 className="mt-3 font-medium">{method.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{method.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-2xl bg-secondary/30 p-6 text-sm text-muted-foreground">
        Sifarişiniz göndərildikdən sonra hesabınızdakı &ldquo;Sifarişlərim&rdquo; bölməsindən statusu izləyə bilərsiniz.
      </div>
    </div>
  );
}

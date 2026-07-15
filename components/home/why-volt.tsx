import { ShieldCheck, BadgeCheck, Truck, Lock, Sparkles } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "24 ay zəmanət" },
  { icon: BadgeCheck, label: "Original məhsullar" },
  { icon: Truck, label: "Bakıda sürətli çatdırılma" },
  { icon: Lock, label: "Təhlükəsiz ödəniş" },
  { icon: Sparkles, label: "Premium keyfiyyət" },
];

export function WhyVolt() {
  return (
    <section className="border-t border-border/60 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Niyə Volt?</h2>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2.5 rounded-2xl border border-border p-5 text-center">
              <item.icon className="h-6 w-6 text-electric" strokeWidth={1.5} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

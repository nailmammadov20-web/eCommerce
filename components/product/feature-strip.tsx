import { Zap, Cable, ShieldCheck, Truck, type LucideIcon } from "lucide-react";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureStrip({ wattage, connectorType, warrantyMonths }: { wattage: number; connectorType: string; warrantyMonths: number }) {
  const items: FeatureItem[] = [
    { icon: Zap, title: `${wattage}W`, description: "Sürətli şarj gücü" },
    { icon: Cable, title: connectorType, description: "Qoşulma növü" },
    { icon: ShieldCheck, title: `${warrantyMonths} ay`, description: "Rəsmi zəmanət" },
    { icon: Truck, title: "1-2 gün", description: "Bakıda çatdırılma" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="flex flex-col items-center gap-2 rounded-2xl border border-border p-5 text-center">
          <item.icon className="h-5 w-5 text-electric" strokeWidth={1.5} />
          <span className="text-sm font-semibold">{item.title}</span>
          <span className="text-xs text-muted-foreground">{item.description}</span>
        </div>
      ))}
    </div>
  );
}

import { Zap, PlugZap, Cable, Car, Radio, BatteryCharging, type LucideIcon } from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  "gan-adapterler": Zap,
  "usb-c-adapterler": PlugZap,
  "lightning-kabeller": Cable,
  kabeller: Cable,
  "car-chargers": Car,
  "wireless-chargers": Radio,
  "power-banks": BatteryCharging,
};

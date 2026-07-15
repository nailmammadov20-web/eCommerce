"use client";

import { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { estimateChargeTime } from "@/lib/compatibility-score";

const batteryOptions = [3000, 3500, 4000, 4500, 5000, 5500, 6000];
const wattageOptions = [5, 10, 18, 20, 25, 33, 45, 65, 100, 120];

function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes} dəqiqə`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h} saat ${m} dəqiqə` : `${h} saat`;
}

export function ChargeCalculator() {
  const [battery, setBattery] = useState(4500);
  const [wattage, setWattage] = useState(33);

  const estimate = useMemo(() => estimateChargeTime(wattage, battery), [wattage, battery]);

  return (
    <div className="rounded-3xl border border-border p-8 sm:p-10">
      <h3 className="text-xl font-semibold">Şarj müddəti kalkulyatoru</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Batareya tutumunu və adapter gücünü seçin, təxmini şarj müddətini görün.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <span className="text-sm font-medium">Batareya tutumu</span>
          <Select
            items={batteryOptions.map((value) => ({ value: String(value), label: `${value} mAh` }))}
            value={String(battery)}
            onValueChange={(v) => setBattery(Number(v))}
          >
            <SelectTrigger className="mt-2 h-12 w-full rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {batteryOptions.map((value) => (
                <SelectItem key={value} value={String(value)}>
                  {value} mAh
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <span className="text-sm font-medium">Adapter gücü</span>
          <Select
            items={wattageOptions.map((value) => ({ value: String(value), label: `${value}W` }))}
            value={String(wattage)}
            onValueChange={(v) => setWattage(Number(v))}
          >
            <SelectTrigger className="mt-2 h-12 w-full rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {wattageOptions.map((value) => (
                <SelectItem key={value} value={String(value)}>
                  {value}W
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-secondary/50 p-5">
          <span className="text-xs text-muted-foreground uppercase">0-80%</span>
          <p className="mt-1 text-2xl font-semibold">{formatMinutes(estimate.to80Minutes)}</p>
        </div>
        <div className="rounded-2xl bg-secondary/50 p-5">
          <span className="text-xs text-muted-foreground uppercase">0-100%</span>
          <p className="mt-1 text-2xl font-semibold">{formatMinutes(estimate.fullMinutes)}</p>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        * Nəticələr orta hesablamaya əsaslanır və telefon modelindən, kabeldən və istifadə zamanı fon tətbiqlərindən
        asılı olaraq dəyişə bilər.
      </p>
    </div>
  );
}

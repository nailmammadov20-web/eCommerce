import type { Metadata } from "next";
import { ShieldCheck, Clock, XCircle } from "lucide-react";
import { WarrantyClaimForm } from "@/components/warranty/warranty-claim-form";

export const metadata: Metadata = {
  title: "Zəmanət",
  description: "Volt adapterləri 24 ay, kabelləri 12 ay rəsmi zəmanətlə satılır. Zəmanət şərtləri və müraciət forması.",
};

const covered = [
  "İstehsal qüsurları",
  "Daxili komponent nasazlıqları",
  "Normal istifadə zamanı yaranan funksional problemlər",
  "Elan olunan spesifikasiyalara uyğunsuzluq",
];

const notCovered = [
  "Fiziki zədələr (sındırma, əzilmə)",
  "Suya salma və ya nəmlik zədələri",
  "Düzgün olmayan istifadədən yaranan zədələr",
  "Rəsmi olmayan təmir cəhdlərindən sonrakı zədələr",
];

export default function WarrantyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background">
          <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Zəmanət</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Hər Volt adapteri 24 ay, kabellərimiz isə 12 ay rəsmi zəmanətlə satılır.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2">
        <div className="rounded-3xl border border-border p-8">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-5 w-5 text-electric" /> Zəmanətə daxildir
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {covered.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-border p-8">
          <div className="flex items-center gap-2 font-semibold">
            <XCircle className="h-5 w-5 text-muted-foreground" /> Zəmanətə daxil deyil
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {notCovered.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-2xl bg-secondary/30 p-6 text-sm text-muted-foreground">
        <Clock className="mt-0.5 h-5 w-5 shrink-0 text-electric" />
        Müraciətlər 24-48 saat ərzində araşdırılır. Zəmanətli hesab olunan hallarda məhsul pulsuz təmir edilir və
        ya əvəz olunur.
      </div>

      <div className="mt-16">
        <WarrantyClaimForm />
      </div>
    </div>
  );
}

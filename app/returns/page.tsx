import type { Metadata } from "next";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

export const metadata: Metadata = {
  title: "Qaytarma",
  description: "Volt qaytarma və dəyişdirmə siyasəti — 14 günlük qaytarma hüququ və şərtləri.",
};

const steps = [
  {
    title: "Müraciət edin",
    description: "Sifarişi aldığınız tarixdən 14 gün ərzində əlaqə səhifəmizdəki formu doldurun.",
  },
  {
    title: "Məhsulu hazırlayın",
    description: "Məhsulu orijinal qablaşdırmasında, bütün aksesuarları ilə birlikdə hazırlayın.",
  },
  {
    title: "Qaytarın",
    description: "Komandamızın göstərdiyi ünvana məhsulu göndərin və ya kuryer vasitəsilə təhvil verin.",
  },
  {
    title: "Geri ödəniş",
    description: "Məhsul yoxlanıldıqdan sonra 3-5 iş günü ərzində ödəniş geri qaytarılır və ya dəyişdirmə edilir.",
  },
];

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-background">
          <RotateCcw className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Qaytarma</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Məhsuldan razı qalmadınızmı? Alışdan sonra 14 gün ərzində sadə qaytarma hüququndan istifadə edin.
        </p>
      </div>

      <div className="mt-16 space-y-6">
        {steps.map((step, i) => (
          <div key={step.title} className="flex gap-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
              {i + 1}
            </div>
            <div>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-secondary/30 p-6 text-sm text-muted-foreground">
        Qeyd: İstifadə izləri olan, orijinal qablaşdırması olmayan və ya aksesuarları əskik olan məhsullar qaytarıla
        bilməz. Suallarınız üçün{" "}
        <Link href="/contact" className="underline underline-offset-2">
          bizimlə əlaqə saxlayın
        </Link>
        .
      </div>
    </div>
  );
}

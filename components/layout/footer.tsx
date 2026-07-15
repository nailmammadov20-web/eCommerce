import Link from "next/link";
import { ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import { NewsletterForm } from "@/components/shared/newsletter-form";

const columns = [
  {
    title: "Mağaza",
    links: [
      { href: "/shop", label: "Bütün məhsullar" },
      { href: "/compatibility-checker", label: "Uyğunluq Yoxlayıcısı" },
      { href: "/charging-guide", label: "Şarj Bələdçisi" },
      { href: "/blog", label: "Bloq" },
    ],
  },
  {
    title: "Dəstək",
    links: [
      { href: "/faq", label: "Tez-tez verilən suallar" },
      { href: "/warranty", label: "Zəmanət" },
      { href: "/shipping", label: "Çatdırılma" },
      { href: "/returns", label: "Qaytarma" },
      { href: "/contact", label: "Əlaqə" },
    ],
  },
];

const trustItems = [
  { icon: ShieldCheck, label: "24 ay rəsmi zəmanət" },
  { icon: Truck, label: "Bakıda sürətli çatdırılma" },
  { icon: BadgeCheck, label: "100% orijinal məhsul" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div>
            <span className="text-xl font-semibold tracking-tight">VOLT</span>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Azərbaycan üçün yaradılmış premium şarj texnologiyaları brendi. Sürət, təhlükəsizlik və
              zərif dizayn — bir yerdə.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-semibold">Xəbərləri əldə edin</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Yeni məhsullar və şarj məsləhətləri barədə ilk siz məlumatlanın.
            </p>
            <NewsletterForm className="mt-4" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <item.icon className="h-4 w-4 text-electric" strokeWidth={1.5} />
                {item.label}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Volt. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  );
}

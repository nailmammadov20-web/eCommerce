import Link from "next/link";
import { DollarSign, ShoppingCart, Users, AlertTriangle, ShieldCheck, Mail, Star } from "lucide-react";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export default async function AdminOverviewPage() {
  const [revenueAgg, orderCount, customerCount, lowStockCount, pendingClaims, unreadMessages, pendingReviews] =
    await Promise.all([
      db.order.aggregate({ _sum: { total: true }, where: { status: { not: "CANCELLED" } } }),
      db.order.count(),
      db.user.count({ where: { role: "CUSTOMER" } }),
      db.product.count({ where: { stock: { lte: 5 }, status: "ACTIVE" } }),
      db.warrantyClaim.count({ where: { status: { in: ["PENDING", "IN_REVIEW"] } } }),
      db.contactMessage.count({ where: { status: "NEW" } }),
      db.review.count({ where: { status: "PENDING" } }),
    ]);

  const cards = [
    { label: "Ümumi gəlir", value: formatPrice(Number(revenueAgg._sum.total ?? 0)), icon: DollarSign, href: "/admin/orders" },
    { label: "Sifarişlər", value: orderCount, icon: ShoppingCart, href: "/admin/orders" },
    { label: "Müştərilər", value: customerCount, icon: Users, href: "/admin/customers" },
    { label: "Az stoklu məhsullar", value: lowStockCount, icon: AlertTriangle, href: "/admin/inventory" },
    { label: "Zəmanət müraciətləri", value: pendingClaims, icon: ShieldCheck, href: "/admin/warranty-claims" },
    { label: "Oxunmamış mesajlar", value: unreadMessages, icon: Mail, href: "/admin/messages" },
    { label: "Gözləyən rəylər", value: pendingReviews, icon: Star, href: "/admin/reviews" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">İdarəetmə paneli</h1>
      <p className="mt-2 text-muted-foreground">Mağazanızın ümumi vəziyyətinə baxış.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-border p-6 transition-colors hover:border-foreground/30"
          >
            <card.icon className="h-5 w-5 text-electric" strokeWidth={1.5} />
            <p className="mt-4 text-2xl font-semibold">{card.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

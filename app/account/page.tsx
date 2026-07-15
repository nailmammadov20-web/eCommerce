import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { formatPrice, formatDate } from "@/lib/utils";

const statusLabels: Record<string, string> = {
  PENDING: "Gözləmədə",
  CONFIRMED: "Təsdiqləndi",
  SHIPPED: "Göndərildi",
  DELIVERED: "Çatdırıldı",
  CANCELLED: "Ləğv edildi",
};

export default async function AccountOverviewPage() {
  const user = await requireUser();

  const [orderCount, recentOrders, pendingClaims] = await Promise.all([
    db.order.count({ where: { userId: user.id } }),
    db.order.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 3 }),
    db.warrantyClaim.count({ where: { userId: user.id, status: { in: ["PENDING", "IN_REVIEW"] } } }),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Xoş gəldiniz, {user.name}</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border p-6">
          <p className="text-sm text-muted-foreground">Ümumi sifarişlər</p>
          <p className="mt-1 text-3xl font-semibold">{orderCount}</p>
        </div>
        <div className="rounded-2xl border border-border p-6">
          <p className="text-sm text-muted-foreground">Aktiv zəmanət müraciətləri</p>
          <p className="mt-1 text-3xl font-semibold">{pendingClaims}</p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Son sifarişlər</h2>
          <Link href="/account/orders" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            Hamısı <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className="mt-4 divide-y divide-border rounded-2xl border border-border">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-5">
                <div>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(Number(order.total))}</p>
                  <p className="text-sm text-muted-foreground">{statusLabels[order.status]}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">Hələ sifarişiniz yoxdur.</p>
        )}
      </div>
    </div>
  );
}

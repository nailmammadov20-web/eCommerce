import type { Metadata } from "next";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { formatPrice, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Sifarişlərim" };

const statusLabels: Record<string, string> = {
  PENDING: "Gözləmədə",
  CONFIRMED: "Təsdiqləndi",
  SHIPPED: "Göndərildi",
  DELIVERED: "Çatdırıldı",
  CANCELLED: "Ləğv edildi",
};

export default async function AccountOrdersPage() {
  const user = await requireUser();
  const orders = await db.order.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Sifarişlərim</h1>

      {orders.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">Hələ sifarişiniz yoxdur.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-border p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">{order.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                  {statusLabels[order.status]}
                </span>
              </div>
              <div className="mt-4 space-y-1.5 border-t border-border pt-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.nameSnapshot} × {item.quantity}
                    </span>
                    <span>{formatPrice(Number(item.subtotal))}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between border-t border-border pt-3 font-semibold">
                <span>Cəmi</span>
                <span>{formatPrice(Number(order.total))}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

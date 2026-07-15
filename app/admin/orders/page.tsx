import { db } from "@/lib/db";
import { OrderStatusSelect } from "@/components/admin/order-status-select";
import { formatPrice, formatDate } from "@/lib/utils";

const paymentLabels: Record<string, string> = { WHATSAPP: "WhatsApp (nağd)" };

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Sifarişlər</h1>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Sifariş</th>
              <th className="px-5 py-3 font-medium">Müştəri</th>
              <th className="px-5 py-3 font-medium">Ödəniş</th>
              <th className="px-5 py-3 font-medium">Cəmi</th>
              <th className="px-5 py-3 font-medium">Tarix</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-border align-top">
                <td className="px-5 py-3">
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">{order.items.length} məhsul</p>
                </td>
                <td className="px-5 py-3">
                  <p>{order.customerName}</p>
                  <p className="text-xs text-muted-foreground">{order.customerPhone}</p>
                  <p className="text-xs text-muted-foreground">{order.city}</p>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{paymentLabels[order.paymentMethod]}</td>
                <td className="px-5 py-3 font-medium">{formatPrice(Number(order.total))}</td>
                <td className="px-5 py-3 text-muted-foreground">{formatDate(order.createdAt)}</td>
                <td className="px-5 py-3">
                  <OrderStatusSelect orderId={order.id} status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="p-8 text-center text-sm text-muted-foreground">Hələ sifariş yoxdur.</p>}
      </div>
    </div>
  );
}

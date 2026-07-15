import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function AdminCustomersPage() {
  const customers = await db.user.findMany({
    where: { role: "CUSTOMER" },
    include: { _count: { select: { orders: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Müştərilər</h1>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Ad</th>
              <th className="px-5 py-3 font-medium">E-poçt</th>
              <th className="px-5 py-3 font-medium">Telefon</th>
              <th className="px-5 py-3 font-medium">Sifarişlər</th>
              <th className="px-5 py-3 font-medium">Qeydiyyat tarixi</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t border-border">
                <td className="px-5 py-3 font-medium">{customer.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{customer.email}</td>
                <td className="px-5 py-3 text-muted-foreground">{customer.phone ?? "—"}</td>
                <td className="px-5 py-3">{customer._count.orders}</td>
                <td className="px-5 py-3 text-muted-foreground">{formatDate(customer.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && (
          <p className="p-8 text-center text-sm text-muted-foreground">Hələ müştəri yoxdur.</p>
        )}
      </div>
    </div>
  );
}

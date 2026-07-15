import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteProduct } from "@/lib/actions/admin/products.actions";
import { formatPrice } from "@/lib/utils";

const statusLabels: Record<string, string> = { ACTIVE: "Aktiv", COMING_SOON: "Tezliklə", DRAFT: "Qaralama" };

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    include: { category: true, _count: { select: { images: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Məhsullar</h1>
        <Button render={<Link href="/admin/products/new" />}>
          <Plus className="mr-1.5 h-4 w-4" /> Yeni məhsul
        </Button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Ad</th>
              <th className="px-5 py-3 font-medium">Kateqoriya</th>
              <th className="px-5 py-3 font-medium">Qiymət</th>
              <th className="px-5 py-3 font-medium">Stok</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Şəkillər</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-border">
                <td className="px-5 py-3">
                  <Link href={`/admin/products/${product.id}`} className="font-medium hover:text-electric">
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{product.sku}</p>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{product.category.name}</td>
                <td className="px-5 py-3">{formatPrice(Number(product.price))}</td>
                <td className="px-5 py-3">{product.stock}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">
                    {statusLabels[product.status]}
                  </span>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{product._count.images}</td>
                <td className="px-5 py-3 text-right">
                  <DeleteButton action={deleteProduct.bind(null, product.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

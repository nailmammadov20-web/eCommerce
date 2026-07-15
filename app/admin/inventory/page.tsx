import { AlertTriangle } from "lucide-react";
import { db } from "@/lib/db";
import { StockInput } from "@/components/admin/stock-input";
import { updateProductStock, updateVariantStock } from "@/lib/actions/admin/inventory.actions";
import { cn } from "@/lib/utils";

const LOW_STOCK_THRESHOLD = 5;

export default async function AdminInventoryPage() {
  const products = await db.product.findMany({
    include: { variants: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Anbar</h1>
      <p className="mt-2 text-muted-foreground">Stok səviyyələrini izləyin və yeniləyin.</p>

      <div className="mt-8 space-y-3">
        {products.map((product) => (
          <div key={product.id} className="rounded-2xl border border-border p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {product.stock <= LOW_STOCK_THRESHOLD && (
                  <AlertTriangle className="h-4 w-4 text-amber-500" strokeWidth={1.5} />
                )}
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sku}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-sm text-muted-foreground", product.stock <= LOW_STOCK_THRESHOLD && "text-amber-600 dark:text-amber-500")}>
                  Əsas stok
                </span>
                <StockInput initialValue={product.stock} action={updateProductStock.bind(null, product.id)} />
              </div>
            </div>

            {product.variants.length > 0 && (
              <div className="mt-3 space-y-2 border-t border-border pt-3">
                {product.variants.map((variant) => (
                  <div key={variant.id} className="flex items-center justify-between pl-6">
                    <span className="text-sm text-muted-foreground">{variant.name}</span>
                    <StockInput initialValue={variant.stock} action={updateVariantStock.bind(null, variant.id)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

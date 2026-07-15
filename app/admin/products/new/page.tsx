import { db } from "@/lib/db";
import { ProductForm } from "@/components/admin/product-form";
import { createProduct } from "@/lib/actions/admin/products.actions";

export default async function NewProductPage() {
  const categories = await db.category.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Yeni məhsul</h1>
      <div className="mt-8">
        <ProductForm categories={categories} action={createProduct} submitLabel="Məhsulu yarat" />
      </div>
    </div>
  );
}

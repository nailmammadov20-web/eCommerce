import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductForm } from "@/components/admin/product-form";
import { ProductImageManager } from "@/components/admin/product-image-manager";
import { updateProduct } from "@/lib/actions/admin/products.actions";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    db.product.findUnique({
      where: { id },
      include: { images: { orderBy: { position: "asc" } } },
    }),
    db.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!product) notFound();

  const boundUpdate = updateProduct.bind(null, product.id);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>

      <div className="mt-8 rounded-2xl border border-border p-6">
        <ProductImageManager productId={product.id} images={product.images} />
      </div>

      <div className="mt-8">
        <ProductForm
          categories={categories}
          action={boundUpdate}
          submitLabel="Yadda saxla"
          defaultValues={{
            name: product.name,
            slug: product.slug,
            shortDescription: product.shortDescription,
            story: product.story,
            price: Number(product.price),
            sku: product.sku,
            stock: product.stock,
            wattage: product.wattage,
            cableType: product.cableType,
            connectorType: product.connectorType,
            whatsInBox: product.whatsInBox,
            warrantyMonths: product.warrantyMonths,
            status: product.status,
            featured: product.featured,
            categoryId: product.categoryId,
            metaTitle: product.metaTitle,
            metaDescription: product.metaDescription,
          }}
        />
      </div>
    </div>
  );
}

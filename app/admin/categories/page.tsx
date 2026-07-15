import { db } from "@/lib/db";
import { CategoryDialog } from "@/components/admin/category-dialog";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteCategory } from "@/lib/actions/admin/categories.actions";

export default async function AdminCategoriesPage() {
  const categories = await db.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Kateqoriyalar</h1>
        <CategoryDialog />
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Ad</th>
              <th className="px-5 py-3 font-medium">Slug</th>
              <th className="px-5 py-3 font-medium">Məhsul sayı</th>
              <th className="px-5 py-3 font-medium">Sıra</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t border-border">
                <td className="px-5 py-3 font-medium">{category.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{category.slug}</td>
                <td className="px-5 py-3">{category._count.products}</td>
                <td className="px-5 py-3">{category.order}</td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <CategoryDialog defaultValues={category} />
                    <DeleteButton action={deleteCategory.bind(null, category.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

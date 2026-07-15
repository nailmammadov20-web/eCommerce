import { db } from "@/lib/db";
import { FaqDialog } from "@/components/admin/faq-dialog";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteFaq } from "@/lib/actions/admin/faq.actions";

const categoryLabels: Record<string, string> = {
  GENERAL: "Ümumi",
  SHIPPING: "Çatdırılma",
  WARRANTY: "Zəmanət",
  PRODUCT: "Məhsul",
};

export default async function AdminFaqPage() {
  const faqs = await db.fAQ.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">FAQ</h1>
        <FaqDialog />
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Sual</th>
              <th className="px-5 py-3 font-medium">Kateqoriya</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq.id} className="border-t border-border">
                <td className="px-5 py-3 font-medium">{faq.question}</td>
                <td className="px-5 py-3 text-muted-foreground">{categoryLabels[faq.category]}</td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">
                    {faq.published ? "Dərc edilib" : "Gizli"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <FaqDialog defaultValues={faq} />
                    <DeleteButton action={deleteFaq.bind(null, faq.id)} />
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

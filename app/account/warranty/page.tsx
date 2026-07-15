import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Zəmanət müraciətlərim" };

const statusLabels: Record<string, string> = {
  PENDING: "Gözləmədə",
  IN_REVIEW: "Araşdırılır",
  APPROVED: "Təsdiqləndi",
  REJECTED: "Rədd edildi",
  RESOLVED: "Həll olundu",
};

export default async function AccountWarrantyPage() {
  const user = await requireUser();
  const claims = await db.warrantyClaim.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Zəmanət müraciətlərim</h1>
        <Link href="/warranty" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          Yeni müraciət <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {claims.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">Hələ zəmanət müraciətiniz yoxdur.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {claims.map((claim) => (
            <div key={claim.id} className="rounded-2xl border border-border p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground">{formatDate(claim.createdAt)}</p>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                  {statusLabels[claim.status]}
                </span>
              </div>
              <p className="mt-3 text-sm">{claim.issueDescription}</p>
              {claim.adminNotes && (
                <p className="mt-2 rounded-lg bg-secondary/50 p-3 text-sm text-muted-foreground">
                  <strong className="text-foreground">Cavab: </strong>
                  {claim.adminNotes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

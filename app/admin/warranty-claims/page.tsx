import { db } from "@/lib/db";
import { WarrantyClaimRow } from "@/components/admin/warranty-claim-row";

export default async function AdminWarrantyClaimsPage() {
  const claims = await db.warrantyClaim.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Zəmanət müraciətləri</h1>

      <div className="mt-8 space-y-4">
        {claims.map((claim) => (
          <WarrantyClaimRow key={claim.id} claim={claim} />
        ))}
        {claims.length === 0 && <p className="text-sm text-muted-foreground">Hələ müraciət yoxdur.</p>}
      </div>
    </div>
  );
}

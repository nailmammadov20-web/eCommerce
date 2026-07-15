"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateWarrantyClaim } from "@/lib/actions/admin/warranty.actions";
import { formatDate } from "@/lib/utils";

const statusOptions = [
  { value: "PENDING", label: "Gözləmədə" },
  { value: "IN_REVIEW", label: "Araşdırılır" },
  { value: "APPROVED", label: "Təsdiqləndi" },
  { value: "REJECTED", label: "Rədd edildi" },
  { value: "RESOLVED", label: "Həll olundu" },
] as const;

interface Claim {
  id: string;
  name: string;
  email: string;
  phone: string;
  issueDescription: string;
  status: string;
  adminNotes: string | null;
  createdAt: Date;
}

export function WarrantyClaimRow({ claim }: { claim: Claim }) {
  const [status, setStatus] = useState(claim.status);
  const [notes, setNotes] = useState(claim.adminNotes ?? "");
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    const formData = new FormData();
    formData.set("status", status);
    formData.set("adminNotes", notes);
    startTransition(async () => {
      await updateWarrantyClaim(claim.id, formData);
      toast.success("Yeniləndi.");
    });
  }

  return (
    <div className="rounded-2xl border border-border p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="font-medium">
            {claim.name} · {claim.phone}
          </p>
          <p className="text-sm text-muted-foreground">{claim.email}</p>
          <p className="mt-2 text-sm">{claim.issueDescription}</p>
          <p className="mt-1 text-xs text-muted-foreground">{formatDate(claim.createdAt)}</p>
        </div>
        <div className="w-full max-w-xs space-y-2 sm:w-64">
          <Select items={statusOptions} value={status} onValueChange={(v) => setStatus(v ?? "PENDING")}>
            <SelectTrigger className="h-9 w-full rounded-lg text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Admin qeydi (müştəriyə görünür)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="text-sm"
          />
          <Button size="sm" onClick={handleSave} disabled={isPending} className="w-full">
            Yadda saxla
          </Button>
        </div>
      </div>
    </div>
  );
}

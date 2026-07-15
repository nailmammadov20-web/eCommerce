"use client";

import { useActionState } from "react";
import { submitWarrantyClaim } from "@/lib/actions/warranty.actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState = { success: false, message: "" };

export function WarrantyClaimForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => submitWarrantyClaim(formData),
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4 rounded-3xl border border-border p-8">
      <h3 className="text-xl font-semibold">Zəmanət müraciəti</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="name" placeholder="Adınız" required />
        <Input name="email" type="email" placeholder="E-poçt ünvanınız" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="phone" placeholder="Telefon nömrəniz" required />
        <Input name="orderId" placeholder="Sifariş nömrəsi (istəyə bağlı)" />
      </div>
      <Textarea name="issueDescription" placeholder="Problemi ətraflı təsvir edin" required rows={5} />
      <Button type="submit" size="lg" disabled={isPending} className="rounded-full">
        {isPending ? "Göndərilir..." : "Müraciəti göndər"}
      </Button>
      {state.message && (
        <p className={cn("text-sm", state.success ? "text-emerald-600 dark:text-emerald-500" : "text-destructive")}>
          {state.message}
        </p>
      )}
    </form>
  );
}

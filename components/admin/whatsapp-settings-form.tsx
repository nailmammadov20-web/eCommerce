"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateWhatsappNumber } from "@/lib/actions/admin/settings.actions";

export function WhatsappSettingsForm({ defaultValue }: { defaultValue: string }) {
  const [message, formAction, isPending] = useActionState(updateWhatsappNumber, undefined);

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3">
      <div>
        <label className="text-sm font-medium">WhatsApp nömrəsi (beynəlxalq format, + işarəsiz)</label>
        <Input name="number" required defaultValue={defaultValue} className="mt-1.5" placeholder="994702828201" />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Yadda saxlanılır..." : "Yadda saxla"}
      </Button>
      {message && <p className="w-full text-sm text-muted-foreground">{message}</p>}
    </form>
  );
}

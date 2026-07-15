"use client";

import { useActionState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateComingSoonItems } from "@/lib/actions/admin/settings.actions";

interface ComingSoonItem {
  name: string;
  blurb: string;
  eta: string;
}

export function ComingSoonForm({ items }: { items: ComingSoonItem[] }) {
  const [message, formAction, isPending] = useActionState(updateComingSoonItems, undefined);
  const initialText = items.map((item) => `${item.name} | ${item.blurb} | ${item.eta}`).join("\n");

  return (
    <form action={formAction} className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Hər sətirdə bir element: <code className="rounded bg-secondary px-1 py-0.5">Ad | Qısa təsvir | Tarix</code>
      </p>
      <Textarea name="items" rows={6} defaultValue={initialText} className="font-mono text-sm" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Yadda saxlanılır..." : "Yadda saxla"}
      </Button>
    </form>
  );
}

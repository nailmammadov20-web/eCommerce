"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateHeroSettings } from "@/lib/actions/admin/settings.actions";

export function HeroSettingsForm({
  defaultValues,
}: {
  defaultValues: { headline: string; subtitle: string; ctaLabel: string };
}) {
  const [message, formAction, isPending] = useActionState(updateHeroSettings, undefined);

  return (
    <form action={formAction} className="space-y-3">
      <div>
        <label className="text-sm font-medium">Başlıq</label>
        <Input name="headline" required defaultValue={defaultValues.headline} className="mt-1.5" />
      </div>
      <div>
        <label className="text-sm font-medium">Alt mətn</label>
        <Textarea name="subtitle" required rows={2} defaultValue={defaultValues.subtitle} className="mt-1.5" />
      </div>
      <div>
        <label className="text-sm font-medium">Düymə mətni</label>
        <Input name="ctaLabel" required defaultValue={defaultValues.ctaLabel} className="mt-1.5" />
      </div>
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Yadda saxlanılır..." : "Yadda saxla"}
      </Button>
    </form>
  );
}

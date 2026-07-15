"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateSeoDefaults } from "@/lib/actions/admin/settings.actions";

export function SeoSettingsForm({
  defaultValues,
}: {
  defaultValues: { defaultMetaTitle: string; defaultMetaDescription: string };
}) {
  const [message, formAction, isPending] = useActionState(updateSeoDefaults, undefined);

  return (
    <form action={formAction} className="space-y-3">
      <div>
        <label className="text-sm font-medium">Default meta başlıq</label>
        <Input name="defaultMetaTitle" required defaultValue={defaultValues.defaultMetaTitle} className="mt-1.5" />
      </div>
      <div>
        <label className="text-sm font-medium">Default meta təsvir</label>
        <Textarea
          name="defaultMetaDescription"
          required
          rows={3}
          defaultValue={defaultValues.defaultMetaDescription}
          className="mt-1.5"
        />
      </div>
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Yadda saxlanılır..." : "Yadda saxla"}
      </Button>
    </form>
  );
}

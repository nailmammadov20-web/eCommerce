"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/lib/actions/newsletter.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState = { success: false, message: "" };

export function NewsletterForm({ className, dark }: { className?: string; dark?: boolean }) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => subscribeNewsletter(formData),
    initialState,
  );

  return (
    <form action={formAction} className={className}>
      <div className="flex gap-2">
        <Input
          type="email"
          name="email"
          placeholder="E-poçt ünvanınız"
          required
          className={cn(dark && "border-white/20 bg-white/5 text-white placeholder:text-white/50")}
        />
        <Button type="submit" disabled={isPending} variant={dark ? "secondary" : "default"}>
          {isPending ? "..." : "Abunə ol"}
        </Button>
      </div>
      {state.message && (
        <p className={cn("mt-2 text-sm", state.success ? "text-emerald-500" : "text-destructive")}>
          {state.message}
        </p>
      )}
    </form>
  );
}

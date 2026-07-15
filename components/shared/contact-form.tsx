"use client";

import { useActionState } from "react";
import { submitContactMessage } from "@/lib/actions/contact.actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialState = { success: false, message: "" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => submitContactMessage(formData),
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="name" placeholder="Adınız" required />
        <Input name="email" type="email" placeholder="E-poçt ünvanınız" required />
      </div>
      <Input name="phone" placeholder="Telefon (istəyə bağlı)" />
      <Input name="subject" placeholder="Mövzu" required />
      <Textarea name="message" placeholder="Mesajınız" required rows={5} />
      <Button type="submit" size="lg" disabled={isPending} className="rounded-full">
        {isPending ? "Göndərilir..." : "Mesajı göndər"}
      </Button>
      {state.message && (
        <p className={cn("text-sm", state.success ? "text-emerald-600 dark:text-emerald-500" : "text-destructive")}>
          {state.message}
        </p>
      )}
    </form>
  );
}

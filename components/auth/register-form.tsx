"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/lib/actions/auth.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const [error, formAction, isPending] = useActionState(register, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <Input name="name" placeholder="Ad Soyad" required />
      <Input name="email" type="email" placeholder="E-poçt ünvanınız" required />
      <Input name="phone" placeholder="Telefon (istəyə bağlı)" />
      <Input name="password" type="password" placeholder="Şifrə" required minLength={6} />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" size="lg" disabled={isPending} className="w-full rounded-full">
        {isPending ? "Hesab yaradılır..." : "Qeydiyyatdan keç"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Artıq hesabınız var?{" "}
        <Link href="/login" className="font-medium text-foreground underline underline-offset-2">
          Daxil olun
        </Link>
      </p>
    </form>
  );
}

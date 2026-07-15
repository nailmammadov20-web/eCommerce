"use client";

import { useActionState } from "react";
import Link from "next/link";
import { authenticate } from "@/lib/actions/auth.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [error, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Input name="email" type="email" placeholder="E-poçt ünvanınız" required />
      </div>
      <div>
        <Input name="password" type="password" placeholder="Şifrə" required />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" size="lg" disabled={isPending} className="w-full rounded-full">
        {isPending ? "Daxil olunur..." : "Daxil ol"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Hesabınız yoxdur?{" "}
        <Link href="/register" className="font-medium text-foreground underline underline-offset-2">
          Qeydiyyatdan keçin
        </Link>
      </p>
    </form>
  );
}

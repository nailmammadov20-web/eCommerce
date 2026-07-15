import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Qeydiyyat",
  description: "Volt hesabı yaradın — sifarişlərinizi izləyin və daha sürətli checkout edin.",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Qeydiyyat</h1>
      <p className="mt-2 text-muted-foreground">Yeni hesab yaradın.</p>
      <div className="mt-8">
        <RegisterForm />
      </div>
    </div>
  );
}

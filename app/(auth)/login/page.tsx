import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Daxil ol",
  description: "Hesabınıza daxil olun və sifarişlərinizi izləyin.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Daxil ol</h1>
      <p className="mt-2 text-muted-foreground">Hesabınıza daxil olun.</p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}

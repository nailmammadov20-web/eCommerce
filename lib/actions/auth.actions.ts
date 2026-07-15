"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signIn, signOut } from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/validations/auth";

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function authenticate(_prevState: string | undefined, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return parsed.error.issues[0]?.message ?? "Məlumatları yoxlayın.";
  }

  const existingUser = await db.user.findUnique({ where: { email: parsed.data.email }, select: { role: true } });

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: existingUser?.role === "ADMIN" ? "/admin" : "/account",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "E-poçt və ya şifrə yanlışdır.";
    }
    throw error;
  }
}

export async function register(_prevState: string | undefined, formData: FormData) {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    phone: formData.get("phone") || undefined,
  });

  if (!parsed.success) {
    return parsed.error.issues[0]?.message ?? "Məlumatları yoxlayın.";
  }

  const existing = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return "Bu e-poçt ünvanı ilə artıq hesab mövcuddur.";
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  await db.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      phone: parsed.data.phone || null,
      role: "CUSTOMER",
    },
  });

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/account",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Hesab yaradıldı, lakin daxil olmaq mümkün olmadı. Zəhmət olmasa daxil olun.";
    }
    throw error;
  }
}

import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { LayoutDashboard, Package, ShieldCheck, LogOut } from "lucide-react";
import { requireUser } from "@/lib/session";
import { signOutAction } from "@/lib/actions/auth.actions";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const links = [
  { href: "/account", label: "Ümumi baxış", icon: LayoutDashboard },
  { href: "/account/orders", label: "Sifarişlərim", icon: Package },
  { href: "/account/warranty", label: "Zəmanət müraciətlərim", icon: ShieldCheck },
];

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  if (user.role === "ADMIN") redirect("/admin");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-6">
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <link.icon className="h-4 w-4" strokeWidth={1.5} />
                {link.label}
              </Link>
            ))}
            <form action={signOutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <LogOut className="h-4 w-4" strokeWidth={1.5} />
                Çıxış
              </button>
            </form>
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}

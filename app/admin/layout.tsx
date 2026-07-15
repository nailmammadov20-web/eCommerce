import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Boxes,
  BookOpen,
  HelpCircle,
  Star,
  ShieldCheck,
  Mail,
  Home,
  Search,
  LogOut,
} from "lucide-react";
import type { Metadata } from "next";
import { requireAdmin } from "@/lib/session";
import { signOutAction } from "@/lib/actions/auth.actions";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const navGroups = [
  {
    label: "Ümumi",
    items: [{ href: "/admin", label: "İdarəetmə paneli", icon: LayoutDashboard }],
  },
  {
    label: "Ticarət",
    items: [
      { href: "/admin/products", label: "Məhsullar", icon: Package },
      { href: "/admin/categories", label: "Kateqoriyalar", icon: FolderTree },
      { href: "/admin/orders", label: "Sifarişlər", icon: ShoppingCart },
      { href: "/admin/inventory", label: "Anbar", icon: Boxes },
      { href: "/admin/customers", label: "Müştərilər", icon: Users },
    ],
  },
  {
    label: "Məzmun",
    items: [
      { href: "/admin/blog", label: "Bloq", icon: BookOpen },
      { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
      { href: "/admin/reviews", label: "Rəylər", icon: Star },
      { href: "/admin/warranty-claims", label: "Zəmanət müraciətləri", icon: ShieldCheck },
      { href: "/admin/messages", label: "Mesajlar", icon: Mail },
    ],
  },
  {
    label: "Sayt",
    items: [
      { href: "/admin/homepage", label: "Ana səhifə redaktoru", icon: Home },
      { href: "/admin/seo", label: "SEO ayarları", icon: Search },
    ],
  },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-[1600px] gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 space-y-8">
          <div>
            <p className="text-sm font-semibold">{admin.name}</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="px-3 text-xs font-medium text-muted-foreground uppercase">{group.label}</p>
              <nav className="mt-2 space-y-0.5">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <item.icon className="h-4 w-4" strokeWidth={1.5} />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
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
        </div>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

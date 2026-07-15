import Link from "next/link";
import { User, Search, ChevronDown, ArrowRight, Grid3x3 } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { categoryIcons } from "@/lib/category-icons";
import { CartButton } from "@/components/layout/cart-button";
import { WishlistButton } from "@/components/layout/wishlist-button";
import { MobileNav } from "@/components/layout/mobile-nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [{ href: "/compatibility-checker", label: "Uyğunluq Yoxlayıcısı" }];

// Also surfaced via the mobile menu / footer, kept out of the primary
// header nav to match the compact storefront header spec.
const secondaryLinks = [
  { href: "/charging-guide", label: "Şarj Bələdçisi" },
  { href: "/blog", label: "Bloq" },
  { href: "/contact", label: "Əlaqə" },
];

export async function Navbar() {
  const [session, categories] = await Promise.all([
    auth(),
    db.category.findMany({ orderBy: { order: "asc" }, include: { _count: { select: { products: true } } } }),
  ]);

  const allLinks = [{ href: "/shop", label: "Mağaza" }, ...links, ...secondaryLinks];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-xl font-semibold tracking-tight">
          VOLT
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="hidden shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex">
            Kateqoriyalar
            <ChevronDown className="h-3.5 w-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 p-2">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase">
                Kateqoriyalar
              </DropdownMenuLabel>
              {categories.map((category) => {
                const Icon = categoryIcons[category.slug] ?? Grid3x3;
                return (
                  <DropdownMenuItem
                    key={category.id}
                    render={<Link href={`/shop?category=${category.slug}`} />}
                    className="gap-3 rounded-lg px-2 py-2.5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Icon className="h-4 w-4 text-electric" strokeWidth={1.5} />
                    </div>
                    <span className="flex-1 text-sm">{category.name}</span>
                    <span className="text-xs text-muted-foreground">{category._count.products}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/shop" />} className="justify-between rounded-lg px-2 py-2.5">
              <span className="text-sm font-medium">Bütün məhsullar</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          href="/compatibility-checker"
          className="hidden shrink-0 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
        >
          Uyğunluq Yoxlayıcısı
        </Link>

        <form action="/shop" method="GET" className="hidden flex-1 md:block">
          <div className="relative mx-auto max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="q"
              placeholder="Məhsul axtar..."
              className="h-10 w-full rounded-full border border-input bg-transparent pr-4 pl-9 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1">
          <WishlistButton />
          <CartButton />
          <Link
            href={session?.user ? (session.user.role === "ADMIN" ? "/admin" : "/account") : "/login"}
            aria-label={session?.user ? "Hesabım" : "Daxil ol"}
            className="hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-accent md:inline-flex"
          >
            <User className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <MobileNav
            links={allLinks}
            categories={categories}
            isAuthed={!!session?.user}
            isAdmin={session?.user?.role === "ADMIN"}
          />
        </div>
      </div>
    </header>
  );
}

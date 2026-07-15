"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, User, Heart, Search, LayoutDashboard } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface NavLink {
  href: string;
  label: string;
}

interface CategoryLink {
  slug: string;
  name: string;
}

export function MobileNav({
  links,
  categories,
  isAuthed,
  isAdmin = false,
}: {
  links: NavLink[];
  categories: CategoryLink[];
  isAuthed: boolean;
  isAdmin?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Menyu" />}>
        <Menu className="h-5 w-5" strokeWidth={1.5} />
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] max-w-sm overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left text-xl font-semibold tracking-tight">Volt</SheetTitle>
        </SheetHeader>

        <form action="/shop" method="GET" className="px-4">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="q"
              placeholder="Məhsul axtar..."
              className="h-10 w-full rounded-full border border-input bg-transparent pr-4 pl-9 text-sm outline-none"
            />
          </div>
        </form>

        <nav className="mt-2 flex flex-col gap-1 px-4">
          {links.map((link) => (
            <SheetClose
              key={link.href}
              render={
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                />
              }
            >
              {link.label}
            </SheetClose>
          ))}

          {categories.length > 0 && (
            <>
              <div className="my-2 h-px bg-border" />
              <p className="px-3 text-xs font-medium text-muted-foreground uppercase">Kateqoriyalar</p>
              {categories.map((category) => (
                <SheetClose
                  key={category.slug}
                  render={
                    <Link
                      href={`/shop?category=${category.slug}`}
                      className="rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                    />
                  }
                >
                  {category.name}
                </SheetClose>
              ))}
            </>
          )}

          <div className="my-2 h-px bg-border" />
          {isAdmin && (
            <SheetClose
              render={
                <Link
                  href="/admin"
                  className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-electric transition-colors hover:bg-accent"
                />
              }
            >
              <LayoutDashboard className="h-4 w-4" strokeWidth={1.5} />
              Admin paneli
            </SheetClose>
          )}
          <SheetClose
            render={
              <Link
                href="/wishlist"
                className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
              />
            }
          >
            <Heart className="h-4 w-4" strokeWidth={1.5} />
            Seçilmişlər
          </SheetClose>
          <SheetClose
            render={
              <Link
                href={isAuthed ? (isAdmin ? "/admin" : "/account") : "/login"}
                className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
              />
            }
          >
            <User className="h-4 w-4" strokeWidth={1.5} />
            {isAuthed ? "Hesabım" : "Daxil ol"}
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

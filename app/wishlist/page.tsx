import type { Metadata } from "next";
import { WishlistPageClient } from "@/components/wishlist/wishlist-page-client";

export const metadata: Metadata = {
  title: "Seçilmişlər",
  robots: { index: false, follow: false },
};

export default function WishlistPage() {
  return <WishlistPageClient />;
}

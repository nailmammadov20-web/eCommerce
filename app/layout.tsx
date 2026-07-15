import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Volt — Premium Telefon Adapterləri və Şarj Aksesuarları | Bakı, Azərbaycan",
    template: "%s | Volt",
  },
  description:
    "Volt — Azərbaycanda premium sürətli şarj adapteri, USB-C adapter, GaN adapter və telefon şarj cihazları. Bakıda sürətli çatdırılma, 24 ay zəmanət.",
  keywords: [
    "telefon adapteri",
    "sürətli şarj adapteri",
    "USB-C adapter",
    "iPhone adapter",
    "Samsung adapter",
    "GaN adapter",
    "adapter Bakıda",
    "telefon şarj cihazı",
  ],
  openGraph: {
    type: "website",
    locale: "az_AZ",
    siteName: "Volt",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-center" />
        </TooltipProvider>
      </body>
    </html>
  );
}

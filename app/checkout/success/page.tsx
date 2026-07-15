import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sifariş qəbul edildi",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderNumber } = await searchParams;
  const order = orderNumber
    ? await db.order.findUnique({ where: { orderNumber }, include: { items: true } })
    : null;

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-500">
        <CheckCircle2 className="h-8 w-8" strokeWidth={1.5} />
      </div>
      <h1 className="mt-8 text-3xl font-semibold tracking-tight">Sifarişiniz qəbul edildi!</h1>

      {order ? (
        <>
          <p className="mt-3 text-muted-foreground">
            Sifariş nömrəniz: <span className="font-semibold text-foreground">{order.orderNumber}</span>
          </p>
          <div className="mt-8 rounded-2xl border border-border p-6 text-left">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between py-1.5 text-sm">
                <span>
                  {item.nameSnapshot} × {item.quantity}
                </span>
                <span>{formatPrice(Number(item.subtotal))}</span>
              </div>
            ))}
            <div className="mt-2 flex justify-between border-t border-border pt-2 font-semibold">
              <span>Cəmi</span>
              <span>{formatPrice(Number(order.total))}</span>
            </div>
          </div>
        </>
      ) : (
        <p className="mt-3 text-muted-foreground">Komandamız tezliklə sizinlə əlaqə saxlayacaq.</p>
      )}

      <Button render={<Link href="/shop" />} size="lg" className="mt-10 rounded-full">
        Alış-verişə davam et
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
}

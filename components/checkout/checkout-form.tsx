"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Truck, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCartStore, cartSubtotal } from "@/lib/store/cart-store";
import { createOrder } from "@/lib/actions/checkout.actions";
import { calculateShipping } from "@/lib/shipping";
import { formatPrice } from "@/lib/utils";

const shippingDetailsSchema = z.object({
  customerName: z.string().min(2, "Adınızı daxil edin"),
  customerPhone: z.string().min(9, "Düzgün telefon nömrəsi daxil edin"),
  customerEmail: z.string().email("Düzgün e-poçt ünvanı daxil edin").optional().or(z.literal("")),
  city: z.string().min(2, "Şəhəri daxil edin"),
  addressLine: z.string().min(5, "Ünvanı daxil edin"),
  notes: z.string().optional(),
});

type ShippingDetails = z.infer<typeof shippingDetailsSchema>;

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ShippingDetails>({ resolver: zodResolver(shippingDetailsSchema) });

  const city = watch("city") ?? "";
  const subtotal = cartSubtotal(items);
  const shipping = calculateShipping(city, subtotal);
  const total = subtotal + shipping;

  async function onSubmit(values: ShippingDetails) {
    setSubmitError(null);

    const result = await createOrder({
      ...values,
      items: items.map((item) => ({
        productId: item.productId,
        variantId: item.variantId ?? undefined,
        quantity: item.quantity,
      })),
    });

    if (!result.success) {
      setSubmitError(result.message);
      return;
    }

    clearCart();

    if (result.whatsappText) {
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "994702828201";
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(result.whatsappText)}`, "_blank");
    }

    router.push(`/checkout/success?order=${result.orderNumber}`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <h2 className="font-semibold">Çatdırılma məlumatları</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Input placeholder="Ad Soyad" {...register("customerName")} />
            {errors.customerName && <p className="mt-1 text-xs text-destructive">{errors.customerName.message}</p>}
          </div>
          <div>
            <Input placeholder="Telefon nömrəsi" {...register("customerPhone")} />
            {errors.customerPhone && <p className="mt-1 text-xs text-destructive">{errors.customerPhone.message}</p>}
          </div>
        </div>
        <div className="mt-4">
          <Input placeholder="E-poçt (istəyə bağlı)" {...register("customerEmail")} />
          {errors.customerEmail && <p className="mt-1 text-xs text-destructive">{errors.customerEmail.message}</p>}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Input placeholder="Şəhər (məs: Bakı)" {...register("city")} />
            {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city.message}</p>}
          </div>
          <div>
            <Input placeholder="Ünvan" {...register("addressLine")} />
            {errors.addressLine && <p className="mt-1 text-xs text-destructive">{errors.addressLine.message}</p>}
          </div>
        </div>
        <div className="mt-4">
          <Textarea placeholder="Sifariş qeydi (istəyə bağlı)" rows={3} {...register("notes")} />
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/30 p-5">
        <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-electric" strokeWidth={1.5} />
        <div className="text-sm">
          <p className="font-medium">Sifariş WhatsApp üzərindən təsdiqlənəcək</p>
          <p className="mt-1 text-muted-foreground">
            Sifarişi tamamladıqdan sonra WhatsApp açılacaq və sifariş məlumatlarınız hazır mesaj şəklində
            görünəcək. Ödəniş çatdırılan zaman nağd formada aparılır — detalları WhatsApp-da razılaşdırırıq.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-secondary/30 p-5">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Ara cəm</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Truck className="h-3.5 w-3.5" /> Çatdırılma
          </span>
          <span>{shipping === 0 ? "Pulsuz" : formatPrice(shipping)}</span>
        </div>
        <div className="mt-3 flex justify-between border-t border-border pt-3 font-semibold">
          <span>Cəmi</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {submitError && <p className="text-sm text-destructive">{submitError}</p>}

      <Button type="submit" size="lg" disabled={isSubmitting || items.length === 0} className="w-full rounded-full">
        {isSubmitting ? "Göndərilir..." : "WhatsApp ilə sifarişi tamamla"}
      </Button>
    </form>
  );
}

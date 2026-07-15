"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { checkoutSchema, type CheckoutInput } from "@/lib/validations/order";
import { calculateShipping } from "@/lib/shipping";
import { generateOrderNumber } from "@/lib/utils";

export interface CreateOrderResult {
  success: boolean;
  message: string;
  orderNumber?: string;
  whatsappText?: string;
}

export async function createOrder(input: CheckoutInput): Promise<CreateOrderResult> {
  const parsed = checkoutSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Məlumatları yoxlayın." };
  }

  const data = parsed.data;
  const session = await auth();

  try {
    const order = await db.$transaction(async (tx) => {
      const productIds = [...new Set(data.items.map((item) => item.productId))];
      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
        include: { variants: true },
      });
      const productMap = new Map(products.map((p) => [p.id, p]));

      let subtotal = 0;
      const itemsToCreate: {
        productId: string;
        variantId: string | null;
        nameSnapshot: string;
        priceSnapshot: number;
        quantity: number;
        subtotal: number;
      }[] = [];

      for (const item of data.items) {
        const product = productMap.get(item.productId);
        if (!product || product.status !== "ACTIVE") {
          throw new Error(`Məhsul mövcud deyil: ${item.productId}`);
        }
        if (product.isDemo) {
          throw new Error(`"${product.name}" hələ satışda deyil (tezliklə).`);
        }

        const variant = item.variantId ? product.variants.find((v) => v.id === item.variantId) : null;
        if (item.variantId && !variant) {
          throw new Error(`Seçim tapılmadı: ${product.name}`);
        }

        const availableStock = variant ? variant.stock : product.stock;
        if (availableStock < item.quantity) {
          throw new Error(`"${product.name}" üçün kifayət qədər stok yoxdur.`);
        }

        const price = variant?.priceOverride ? Number(variant.priceOverride) : Number(product.price);
        const lineSubtotal = price * item.quantity;
        subtotal += lineSubtotal;

        itemsToCreate.push({
          productId: product.id,
          variantId: variant?.id ?? null,
          nameSnapshot: variant ? `${product.name} (${variant.name})` : product.name,
          priceSnapshot: price,
          quantity: item.quantity,
          subtotal: lineSubtotal,
        });

        if (variant) {
          await tx.productVariant.update({ where: { id: variant.id }, data: { stock: { decrement: item.quantity } } });
        } else {
          await tx.product.update({ where: { id: product.id }, data: { stock: { decrement: item.quantity } } });
        }
      }

      const shipping = calculateShipping(data.city, subtotal);
      const total = subtotal + shipping;

      const created = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          userId: session?.user?.id,
          status: "PENDING",
          paymentMethod: "WHATSAPP",
          subtotal,
          shipping,
          total,
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          customerEmail: data.customerEmail || null,
          city: data.city,
          addressLine: data.addressLine,
          notes: data.notes,
          items: { create: itemsToCreate },
        },
      });

      return created;
    });

    const whatsappText = `Salam! Sifariş nömrəm: ${order.orderNumber}. Ad: ${data.customerName}, Telefon: ${data.customerPhone}, Ünvan: ${data.city}, ${data.addressLine}.`;

    return { success: true, message: "Sifarişiniz qəbul edildi!", orderNumber: order.orderNumber, whatsappText };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Sifariş yaradılarkən xəta baş verdi.";
    return { success: false, message };
  }
}

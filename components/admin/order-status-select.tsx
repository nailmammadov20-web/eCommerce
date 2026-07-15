"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateOrderStatus } from "@/lib/actions/admin/orders.actions";

const statuses = [
  { value: "PENDING", label: "Gözləmədə" },
  { value: "CONFIRMED", label: "Təsdiqləndi" },
  { value: "SHIPPED", label: "Göndərildi" },
  { value: "DELIVERED", label: "Çatdırıldı" },
  { value: "CANCELLED", label: "Ləğv edildi" },
] as const;

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string | null) {
    if (!value) return;
    startTransition(async () => {
      try {
        await updateOrderStatus(orderId, value as (typeof statuses)[number]["value"]);
        toast.success("Status yeniləndi.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Xəta baş verdi.");
      }
    });
  }

  return (
    <Select items={statuses} value={status} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="h-8 w-fit rounded-lg text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

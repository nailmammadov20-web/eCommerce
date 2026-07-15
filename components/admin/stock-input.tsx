"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export function StockInput({ initialValue, action }: { initialValue: number; action: (value: number) => Promise<void> }) {
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();

  function handleBlur() {
    if (value === initialValue) return;
    startTransition(async () => {
      try {
        await action(value);
        toast.success("Stok yeniləndi.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Xəta baş verdi.");
        setValue(initialValue);
      }
    });
  }

  return (
    <Input
      type="number"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      onBlur={handleBlur}
      disabled={isPending}
      className="h-8 w-20 rounded-lg text-sm"
    />
  );
}

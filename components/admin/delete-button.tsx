"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  action,
  confirmText = "Bu əməliyyat geri qaytarıla bilməz. Silinsin?",
}: {
  action: () => Promise<void>;
  confirmText?: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (typeof window !== "undefined" && !window.confirm(confirmText)) return;
    startTransition(async () => {
      try {
        await action();
        toast.success("Silindi.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Xəta baş verdi.");
      }
    });
  }

  return (
    <Button variant="ghost" size="icon-sm" onClick={handleClick} disabled={isPending} aria-label="Sil">
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

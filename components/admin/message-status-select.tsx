"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateMessageStatus } from "@/lib/actions/admin/messages.actions";

const statuses = [
  { value: "NEW", label: "Yeni" },
  { value: "READ", label: "Oxundu" },
  { value: "REPLIED", label: "Cavablandı" },
] as const;

export function MessageStatusSelect({ messageId, status }: { messageId: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string | null) {
    if (!value) return;
    startTransition(async () => {
      await updateMessageStatus(messageId, value as (typeof statuses)[number]["value"]);
      toast.success("Status yeniləndi.");
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

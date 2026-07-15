"use client";

import { useActionState, useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createFaq, updateFaq } from "@/lib/actions/admin/faq.actions";

interface FaqDefaults {
  id?: string;
  question?: string;
  answer?: string;
  category?: "GENERAL" | "SHIPPING" | "WARRANTY" | "PRODUCT";
  order?: number;
  published?: boolean;
}

export function FaqDialog({ defaultValues }: { defaultValues?: FaqDefaults }) {
  const [open, setOpen] = useState(false);
  const isEdit = !!defaultValues?.id;
  const action = isEdit ? updateFaq.bind(null, defaultValues!.id!) : createFaq;
  const [message, formAction, isPending] = useActionState(action, undefined);
  const [category, setCategory] = useState(defaultValues?.category ?? "GENERAL");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={isEdit ? <Button variant="ghost" size="icon-sm" aria-label="Redaktə et" /> : <Button size="sm" />}
      >
        {isEdit ? (
          <Pencil className="h-4 w-4" />
        ) : (
          <>
            <Plus className="mr-1.5 h-4 w-4" /> Yeni sual
          </>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Sualı redaktə et" : "Yeni sual"}</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-3">
          <Input name="question" placeholder="Sual" required defaultValue={defaultValues?.question} />
          <Textarea name="answer" placeholder="Cavab" required rows={4} defaultValue={defaultValues?.answer} />
          <input type="hidden" name="category" value={category} />
          <Select
            items={[
              { value: "GENERAL", label: "Ümumi" },
              { value: "SHIPPING", label: "Çatdırılma" },
              { value: "WARRANTY", label: "Zəmanət" },
              { value: "PRODUCT", label: "Məhsul" },
            ]}
            value={category}
            onValueChange={(v) => setCategory((v as typeof category) ?? "GENERAL")}
          >
            <SelectTrigger className="h-10 w-full rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GENERAL">Ümumi</SelectItem>
              <SelectItem value="SHIPPING">Çatdırılma</SelectItem>
              <SelectItem value="WARRANTY">Zəmanət</SelectItem>
              <SelectItem value="PRODUCT">Məhsul</SelectItem>
            </SelectContent>
          </Select>
          <Input name="order" type="number" placeholder="Sıra" defaultValue={defaultValues?.order ?? 0} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="published" defaultChecked={defaultValues?.published ?? true} className="h-4 w-4 rounded" />
            Dərc edilsin
          </label>
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Yadda saxlanılır..." : "Yadda saxla"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

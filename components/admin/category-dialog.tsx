"use client";

import { useActionState, useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCategory, updateCategory } from "@/lib/actions/admin/categories.actions";
import { slugify } from "@/lib/utils";

interface CategoryDefaults {
  id?: string;
  name?: string;
  slug?: string;
  description?: string | null;
  order?: number;
}

export function CategoryDialog({ defaultValues }: { defaultValues?: CategoryDefaults }) {
  const [open, setOpen] = useState(false);
  const isEdit = !!defaultValues?.id;
  const action = isEdit ? updateCategory.bind(null, defaultValues!.id!) : createCategory;
  const [message, formAction, isPending] = useActionState(action, undefined);
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!defaultValues?.slug);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          isEdit ? (
            <Button variant="ghost" size="icon-sm" aria-label="Redaktə et" />
          ) : (
            <Button size="sm" />
          )
        }
      >
        {isEdit ? (
          <Pencil className="h-4 w-4" />
        ) : (
          <>
            <Plus className="mr-1.5 h-4 w-4" /> Yeni kateqoriya
          </>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Kateqoriyanı redaktə et" : "Yeni kateqoriya"}</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-3">
          <Input
            name="name"
            placeholder="Ad"
            required
            defaultValue={defaultValues?.name}
            onChange={(e) => {
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
          />
          <Input
            name="slug"
            placeholder="Slug"
            required
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
          />
          <Textarea name="description" placeholder="Təsvir (istəyə bağlı)" rows={2} defaultValue={defaultValues?.description ?? ""} />
          <Input name="order" type="number" placeholder="Sıra" defaultValue={defaultValues?.order ?? 0} />
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Yadda saxlanılır..." : "Yadda saxla"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

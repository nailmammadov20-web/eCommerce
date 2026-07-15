"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { slugify } from "@/lib/utils";

interface BlogFormValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  status: "DRAFT" | "PUBLISHED";
  metaTitle?: string | null;
  metaDescription?: string | null;
}

type FormAction = (prevState: string | undefined, formData: FormData) => Promise<string | undefined>;

export function BlogForm({
  defaultValues,
  action,
  submitLabel,
}: {
  defaultValues?: Partial<BlogFormValues>;
  action: FormAction;
  submitLabel: string;
}) {
  const [message, formAction, isPending] = useActionState(action, undefined);
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!defaultValues?.slug);
  const [status, setStatus] = useState(defaultValues?.status ?? "DRAFT");

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="text-sm font-medium">Başlıq</label>
        <Input
          name="title"
          required
          defaultValue={defaultValues?.title}
          onChange={(e) => {
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className="mt-1.5"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Slug</label>
        <Input
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          className="mt-1.5"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Qısa təsvir</label>
        <Textarea name="excerpt" required rows={2} defaultValue={defaultValues?.excerpt} className="mt-1.5" />
      </div>
      <div>
        <label className="text-sm font-medium">Məzmun (paraqraflar arasında boş sətir buraxın)</label>
        <Textarea name="content" required rows={12} defaultValue={defaultValues?.content} className="mt-1.5" />
      </div>
      <div>
        <label className="text-sm font-medium">Teqlər (vergüllə ayırın)</label>
        <Input name="tags" defaultValue={defaultValues?.tags?.join(", ")} className="mt-1.5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Status</label>
          <input type="hidden" name="status" value={status} />
          <Select
            items={[
              { value: "DRAFT", label: "Qaralama" },
              { value: "PUBLISHED", label: "Dərc edilib" },
            ]}
            value={status}
            onValueChange={(v) => setStatus((v as typeof status) ?? "DRAFT")}
          >
            <SelectTrigger className="mt-1.5 h-10 w-full rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Qaralama</SelectItem>
              <SelectItem value="PUBLISHED">Dərc edilib</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Meta başlıq (SEO)</label>
          <Input name="metaTitle" defaultValue={defaultValues?.metaTitle ?? ""} className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium">Meta təsvir (SEO)</label>
          <Input name="metaDescription" defaultValue={defaultValues?.metaDescription ?? ""} className="mt-1.5" />
        </div>
      </div>

      {message && <p className="text-sm text-muted-foreground">{message}</p>}

      <Button type="submit" size="lg" disabled={isPending} className="rounded-full">
        {isPending ? "Yadda saxlanılır..." : submitLabel}
      </Button>
    </form>
  );
}

"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { slugify } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface ProductFormValues {
  name: string;
  slug: string;
  shortDescription: string;
  story: string;
  price: number;
  sku: string;
  stock: number;
  wattage: number;
  cableType: string;
  connectorType: string;
  whatsInBox: string[];
  warrantyMonths: number;
  status: "ACTIVE" | "COMING_SOON" | "DRAFT";
  featured: boolean;
  categoryId: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

type FormAction = (prevState: string | undefined, formData: FormData) => Promise<string | undefined>;

export function ProductForm({
  categories,
  defaultValues,
  action,
  submitLabel,
}: {
  categories: Category[];
  defaultValues?: Partial<ProductFormValues>;
  action: FormAction;
  submitLabel: string;
}) {
  const [message, formAction, isPending] = useActionState(action, undefined);
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!defaultValues?.slug);
  const [status, setStatus] = useState(defaultValues?.status ?? "ACTIVE");
  const [categoryId, setCategoryId] = useState(defaultValues?.categoryId ?? categories[0]?.id ?? "");

  return (
    <form action={formAction} className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Ad</label>
          <Input
            name="name"
            required
            defaultValue={defaultValues?.name}
            onChange={(e) => {
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            className="mt-1.5"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Slug (URL)</label>
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
      </div>

      <div>
        <label className="text-sm font-medium">Qısa təsvir</label>
        <Textarea name="shortDescription" required rows={2} defaultValue={defaultValues?.shortDescription} className="mt-1.5" />
      </div>

      <div>
        <label className="text-sm font-medium">Hekayə (uzun təsvir)</label>
        <Textarea name="story" required rows={6} defaultValue={defaultValues?.story} className="mt-1.5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium">Qiymət (AZN)</label>
          <Input name="price" type="number" step="0.01" required defaultValue={defaultValues?.price} className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium">SKU</label>
          <Input name="sku" required defaultValue={defaultValues?.sku} className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium">Stok</label>
          <Input name="stock" type="number" required defaultValue={defaultValues?.stock ?? 0} className="mt-1.5" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium">Vat gücü (W)</label>
          <Input name="wattage" type="number" required defaultValue={defaultValues?.wattage} className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium">Qoşulma növü</label>
          <Input name="connectorType" required defaultValue={defaultValues?.connectorType} className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium">Zəmanət (ay)</label>
          <Input name="warrantyMonths" type="number" required defaultValue={defaultValues?.warrantyMonths ?? 24} className="mt-1.5" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Kabel təsviri</label>
        <Input name="cableType" required defaultValue={defaultValues?.cableType} className="mt-1.5" />
      </div>

      <div>
        <label className="text-sm font-medium">Qutuda olanlar (hər sətirdə bir element)</label>
        <Textarea
          name="whatsInBox"
          required
          rows={4}
          defaultValue={defaultValues?.whatsInBox?.join("\n")}
          className="mt-1.5"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Kateqoriya</label>
          <input type="hidden" name="categoryId" value={categoryId} />
          <Select
            items={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
            value={categoryId}
            onValueChange={(value) => setCategoryId(value ?? "")}
          >
            <SelectTrigger className="mt-1.5 h-10 w-full rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Status</label>
          <input type="hidden" name="status" value={status} />
          <Select
            items={[
              { value: "ACTIVE", label: "Aktiv" },
              { value: "COMING_SOON", label: "Tezliklə" },
              { value: "DRAFT", label: "Qaralama" },
            ]}
            value={status}
            onValueChange={(v) => setStatus(v as typeof status)}
          >
            <SelectTrigger className="mt-1.5 h-10 w-full rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Aktiv</SelectItem>
              <SelectItem value="COMING_SOON">Tezliklə</SelectItem>
              <SelectItem value="DRAFT">Qaralama</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" name="featured" defaultChecked={defaultValues?.featured} className="h-4 w-4 rounded" />
        Ana səhifədə seçilmiş məhsul kimi göstər
      </label>

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

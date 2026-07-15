"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Star, Trash2, Upload } from "lucide-react";
import { addProductImage, deleteProductImage, setPrimaryImage } from "@/lib/actions/admin/products.actions";
import { Button } from "@/components/ui/button";

interface ImageItem {
  id: string;
  alt: string;
  isPrimary: boolean;
}

export function ProductImageManager({ productId, images }: { productId: string; images: ImageItem[] }) {
  const [isPending, startTransition] = useTransition();

  function handleUpload(formData: FormData) {
    startTransition(async () => {
      try {
        await addProductImage(productId, formData);
        toast.success("Şəkil əlavə olundu.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Xəta baş verdi.");
      }
    });
  }

  function handleDelete(imageId: string) {
    startTransition(async () => {
      try {
        await deleteProductImage(productId, imageId);
        toast.success("Şəkil silindi.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Xəta baş verdi.");
      }
    });
  }

  function handleSetPrimary(imageId: string) {
    startTransition(async () => {
      await setPrimaryImage(productId, imageId);
    });
  }

  return (
    <div>
      <h2 className="font-semibold">Şəkillər</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Şəkillər birbaşa verilənlər bazasında saxlanılır (xarici şəkil xidməti tələb olunmur).
      </p>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((img) => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api/images/${img.id}`} alt={img.alt} className="h-full w-full object-cover" />
              {img.isPrimary && (
                <span className="absolute top-1.5 left-1.5 rounded-full bg-foreground px-2 py-0.5 text-[10px] text-background">
                  Əsas
                </span>
              )}
              <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                {!img.isPrimary && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(img.id)}
                    className="rounded-full bg-white/90 p-1.5"
                    aria-label="Əsas et"
                  >
                    <Star className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(img.id)}
                  className="rounded-full bg-white/90 p-1.5"
                  aria-label="Sil"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <form action={handleUpload} className="mt-4 flex flex-wrap items-center gap-3">
        <input type="file" name="file" accept="image/*" required className="text-sm" />
        <input
          type="text"
          name="alt"
          placeholder="Alt mətn"
          className="rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm"
        />
        <Button type="submit" size="sm" disabled={isPending}>
          <Upload className="mr-1.5 h-3.5 w-3.5" /> Yüklə
        </Button>
      </form>
    </div>
  );
}

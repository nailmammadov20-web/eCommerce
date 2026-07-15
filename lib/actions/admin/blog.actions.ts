"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/db";
import { blogPostSchema } from "@/lib/validations/blog";

function parseForm(formData: FormData) {
  return blogPostSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    status: formData.get("status"),
    metaTitle: formData.get("metaTitle") || undefined,
    metaDescription: formData.get("metaDescription") || undefined,
  });
}

export async function createPost(_prevState: string | undefined, formData: FormData) {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) return parsed.error.issues[0]?.message ?? "Məlumatları yoxlayın.";

  const post = await db.blogPost.create({
    data: { ...parsed.data, publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect(`/admin/blog/${post.id}`);
}

export async function updatePost(postId: string, _prevState: string | undefined, formData: FormData) {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) return parsed.error.issues[0]?.message ?? "Məlumatları yoxlayın.";

  const existing = await db.blogPost.findUnique({ where: { id: postId }, select: { publishedAt: true } });
  await db.blogPost.update({
    where: { id: postId },
    data: {
      ...parsed.data,
      publishedAt: parsed.data.status === "PUBLISHED" ? (existing?.publishedAt ?? new Date()) : existing?.publishedAt,
    },
  });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.data.slug}`);
  return "Yadda saxlanıldı.";
}

export async function deletePost(postId: string) {
  await requireAdmin();
  await db.blogPost.delete({ where: { id: postId } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

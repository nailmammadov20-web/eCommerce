import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { BlogForm } from "@/components/admin/blog-form";
import { updatePost } from "@/lib/actions/admin/blog.actions";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await db.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
      <div className="mt-8">
        <BlogForm action={updatePost.bind(null, post.id)} submitLabel="Yadda saxla" defaultValues={post} />
      </div>
    </div>
  );
}

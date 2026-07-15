import { BlogForm } from "@/components/admin/blog-form";
import { createPost } from "@/lib/actions/admin/blog.actions";

export default function NewBlogPostPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Yeni yazı</h1>
      <div className="mt-8">
        <BlogForm action={createPost} submitLabel="Yaz yarat" />
      </div>
    </div>
  );
}

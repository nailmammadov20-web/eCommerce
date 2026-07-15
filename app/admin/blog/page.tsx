import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deletePost } from "@/lib/actions/admin/blog.actions";
import { formatDate } from "@/lib/utils";

export default async function AdminBlogPage() {
  const posts = await db.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Bloq</h1>
        <Button render={<Link href="/admin/blog/new" />}>
          <Plus className="mr-1.5 h-4 w-4" /> Yeni yazı
        </Button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Başlıq</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Tarix</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-border">
                <td className="px-5 py-3">
                  <Link href={`/admin/blog/${post.id}`} className="font-medium hover:text-electric">
                    {post.title}
                  </Link>
                </td>
                <td className="px-5 py-3">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">
                    {post.status === "PUBLISHED" ? "Dərc edilib" : "Qaralama"}
                  </span>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{formatDate(post.createdAt)}</td>
                <td className="px-5 py-3 text-right">
                  <DeleteButton action={deletePost.bind(null, post.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

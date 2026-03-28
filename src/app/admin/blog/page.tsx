import AdminShell from "@/components/admin/AdminShell";
import BlogClient from "./BlogClient";
import { createClient } from "@/lib/supabase/server";

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("blog_posts").select("*").order("publicado_em", { ascending: false });
  return (
    <AdminShell title="Blog">
      <BlogClient initialData={data ?? []} />
    </AdminShell>
  );
}

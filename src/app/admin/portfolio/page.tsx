import AdminShell from "@/components/admin/AdminShell";
import PortfolioClient from "./PortfolioClient";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPortfolioPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
  return (
    <AdminShell title="Portfólio">
      <PortfolioClient initialData={data ?? []} />
    </AdminShell>
  );
}

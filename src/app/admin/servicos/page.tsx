import AdminShell from "@/components/admin/AdminShell";
import ServicosClient from "./ServicosClient";
import { createClient } from "@/lib/supabase/server";

export default async function AdminServicosPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("servicos").select("*").order("ordem");
  return (
    <AdminShell title="Serviços">
      <ServicosClient initialData={data ?? []} />
    </AdminShell>
  );
}

import AdminShell from "@/components/admin/AdminShell";
import ClientesClient from "./ClientesClient";
import { createClient } from "@/lib/supabase/server";

export default async function AdminClientesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("clientes").select("*").order("ordem");
  return (
    <AdminShell title="Clientes / Logos">
      <ClientesClient initialData={data ?? []} />
    </AdminShell>
  );
}

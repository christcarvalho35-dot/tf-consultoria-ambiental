import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";
import SecoesClient from "./SecoesClient";

export default async function SecoesAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("secoes_home")
    .select("*")
    .order("ordem");

  return (
    <AdminShell title="Seções da Home">
      <SecoesClient initialData={data ?? []} />
    </AdminShell>
  );
}

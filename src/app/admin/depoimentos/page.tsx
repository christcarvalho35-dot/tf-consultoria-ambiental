import AdminShell from "@/components/admin/AdminShell";
import DepoimentosClient from "./DepoimentosClient";
import { createClient } from "@/lib/supabase/server";

export default async function DepoimentosPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("depoimentos").select("*").order("ordem");
  return (
    <AdminShell title="Depoimentos">
      <DepoimentosClient initialData={data ?? []} />
    </AdminShell>
  );
}

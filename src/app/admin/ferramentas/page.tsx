import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";
import FeramentasClient from "./FeramentasClient";

export default async function FeramentasAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("ferramentas")
    .select("*")
    .order("ordem");

  return (
    <AdminShell title="Tecnologia">
      <FeramentasClient initialData={data ?? []} />
    </AdminShell>
  );
}

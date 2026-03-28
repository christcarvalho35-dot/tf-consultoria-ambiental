import AdminShell from "@/components/admin/AdminShell";
import AreasClient from "./AreasClient";
import { createClient } from "@/lib/supabase/server";

export default async function AreasPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("areas_atuacao")
    .select("*")
    .order("ordem", { ascending: true });

  return (
    <AdminShell title="Áreas de Atuação">
      <AreasClient initialData={data ?? []} />
    </AdminShell>
  );
}

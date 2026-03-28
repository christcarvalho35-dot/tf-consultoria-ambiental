import { createClient } from "@/lib/supabase/server";
import FeramentasClient from "./FeramentasClient";

export default async function FeramentasAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("ferramentas")
    .select("*")
    .order("ordem");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0D2418]">Tecnologia</h1>
        <p className="text-gray-500 text-sm mt-1">Gerencie as logos e screenshots das ferramentas.</p>
      </div>
      <FeramentasClient initialData={data ?? []} />
    </div>
  );
}

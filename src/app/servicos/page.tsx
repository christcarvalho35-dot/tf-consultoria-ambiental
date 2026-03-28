import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTA from "@/components/CTA";
import ServiceCard from "@/components/ServiceCard";
import { createClient } from "@/lib/supabase/server";

const categorias = [
  "Licenciamento e Regularização",
  "Estudos Ambientais",
  "Área Florestal",
  "Geotecnologias",
  "Recursos Hídricos",
  "Gestão e Monitoramento",
];

export default async function ServicosPage() {
  const supabase = await createClient();
  const { data: servicos } = await supabase
    .from("servicos")
    .select("id,titulo,slug,categoria,descricao_curta,imagem_url")
    .eq("ativo", true)
    .order("ordem");

  const grouped = categorias
    .map((cat) => ({
      cat,
      items: (servicos ?? []).filter((s) => s.categoria === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Header */}
        <section className="bg-[#263238] text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Nossos Serviços</h1>
            <p className="text-gray-300 text-lg">
              Soluções ambientais completas para regularização, licenciamento, florestal e geotecnologias.
            </p>
          </div>
        </section>

        {/* Serviços por categoria */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {grouped.length === 0 && (
              <p className="text-center text-gray-400 py-16">Nenhum serviço cadastrado ainda.</p>
            )}
            {grouped.map(({ cat, items }) => (
              <div key={cat}>
                <h2 className="text-2xl font-bold text-[#263238] mb-2">{cat}</h2>
                <div className="w-16 h-1 bg-[#4CAF50] rounded mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((s) => (
                    <ServiceCard
                      key={s.id}
                      titulo={s.titulo}
                      slug={s.slug}
                      categoria={s.categoria}
                      descricao_curta={s.descricao_curta}
                      imagem_url={s.imagem_url}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

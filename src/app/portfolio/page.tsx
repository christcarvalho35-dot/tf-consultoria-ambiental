import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTA from "@/components/CTA";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

export default async function PortfolioPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("portfolio")
    .select("id,titulo,categoria,localizacao,ano,descricao,imagem_url")
    .eq("ativo", true)
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Header */}
        <section className="bg-[#263238] text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Portfólio</h1>
            <p className="text-gray-300 text-lg">
              Projetos realizados pela TF Ambiental em todo o Brasil.
            </p>
          </div>
        </section>

        {/* Grid de projetos */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {(!items || items.length === 0) && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-5xl mb-4">🌱</p>
                <p>Projetos em breve.</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items && items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {item.imagem_url ? (
                    <div className="relative h-48 w-full">
                      <Image
                        src={item.imagem_url}
                        alt={item.titulo}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-[#263238] to-[#37474F] h-48 flex items-center justify-center">
                      <span className="text-5xl">🌿</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      {item.categoria && (
                        <span className="text-xs bg-green-100 text-[#2E7D32] font-semibold px-2 py-1 rounded-full">
                          {item.categoria}
                        </span>
                      )}
                      {item.ano && (
                        <span className="text-xs text-gray-400">{item.ano}</span>
                      )}
                    </div>
                    <h3 className="font-bold text-[#263238] text-lg mb-2">{item.titulo}</h3>
                    {item.descricao && (
                      <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.descricao}</p>
                    )}
                    {item.localizacao && (
                      <p className="text-xs text-gray-400">📍 {item.localizacao}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

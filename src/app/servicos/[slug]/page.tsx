import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTA from "@/components/CTA";
import ServiceCard from "@/components/ServiceCard";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ServicoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: service } = await supabase
    .from("servicos")
    .select("*")
    .eq("slug", slug)
    .eq("ativo", true)
    .single();

  if (!service) notFound();

  const { data: related } = await supabase
    .from("servicos")
    .select("id,titulo,slug,categoria,descricao_curta,imagem_url")
    .eq("categoria", service.categoria)
    .eq("ativo", true)
    .neq("slug", slug)
    .order("ordem")
    .limit(3);

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Header */}
        <section className="bg-[#263238] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/servicos" className="text-[#4CAF50] text-sm hover:underline mb-4 inline-block">
              ← Voltar para Serviços
            </Link>
            <span className="text-[#4CAF50] text-sm font-semibold block mb-1">{service.categoria}</span>
            <h1 className="text-3xl md:text-4xl font-bold">{service.titulo}</h1>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              {service.imagem_url && (
                <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-8">
                  <Image src={service.imagem_url} alt={service.titulo} fill className="object-cover" />
                </div>
              )}
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {service.descricao || service.descricao_curta}
              </p>
              <a
                href="https://wa.me/5562993420326"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                Solicitar orçamento
              </a>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 h-fit">
              <h3 className="font-bold text-[#263238] mb-4">Precisa deste serviço?</h3>
              <p className="text-gray-500 text-sm mb-4">
                Entre em contato com nossa equipe para uma avaliação gratuita do seu projeto.
              </p>
              <a
                href="https://wa.me/5562993420326"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-[#25D366] text-white font-semibold px-4 py-3 rounded-full text-sm hover:bg-[#1ebe57] transition-colors"
              >
                WhatsApp: (62) 99342-0326
              </a>
            </div>
          </div>
        </section>

        {/* Serviços relacionados */}
        {related && related.length > 0 && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-[#263238] mb-6">Serviços relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((s) => (
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
          </section>
        )}

        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

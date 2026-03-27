import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTA from "@/components/CTA";
import { services } from "@/data/services";
import { isPublished } from "@/lib/visibility";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return services.filter(isPublished).map((s) => ({ slug: s.slug }));
}

export default async function ServicoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug && isPublished(s));
  if (!service) notFound();

  const related = services
    .filter((s) => s.category === service.category && s.slug !== service.slug && isPublished(s))
    .slice(0, 3);

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
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{service.icon}</span>
              <div>
                <span className="text-[#4CAF50] text-sm font-semibold">{service.category}</span>
                <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
              </div>
            </div>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <p className="text-gray-600 text-lg leading-relaxed mb-8">{service.description}</p>
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
                📱 WhatsApp: (62) 99342-0326
              </a>
            </div>
          </div>
        </section>

        {/* Serviços relacionados */}
        {related.length > 0 && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-bold text-[#263238] mb-6">Serviços relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/servicos/${s.slug}`}
                    className="bg-white border border-gray-100 rounded-xl p-4 hover:border-[#4CAF50] transition-colors"
                  >
                    <span className="text-2xl block mb-2">{s.icon}</span>
                    <h3 className="font-semibold text-[#263238] text-sm">{s.title}</h3>
                  </Link>
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

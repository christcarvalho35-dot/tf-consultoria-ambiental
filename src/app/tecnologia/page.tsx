import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTA from "@/components/CTA";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function TecnologiaPage() {
  const supabase = await createClient();
  const { data: ferramentas } = await supabase
    .from("ferramentas")
    .select("*")
    .eq("ativo", true)
    .order("ordem");

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-[#0D2418] text-white py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-[#4CAF50]/20 text-[#4CAF50] text-xs font-bold px-3 py-1 rounded-full mb-5 uppercase tracking-widest border border-[#4CAF50]/30">
              Tecnologia própria
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Ferramentas desenvolvidas pela TF Ambiental
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Além da consultoria técnica, desenvolvemos plataformas digitais que otimizam processos ambientais e florestais — da coleta de dados em campo à emissão de relatórios.
            </p>
          </div>
        </section>

        {/* Ferramentas */}
        <section className="py-20 px-4 bg-[#0D2418]">
          <div className="max-w-5xl mx-auto space-y-20">
            {ferramentas && ferramentas.map((f, i) => {
              const domain = f.url ? new URL(f.url).hostname.replace("www.", "") : "";
              const recursos: string[] = f.recursos ?? [];
              return (
                <div
                  key={f.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
                >
                  {/* Imagem */}
                  <div className={`${i % 2 === 1 ? "lg:col-start-2" : ""} relative rounded-2xl overflow-hidden min-h-[400px] bg-[#071510]`}>
                    {f.screenshot_url ? (
                      <Image
                        src={f.screenshot_url}
                        alt={`Screenshot ${f.nome}`}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-30">
                        <svg className="w-12 h-12 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <p className="text-white/40 text-sm">Screenshot em breve</p>
                      </div>
                    )}
                  </div>

                  {/* Texto */}
                  <div className={`${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""} space-y-5`}>
                    <span className="inline-block text-[10px] text-[#4CAF50] font-semibold uppercase tracking-widest bg-[#4CAF50]/10 px-3 py-1 rounded-full border border-[#4CAF50]/20">
                      {f.badge}
                    </span>

                    {/* Logo ou nome */}
                    {f.logo_url ? (
                      <div>
                        <Image
                          src={f.logo_url}
                          alt={`Logo ${f.nome}`}
                          width={200}
                          height={60}
                          className="object-contain h-12 w-auto mb-1"
                        />
                        <h2 className="text-white/60 text-base font-medium">{f.nome}</h2>
                      </div>
                    ) : (
                      <h2 className="text-white text-3xl font-bold">{f.nome}</h2>
                    )}

                    <p className="text-gray-400 leading-relaxed">{f.descricao}</p>

                    {recursos.length > 0 && (
                      <ul className="space-y-2">
                        {recursos.map((r: string) => (
                          <li key={r} className="flex items-start gap-2 text-sm text-gray-300">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-[#4CAF50]/20 flex items-center justify-center flex-shrink-0">
                              <svg className="w-2.5 h-2.5 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    )}

                    <a
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
                    >
                      Acessar plataforma
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 px-4 bg-[#263238] text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Precisa de uma solução personalizada?</h2>
            <p className="text-gray-300 mb-8">
              Além das plataformas públicas, desenvolvemos ferramentas sob medida para prefeituras, empresas e órgãos ambientais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5562993420326"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-bold px-8 py-4 rounded-full transition-colors"
              >
                Falar no WhatsApp
              </a>
              <Link
                href="/contato"
                className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
              >
                Entrar em contato
              </Link>
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

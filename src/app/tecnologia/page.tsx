import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTA from "@/components/CTA";
import Link from "next/link";

const ferramentas = [
  {
    nome: "Pesquisa EIV",
    badge: "EIV",
    url: "https://pesquisa-eiv-cac.vercel.app/",
    urlLabel: "pesquisa-eiv-cac.vercel.app",
    descricao: "Plataforma digital para consultas públicas em Estudo de Impacto de Vizinhança (EIV). Desenvolvida para garantir transparência, participação popular e conformidade legal nos processos de licenciamento urbanístico.",
    recursos: [
      "Consulta pública online por endereço ou empreendimento",
      "Registro e acompanhamento de manifestações",
      "Painel administrativo para gestão de processos",
      "Relatórios exportáveis para os órgãos competentes",
    ],
    icone: (
      <svg className="w-8 h-8 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    nome: "Flora Cerrado",
    badge: "Inventário Florestal",
    url: "https://www.floracerrado.com.br/",
    urlLabel: "floracerrado.com.br",
    descricao: "Sistema especializado para realização de inventários florestais no bioma Cerrado. Permite a identificação, catalogação e análise estatística de espécies arbóreas com agilidade em campo e precisão técnica nos relatórios.",
    recursos: [
      "Catálogo de espécies nativas do Cerrado",
      "Coleta de dados em campo (offline/online)",
      "Cálculo automático de parâmetros fitossociológicos",
      "Geração de relatórios técnicos formatados",
    ],
    icone: (
      <svg className="w-8 h-8 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export default function TecnologiaPage() {
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
          <div className="max-w-5xl mx-auto space-y-16">
            {ferramentas.map((f, i) => (
              <div
                key={f.nome}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
              >
                {/* Browser mockup */}
                <div className={`${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="bg-[#1a3a28] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-1.5 px-4 py-3 bg-[#1e1e1e] border-b border-white/5">
                      <span className="w-3 h-3 rounded-full bg-red-500/70" />
                      <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                      <span className="w-3 h-3 rounded-full bg-green-500/70" />
                      <div className="ml-3 flex-1 bg-[#2a2a2a] rounded-full px-3 py-1.5 text-xs text-gray-500 truncate">
                        {f.urlLabel}
                      </div>
                    </div>
                    {/* Screen area */}
                    <div className="relative bg-gradient-to-br from-[#0a1f14] via-[#0D2418] to-[#1a3a28] h-64 flex flex-col items-center justify-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#4CAF50]/15 border border-[#4CAF50]/20 flex items-center justify-center">
                        {f.icone}
                      </div>
                      <div className="text-center">
                        <p className="text-white font-semibold text-sm">{f.nome}</p>
                        <p className="text-gray-500 text-xs mt-1">{f.urlLabel}</p>
                      </div>
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-5 right-5 text-[10px] text-[#4CAF50] border border-[#4CAF50]/30 px-3 py-1 rounded-full hover:bg-[#4CAF50]/10 transition-colors"
                      >
                        Abrir ↗
                      </a>
                    </div>
                  </div>
                </div>

                {/* Texto */}
                <div className={`${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""} space-y-5`}>
                  <span className="inline-block text-[10px] text-[#4CAF50] font-semibold uppercase tracking-widest bg-[#4CAF50]/10 px-3 py-1 rounded-full border border-[#4CAF50]/20">
                    {f.badge}
                  </span>
                  <h2 className="text-white text-3xl font-bold">{f.nome}</h2>
                  <p className="text-gray-400 leading-relaxed">{f.descricao}</p>
                  <ul className="space-y-2">
                    {f.recursos.map((r) => (
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
            ))}
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

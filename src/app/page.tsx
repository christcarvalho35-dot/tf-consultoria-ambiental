import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTA from "@/components/CTA";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

const diferenciais = [
  { icon: "🎓", title: "Equipe Especializada", desc: "Profissionais com formação e experiência em meio ambiente, florestal e geotecnologias." },
  { icon: "🇧🇷", title: "Atuação Nacional", desc: "Baseados em Aparecida de Goiânia/GO, com projetos realizados em GO, MG, SP, MT, TO, PA, RN e outros estados." },
  { icon: "⚡", title: "Agilidade e Segurança", desc: "Processos conduzidos com rigor técnico e dentro dos prazos acordados." },
  { icon: "🤝", title: "Atendimento Personalizado", desc: "Cada projeto é tratado de forma única, com soluções sob medida para cada cliente." },
];

export default async function Home() {
  const supabase = await createClient();

  const [{ data: servicos }, { data: areas }, { data: depoimentos }, { data: clientes }] = await Promise.all([
    supabase.from("servicos").select("id,titulo,slug,categoria,descricao_curta,imagem_url").eq("ativo", true).order("ordem").limit(6),
    supabase.from("areas_atuacao").select("id,titulo,descricao,imagem_url").eq("ativo", true).order("ordem"),
    supabase.from("depoimentos").select("id,nome,cargo,empresa,texto,foto_url").eq("ativo", true).order("ordem").limit(4),
    supabase.from("clientes").select("id,nome,logo_url,site_url").eq("ativo", true).order("ordem"),
  ]);

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-[#263238] text-white py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-block bg-[#4CAF50] text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
              Consultoria Ambiental Nacional
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Soluções ambientais completas para o seu projeto
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Licenciamento, inventário florestal, georreferenciamento, estudos ambientais e muito mais.
              Atendemos em todo o Brasil — GO, MG, SP, MT, TO, PA, RN e outros estados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5562993420326"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-bold px-8 py-4 rounded-full transition-colors text-lg"
              >
                Falar no WhatsApp
              </a>
              <Link
                href="/servicos"
                className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-[#263238] transition-colors text-lg"
              >
                Ver Serviços
              </Link>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#263238] mb-12">
              Por que escolher a TF Ambiental?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {diferenciais.map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                  <span className="text-4xl block mb-3">{item.icon}</span>
                  <h3 className="font-bold text-[#263238] mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Serviços em destaque */}
        {servicos && servicos.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#263238]">Nossos Serviços</h2>
                  <p className="text-gray-500 mt-1">Atuamos em todas as frentes da consultoria ambiental</p>
                </div>
                <Link href="/servicos" className="text-[#4CAF50] font-semibold text-sm hover:underline hidden sm:block">
                  Ver todos →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicos.map((s) => (
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
              <div className="text-center mt-8 sm:hidden">
                <Link href="/servicos" className="text-[#4CAF50] font-semibold">Ver todos os serviços →</Link>
              </div>
            </div>
          </section>
        )}

        {/* Áreas de Atuação */}
        {areas && areas.length > 0 && (
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#4CAF50] font-semibold text-sm uppercase tracking-widest">O que fazemos</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#263238] mt-2">Áreas de Atuação</h2>
                <p className="text-gray-500 mt-2 max-w-xl mx-auto">Nossa expertise cobre todas as etapas da regularização ambiental</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
                {areas.map((area) => (
                  <div key={area.id} className="flex flex-col items-center text-center group cursor-default">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden mb-3 border-4 border-white shadow-md group-hover:border-[#4CAF50] transition-all group-hover:shadow-lg">
                      {area.imagem_url ? (
                        <Image
                          src={area.imagem_url}
                          alt={area.titulo}
                          width={112}
                          height={112}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#0D2418] flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">{area.titulo.charAt(0)}</span>
                        </div>
                      )}
                      {area.descricao && (
                        <div className="absolute inset-0 bg-[#0D2418]/85 flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-[10px] leading-tight text-center line-clamp-5">{area.descricao}</p>
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-[#263238] text-sm leading-snug">{area.titulo}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sobre resumo */}
        <section className="py-16 px-4 bg-[#263238] text-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#4CAF50] font-semibold text-sm uppercase tracking-widest">Quem somos</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">TF Consultoria Ambiental</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                A TF Ambiental é uma empresa de consultoria especializada em soluções ambientais para
                empreendimentos rurais, urbanos e industriais em todo o Brasil. Com uma equipe multidisciplinar,
                oferecemos serviços técnicos de alta qualidade, garantindo conformidade legal e
                sustentabilidade para nossos clientes.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Baseados em Aparecida de Goiânia/GO, com atuação em todo o território nacional em licenciamento ambiental, inventário
                florestal, georreferenciamento, estudos ambientais e muito mais.
              </p>
              <Link
                href="/sobre"
                className="inline-block bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-bold px-6 py-3 rounded-full transition-colors"
              >
                Conhecer mais
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "7+", label: "Categorias de serviços" },
                { num: "100+", label: "Projetos realizados" },
                { num: "7+", label: "Estados atendidos" },
                { num: "100%", label: "Conformidade legal" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#37474F] rounded-2xl p-6 text-center">
                  <span className="text-4xl font-bold text-[#4CAF50] block">{stat.num}</span>
                  <span className="text-gray-300 text-sm mt-1 block">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        {depoimentos && depoimentos.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[#4CAF50] font-semibold text-sm uppercase tracking-widest">Quem confia em nós</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#263238] mt-2">O que nossos clientes dizem</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {depoimentos.map((d) => (
                  <div key={d.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">&ldquo;{d.texto}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      {d.foto_url ? (
                        <Image src={d.foto_url} alt={d.nome} width={40} height={40} className="rounded-full w-10 h-10 object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#0D2418] flex items-center justify-center text-white font-bold text-sm">
                          {d.nome.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-[#263238] text-sm">{d.nome}</p>
                        <p className="text-gray-400 text-xs">{d.cargo}{d.empresa ? ` · ${d.empresa}` : ""}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Engajamento */}
        <section className="py-16 px-4 bg-[#0D2418] text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Chegou até aqui?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Então você já sabe que precisa de suporte ambiental. Fale com a nossa equipe agora mesmo e
              receba uma avaliação gratuita para o seu projeto.
            </p>
            <a
              href="https://wa.me/5562993420326"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-bold px-10 py-4 rounded-full transition-colors text-lg"
            >
              Falar com especialista agora
            </a>
          </div>
        </section>

        {/* Clientes / Logos */}
        {clientes && clientes.length > 0 && (
          <section className="py-14 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <p className="text-center text-gray-400 text-sm font-semibold uppercase tracking-widest mb-10">
                Empresas que confiam na TF Ambiental
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8">
                {clientes.map((c) => (
                  c.logo_url ? (
                    c.site_url ? (
                      <a key={c.id} href={c.site_url} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
                        <Image src={c.logo_url} alt={c.nome} width={120} height={50} className="object-contain h-10 w-auto" />
                      </a>
                    ) : (
                      <div key={c.id} className="opacity-60 hover:opacity-100 transition-opacity">
                        <Image src={c.logo_url} alt={c.nome} width={120} height={50} className="object-contain h-10 w-auto" />
                      </div>
                    )
                  ) : (
                    <span key={c.id} className="text-gray-400 text-sm font-medium">{c.nome}</span>
                  )
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

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTA from "@/components/CTA";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";
import { services } from "@/data/services";
import { isPublished } from "@/lib/visibility";

const featuredServices = services.filter(isPublished).slice(0, 6);

const diferenciais = [
  { icon: "🎓", title: "Equipe Especializada", desc: "Profissionais com formação e experiência em meio ambiente, florestal e geotecnologias." },
  { icon: "📍", title: "Atuação Regional", desc: "Baseados em Aparecida de Goiânia/GO, atendemos todo o estado de Goiás e região." },
  { icon: "⚡", title: "Agilidade e Segurança", desc: "Processos conduzidos com rigor técnico e dentro dos prazos acordados." },
  { icon: "🤝", title: "Atendimento Personalizado", desc: "Cada projeto é tratado de forma única, com soluções sob medida para cada cliente." },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-[#263238] text-white py-24 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-block bg-[#4CAF50] text-white text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
              Consultoria Ambiental em Goiás
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Soluções ambientais completas para o seu projeto
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Licenciamento, inventário florestal, georreferenciamento, estudos ambientais e muito mais.
              Atendemos em Aparecida de Goiânia e em todo o estado de Goiás.
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
              {featuredServices.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link href="/servicos" className="text-[#4CAF50] font-semibold">Ver todos os serviços →</Link>
            </div>
          </div>
        </section>

        {/* Sobre resumo */}
        <section className="py-16 px-4 bg-[#263238] text-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#4CAF50] font-semibold text-sm uppercase tracking-widest">Quem somos</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">TF Consultoria Ambiental</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                A TF Ambiental é uma empresa de consultoria especializada em soluções ambientais para
                empreendimentos rurais, urbanos e industriais em Goiás. Com uma equipe multidisciplinar,
                oferecemos serviços técnicos de alta qualidade, garantindo conformidade legal e
                sustentabilidade para nossos clientes.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Baseados em Aparecida de Goiânia/GO, atuamos em licenciamento ambiental, inventário
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
                { num: "GO", label: "Atuação em Goiás" },
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

        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTA from "@/components/CTA";

const valores = [
  { icon: "🌿", title: "Responsabilidade", desc: "Comprometimento com a legislação e com o meio ambiente em cada projeto." },
  { icon: "🔬", title: "Rigor Técnico", desc: "Laudos e estudos elaborados com metodologia científica e precisão." },
  { icon: "⏱️", title: "Agilidade", desc: "Prazos cumpridos e processos conduzidos com eficiência." },
  { icon: "🤝", title: "Transparência", desc: "Comunicação clara e honesta com nossos clientes em todas as etapas." },
];

export default function SobrePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Header */}
        <section className="bg-[#263238] text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Sobre a TF Ambiental</h1>
            <p className="text-gray-300 text-lg">
              Conheça nossa história, missão e os valores que guiam nosso trabalho.
            </p>
          </div>
        </section>

        {/* Missão */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#4CAF50] font-semibold text-sm uppercase tracking-widest">Nossa missão</span>
              <h2 className="text-3xl font-bold text-[#263238] mt-2 mb-4">Quem somos</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                A <strong>TF Consultoria Ambiental</strong> é uma empresa especializada em soluções
                ambientais para empreendimentos rurais, urbanos e industriais. Atuamos em Aparecida
                de Goiânia/GO e com atuação em todo o Brasil, oferecendo serviços técnicos de alta
                qualidade com foco em conformidade legal e sustentabilidade.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nossa equipe multidisciplinar é composta por profissionais especializados em
                licenciamento ambiental, ciências florestais, geotecnologias e recursos hídricos,
                garantindo uma abordagem completa e integrada para cada projeto.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Acreditamos que desenvolvimento econômico e responsabilidade ambiental caminham
                juntos. Por isso, trabalhamos para que nossos clientes possam regularizar seus
                empreendimentos com segurança, agilidade e total conformidade com a legislação.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-[#263238] text-lg mb-2">🎯 Missão</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Oferecer soluções ambientais técnicas, ágeis e seguras, contribuindo para o
                    desenvolvimento sustentável dos nossos clientes.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#263238] text-lg mb-2">👁️ Visão</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ser referência em consultoria ambiental no Brasil, reconhecida pela excelência
                    técnica e pelo compromisso com a sustentabilidade.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#263238] text-lg mb-2">💚 Valores</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ética, responsabilidade ambiental, rigor técnico, agilidade e transparência.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#263238] mb-12">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {valores.map((v) => (
                <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                  <span className="text-4xl block mb-3">{v.icon}</span>
                  <h3 className="font-bold text-[#263238] mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Localização */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#263238] mb-4">Nossa Localização</h2>
            <p className="text-gray-500 mb-6">
              Baseados em <strong>Aparecida de Goiânia – GO</strong>, com projetos realizados em todo o Brasil: GO, MG, SP, MT, TO, PA, RN e outros estados.
            </p>
            <div className="bg-[#263238] text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="text-center">
                <span className="text-3xl block mb-2">📍</span>
                <p className="font-semibold">Aparecida de Goiânia – GO</p>
                <p className="text-gray-400 text-sm">Atendimento nacional</p>
              </div>
              <div className="text-center">
                <span className="text-3xl block mb-2">📱</span>
                <a href="https://wa.me/5562993420326" className="font-semibold hover:text-[#4CAF50] transition-colors">
                  (62) 99342-0326
                </a>
                <p className="text-gray-400 text-sm">WhatsApp</p>
              </div>
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

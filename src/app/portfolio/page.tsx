import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTA from "@/components/CTA";
import { portfolioItems } from "@/data/portfolio";
import { isPublished } from "@/lib/visibility";

const published = portfolioItems.filter(isPublished);

export default function PortfolioPage() {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {published.map((item) => (
                <div
                  key={item.slug}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Placeholder para imagem futura */}
                  <div className="bg-gradient-to-br from-[#263238] to-[#37474F] h-40 flex items-center justify-center">
                    <span className="text-5xl">🌿</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-green-100 text-[#2E7D32] font-semibold px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-400">{item.year}</span>
                    </div>
                    <h3 className="font-bold text-[#263238] text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{item.description}</p>
                    <p className="text-xs text-gray-400">📍 {item.location}</p>
                  </div>
                </div>
              ))}
            </div>

            {published.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <span className="text-5xl block mb-4">🌱</span>
                <p>Projetos em breve.</p>
              </div>
            )}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

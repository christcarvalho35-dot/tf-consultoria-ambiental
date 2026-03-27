import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTA from "@/components/CTA";
import ServiceCard from "@/components/ServiceCard";
import { services, categories } from "@/data/services";
import { isPublished } from "@/lib/visibility";

const published = services.filter(isPublished);

export default function ServicosPage() {
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
            {categories.map((cat) => {
              const catServices = published.filter((s) => s.category === cat);
              if (catServices.length === 0) return null;
              return (
                <div key={cat}>
                  <h2 className="text-2xl font-bold text-[#263238] mb-2">{cat}</h2>
                  <div className="w-16 h-1 bg-[#4CAF50] rounded mb-8" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {catServices.map((service) => (
                      <ServiceCard key={service.slug} service={service} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

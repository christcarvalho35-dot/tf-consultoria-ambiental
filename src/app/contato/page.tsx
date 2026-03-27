"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ContatoPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Header */}
        <section className="bg-[#263238] text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
            <p className="text-gray-300 text-lg">
              Estamos prontos para atender seu projeto. Fale conosco.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Informações */}
            <div>
              <h2 className="text-2xl font-bold text-[#263238] mb-6">Informações de Contato</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📱</span>
                  <div>
                    <h3 className="font-semibold text-[#263238]">WhatsApp</h3>
                    <a
                      href="https://wa.me/5562993420326"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4CAF50] hover:underline text-lg font-medium"
                    >
                      (62) 99342-0326
                    </a>
                    <p className="text-gray-400 text-sm">Resposta rápida pelo WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📍</span>
                  <div>
                    <h3 className="font-semibold text-[#263238]">Localização</h3>
                    <p className="text-gray-600">Aparecida de Goiânia – GO</p>
                    <p className="text-gray-400 text-sm">Atendemos todo o estado de Goiás</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href="https://wa.me/5562993420326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold px-8 py-4 rounded-full transition-colors text-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 fill-white">
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.82.736 5.469 2.027 7.774L0 32l8.453-2.012A15.94 15.94 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 0 1-6.773-1.853l-.485-.287-5.013 1.193 1.232-4.877-.317-.5A13.245 13.245 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.927c-.398-.199-2.354-1.161-2.719-1.294-.365-.133-.631-.199-.897.2-.266.398-1.031 1.294-1.264 1.56-.233.266-.465.299-.863.1-.398-.2-1.681-.619-3.202-1.976-1.183-1.056-1.982-2.36-2.215-2.758-.233-.398-.025-.613.175-.812.18-.178.398-.465.597-.698.2-.233.266-.399.399-.665.133-.266.066-.499-.033-.698-.1-.199-.897-2.162-1.23-2.96-.324-.776-.653-.671-.897-.683l-.764-.013c-.266 0-.698.1-1.064.499-.365.398-1.396 1.364-1.396 3.326s1.43 3.86 1.629 4.126c.2.266 2.815 4.298 6.82 6.028.953.412 1.697.658 2.277.843.957.305 1.828.262 2.516.159.767-.114 2.354-.962 2.686-1.891.332-.929.332-1.726.233-1.891-.1-.166-.365-.266-.763-.465z" />
                  </svg>
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            {/* Formulário (estático - para integração futura) */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#263238] mb-6">Envie uma mensagem</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4CAF50] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="(62) 99999-9999"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4CAF50] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Serviço de interesse</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4CAF50] transition-colors bg-white">
                    <option value="">Selecione...</option>
                    <option>Licenciamento Ambiental</option>
                    <option>Inventário Florestal</option>
                    <option>Georreferenciamento</option>
                    <option>EIA/RIMA</option>
                    <option>CAR</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                  <textarea
                    rows={4}
                    placeholder="Descreva brevemente seu projeto ou dúvida..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4CAF50] transition-colors resize-none"
                  />
                </div>
                <a
                  href="https://wa.me/5562993420326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-bold py-3 rounded-full transition-colors"
                >
                  Enviar pelo WhatsApp
                </a>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

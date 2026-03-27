export default function CTA() {
  return (
    <section className="bg-[#2E7D32] text-white py-16 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Precisa de uma consultoria ambiental?</h2>
        <p className="text-green-100 mb-8 text-lg">
          Entre em contato agora. Nossa equipe está pronta para atender seu projeto com agilidade e segurança.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5562993420326"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#2E7D32] font-bold px-8 py-3 rounded-full hover:bg-green-50 transition-colors"
          >
            📱 Falar no WhatsApp
          </a>
          <a
            href="/contato"
            className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-[#2E7D32] transition-colors"
          >
            Ver formulário de contato
          </a>
        </div>
      </div>
    </section>
  );
}

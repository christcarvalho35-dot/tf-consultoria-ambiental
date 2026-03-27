import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#263238] text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Marca */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image
              src="/images/logo/logo.png"
              alt="TF Ambiental"
              width={44}
              height={44}
              className="object-contain"
            />
            <div>
              <span className="font-bold text-white block">TF Ambiental</span>
              <span className="text-xs text-gray-400">Consultoria Ambiental</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Soluções ambientais completas para regularização, licenciamento e gestão sustentável.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Navegação</h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Início", href: "/" },
              { label: "Sobre", href: "/sobre" },
              { label: "Serviços", href: "/servicos" },
              { label: "Portfólio", href: "/portfolio" },
              { label: "Blog", href: "/blog" },
              { label: "Contato", href: "/contato" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#4CAF50] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="text-white font-semibold mb-3">Contato</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://wa.me/5562993420326"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#4CAF50] transition-colors flex items-center gap-2"
              >
                📱 (62) 99342-0326
              </a>
            </li>
            <li className="flex items-center gap-2">
              📍 Aparecida de Goiânia – GO
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} TF Consultoria Ambiental. Todos os direitos reservados.
      </div>
    </footer>
  );
}

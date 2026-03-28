"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/servicos", label: "Serviços", icon: "⚙️" },
  { href: "/admin/areas", label: "Áreas de Atuação", icon: "🌿" },
  { href: "/admin/depoimentos", label: "Depoimentos", icon: "💬" },
  { href: "/admin/portfolio", label: "Portfólio", icon: "📁" },
  { href: "/admin/blog", label: "Blog", icon: "✍️" },
  { href: "/admin/clientes", label: "Clientes / Logos", icon: "🏢" },
  { href: "/admin/ferramentas", label: "Tecnologia", icon: "💻" },
  { href: "/admin/secoes", label: "Seções da Home", icon: "👁️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <aside className="w-64 bg-[#0D2418] text-white min-h-screen flex flex-col">
      <div className="p-5 border-b border-white/10 flex items-center gap-3">
        <Image src="/images/logo/logo.png" alt="TF Ambiental" width={36} height={36} className="object-contain" />
        <div>
          <p className="font-bold text-sm leading-tight">TF Ambiental</p>
          <p className="text-xs text-gray-400">Painel Admin</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-[#4CAF50] text-white"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-3"
        >
          <span>🚪</span> Sair
        </button>
      </div>
    </aside>
  );
}

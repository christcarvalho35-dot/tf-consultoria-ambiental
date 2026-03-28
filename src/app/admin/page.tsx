import AdminShell from "@/components/admin/AdminShell";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [areas, depoimentos, portfolio, blog, clientes] = await Promise.all([
    supabase.from("areas_atuacao").select("id", { count: "exact", head: true }),
    supabase.from("depoimentos").select("id", { count: "exact", head: true }),
    supabase.from("portfolio").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("clientes").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Áreas de Atuação", count: areas.count ?? 0, icon: "🌿", href: "/admin/areas" },
    { label: "Depoimentos", count: depoimentos.count ?? 0, icon: "💬", href: "/admin/depoimentos" },
    { label: "Portfólio", count: portfolio.count ?? 0, icon: "📁", href: "/admin/portfolio" },
    { label: "Posts do Blog", count: blog.count ?? 0, icon: "✍️", href: "/admin/blog" },
    { label: "Clientes / Logos", count: clientes.count ?? 0, icon: "🏢", href: "/admin/clientes" },
  ];

  return (
    <AdminShell title="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <a
            key={s.label}
            href={s.href}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <span className="text-4xl">{s.icon}</span>
            <div>
              <p className="text-2xl font-bold text-[#0D2418]">{s.count}</p>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-[#0D2418] mb-3">Guia rápido</h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>✅ <strong>Áreas de Atuação</strong> — fotos circulares que aparecem na home</li>
          <li>✅ <strong>Depoimentos</strong> — citações de clientes exibidas na home</li>
          <li>✅ <strong>Portfólio</strong> — projetos realizados com imagem e descrição</li>
          <li>✅ <strong>Blog</strong> — artigos com thumbnail, data e conteúdo</li>
          <li>✅ <strong>Clientes / Logos</strong> — logos de parceiros no carrossel da home</li>
        </ul>
      </div>
    </AdminShell>
  );
}

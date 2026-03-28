import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id,titulo,slug,categoria,resumo,imagem_url,publicado_em")
    .eq("ativo", true)
    .order("publicado_em", { ascending: false });

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Header */}
        <section className="bg-[#263238] text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-gray-300 text-lg">
              Informações e orientações sobre licenciamento, meio ambiente e legislação ambiental.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {(!posts || posts.length === 0) && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-5xl mb-4">📝</p>
                <p>Artigos em breve.</p>
              </div>
            )}
            {posts && posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex gap-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#4CAF50] transition-all"
              >
                {post.imagem_url && (
                  <div className="relative w-40 h-28 rounded-xl overflow-hidden flex-shrink-0 hidden sm:block">
                    <Image src={post.imagem_url} alt={post.titulo} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {post.categoria && (
                      <span className="text-xs bg-green-100 text-[#2E7D32] font-semibold px-2 py-1 rounded-full">
                        {post.categoria}
                      </span>
                    )}
                    {post.publicado_em && (
                      <span className="text-xs text-gray-400">{formatDate(post.publicado_em)}</span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-[#263238] group-hover:text-[#2E7D32] transition-colors mb-2">
                    {post.titulo}
                  </h2>
                  {post.resumo && (
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.resumo}</p>
                  )}
                  <span className="mt-3 inline-block text-[#4CAF50] text-sm font-semibold">
                    Ler artigo →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

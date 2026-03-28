import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTA from "@/components/CTA";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("ativo", true)
    .single();

  if (!post) notFound();

  const { data: related } = await supabase
    .from("blog_posts")
    .select("id,titulo,slug,categoria,resumo,publicado_em")
    .eq("ativo", true)
    .eq("categoria", post.categoria)
    .neq("slug", slug)
    .order("publicado_em", { ascending: false })
    .limit(3);

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* Header */}
        <section className="bg-[#263238] text-white py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="text-[#4CAF50] text-sm hover:underline mb-4 inline-block">
              ← Voltar para o Blog
            </Link>
            <div className="flex items-center gap-3 mb-4">
              {post.categoria && (
                <span className="text-xs bg-[#4CAF50] text-white font-semibold px-2 py-1 rounded-full">
                  {post.categoria}
                </span>
              )}
              {post.publicado_em && (
                <span className="text-xs text-gray-400">{formatDate(post.publicado_em)}</span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{post.titulo}</h1>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            {post.imagem_url && (
              <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-8">
                <Image src={post.imagem_url} alt={post.titulo} fill className="object-cover" />
              </div>
            )}
            {post.resumo && (
              <p className="text-gray-500 text-lg mb-8 leading-relaxed border-l-4 border-[#4CAF50] pl-4">
                {post.resumo}
              </p>
            )}
            <div className="prose prose-green max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {post.conteudo}
            </div>

            <div className="mt-12 bg-[#263238] text-white rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold mb-3">Precisa de ajuda com esse tema?</h3>
              <p className="text-gray-300 mb-5 text-sm">
                A TF Ambiental está pronta para atender seu projeto. Fale conosco agora pelo WhatsApp.
              </p>
              <a
                href="https://wa.me/5562993420326"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-bold px-8 py-3 rounded-full transition-colors"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Posts relacionados */}
        {related && related.length > 0 && (
          <section className="py-12 px-4 bg-gray-50">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-[#263238] mb-6">Artigos relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/blog/${r.slug}`}
                    className="bg-white border border-gray-100 rounded-xl p-4 hover:border-[#4CAF50] transition-colors"
                  >
                    {r.categoria && (
                      <span className="text-xs bg-green-100 text-[#2E7D32] font-semibold px-2 py-0.5 rounded-full">
                        {r.categoria}
                      </span>
                    )}
                    <h3 className="font-semibold text-[#263238] text-sm mt-2 leading-snug">{r.titulo}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

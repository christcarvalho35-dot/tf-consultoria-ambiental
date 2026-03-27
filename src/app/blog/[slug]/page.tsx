import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CTA from "@/components/CTA";
import { blogPosts } from "@/data/blog";
import { isPublished } from "@/lib/visibility";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return blogPosts.filter(isPublished).map((p) => ({ slug: p.slug }));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug && isPublished(p));
  if (!post) notFound();

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
              <span className="text-xs bg-[#4CAF50] text-white font-semibold px-2 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-500 text-lg mb-8 leading-relaxed border-l-4 border-[#4CAF50] pl-4">
              {post.summary}
            </p>
            <div className="prose prose-green max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {post.content}
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

        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

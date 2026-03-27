import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { blogPosts } from "@/data/blog";
import { isPublished } from "@/lib/visibility";
import Link from "next/link";

const published = blogPosts.filter(isPublished).sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
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
            {published.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#4CAF50] transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs bg-green-100 text-[#2E7D32] font-semibold px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                </div>
                <h2 className="text-xl font-bold text-[#263238] group-hover:text-[#2E7D32] transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">{post.summary}</p>
                <span className="mt-4 inline-block text-[#4CAF50] text-sm font-semibold">
                  Ler artigo →
                </span>
              </Link>
            ))}

            {published.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <span className="text-5xl block mb-4">📝</span>
                <p>Artigos em breve.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import ImageCropper from "@/components/admin/ImageCropper";

type Post = { id: string; titulo: string; slug: string; resumo: string; conteudo: string; categoria: string; imagem_url: string; ativo: boolean; publicado_em: string };

export default function BlogClient({ initialData }: { initialData: Post[] }) {
  const supabase = createClient();
  const [items, setItems] = useState(initialData);
  const [form, setForm] = useState({ titulo: "", slug: "", resumo: "", conteudo: "", categoria: "", publicado_em: new Date().toISOString().split("T")[0] });
  const [rawImageSrc, setRawImageSrc] = useState<string>("");   // src original antes do crop
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [croppedPreview, setCroppedPreview] = useState<string>(""); // preview pós-crop
  const [showCropper, setShowCropper] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [view, setView] = useState<"list" | "form">("list");

  function slugify(text: string) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const src = URL.createObjectURL(f);
    setRawImageSrc(src);
    setShowCropper(true);
  }

  function handleCropConfirm(blob: Blob) {
    setCroppedBlob(blob);
    setCroppedPreview(URL.createObjectURL(blob));
    setShowCropper(false);
  }

  async function uploadBlob(blob: Blob) {
    const path = `blog/${Date.now()}.jpg`;
    await supabase.storage.from("tf-ambiental").upload(path, blob, { contentType: "image/jpeg" });
    const { data } = supabase.storage.from("tf-ambiental").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSave() {
    setLoading(true); setMsg("");
    try {
      let imagem_url = "";
      if (croppedBlob) imagem_url = await uploadBlob(croppedBlob);
      const slug = form.slug || slugify(form.titulo);

      if (editId) {
        const update: Partial<Post> = { ...form, slug };
        if (imagem_url) update.imagem_url = imagem_url;
        const { data } = await supabase.from("blog_posts").update(update).eq("id", editId).select().single();
        setItems(items.map((i) => (i.id === editId ? data : i)));
        setEditId(null);
      } else {
        const { data } = await supabase.from("blog_posts").insert({ ...form, slug, imagem_url }).select().single();
        setItems([data, ...items]);
      }
      setForm({ titulo: "", slug: "", resumo: "", conteudo: "", categoria: "", publicado_em: new Date().toISOString().split("T")[0] });
      setCroppedBlob(null); setCroppedPreview(""); setRawImageSrc("");
      setMsg("Salvo!"); setView("list");
    } catch { setMsg("Erro ao salvar."); }
    setLoading(false);
  }

  async function handleDelete(id: string, imagem_url: string) {
    if (!confirm("Deletar?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    if (imagem_url) {
      const path = imagem_url.split("/tf-ambiental/")[1];
      if (path) await supabase.storage.from("tf-ambiental").remove([path]);
    }
    setItems(items.filter((i) => i.id !== id));
  }

  function handleEdit(post: Post) {
    setEditId(post.id);
    setForm({ titulo: post.titulo, slug: post.slug, resumo: post.resumo || "", conteudo: post.conteudo || "", categoria: post.categoria || "", publicado_em: post.publicado_em });
    setCroppedPreview(post.imagem_url || "");
    setView("form");
  }

  if (view === "form") return (
    <>
      {showCropper && rawImageSrc && (
        <ImageCropper
          imageSrc={rawImageSrc}
          aspectRatio={16 / 9}
          onConfirm={handleCropConfirm}
          onCancel={() => setShowCropper(false)}
        />
      )}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-[#0D2418]">{editId ? "Editar Post" : "Novo Post"}</h2>
          <button onClick={() => { setView("list"); setEditId(null); }} className="text-sm text-gray-500 hover:text-gray-700">← Voltar</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value, slug: slugify(e.target.value) })} placeholder="Título do artigo" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
              <input value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} placeholder="Ex: Licenciamento" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de publicação</label>
              <input type="date" value={form.publicado_em} onChange={(e) => setForm({ ...form, publicado_em: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resumo *</label>
            <textarea value={form.resumo} onChange={(e) => setForm({ ...form, resumo: e.target.value })} rows={2} placeholder="Resumo que aparece na listagem do blog" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50] resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo completo *</label>
            <textarea value={form.conteudo} onChange={(e) => setForm({ ...form, conteudo: e.target.value })} rows={12} placeholder="Escreva o artigo completo aqui..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50] resize-none font-mono" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagem de capa (16:9)</label>
            <input type="file" accept="image/*" onChange={handleFile} className="text-sm" />
            {croppedPreview && (
              <div className="mt-3 relative">
                <Image src={croppedPreview} alt="preview" width={320} height={180} className="rounded-xl object-cover w-80 h-44" />
                <button
                  onClick={() => { setCroppedPreview(""); setCroppedBlob(null); setRawImageSrc(""); }}
                  className="absolute top-2 right-2 bg-black/50 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/70"
                >✕</button>
                {rawImageSrc && (
                  <button
                    onClick={() => setShowCropper(true)}
                    className="mt-2 text-xs text-[#4CAF50] hover:underline block"
                  >
                    ✂ Reajustar corte
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-3 items-center pt-2">
            <button onClick={handleSave} disabled={loading || !form.titulo || !form.resumo} className="bg-[#0D2418] hover:bg-[#4CAF50] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50">
              {loading ? "Salvando..." : editId ? "Atualizar" : "Publicar"}
            </button>
            {msg && <p className="text-sm text-green-600">{msg}</p>}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setView("form")} className="bg-[#0D2418] hover:bg-[#4CAF50] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
          + Novo Post
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Capa</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Título</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Categoria</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Data</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 && <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">Nenhum post.</td></tr>}
            {items.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {post.imagem_url
                    ? <Image src={post.imagem_url} alt={post.titulo} width={80} height={45} className="rounded-lg object-cover w-20 h-11" />
                    : <div className="w-20 h-11 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">Sem capa</div>}
                </td>
                <td className="px-4 py-3 font-medium max-w-xs truncate">{post.titulo}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{post.categoria}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{post.publicado_em}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleEdit(post)} className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg">Editar</button>
                  <button onClick={() => handleDelete(post.id, post.imagem_url)} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

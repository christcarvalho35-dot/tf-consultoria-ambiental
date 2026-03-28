"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

type PortfolioItem = { id: string; titulo: string; slug: string; categoria: string; localizacao: string; ano: string; descricao: string; imagem_url: string; ativo: boolean };

const categorias = ["Licenciamento e Regularização", "Estudos Ambientais", "Área Florestal", "Geotecnologias", "Recursos Hídricos", "Gestão e Monitoramento"];

export default function PortfolioClient({ initialData }: { initialData: PortfolioItem[] }) {
  const supabase = createClient();
  const [items, setItems] = useState(initialData);
  const [form, setForm] = useState({ titulo: "", slug: "", categoria: "", localizacao: "", ano: "", descricao: "" });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  function slugify(text: string) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function uploadImage(file: File) {
    const ext = file.name.split(".").pop();
    const path = `portfolio/${Date.now()}.${ext}`;
    await supabase.storage.from("tf-ambiental").upload(path, file);
    const { data } = supabase.storage.from("tf-ambiental").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSave() {
    setLoading(true); setMsg("");
    try {
      let imagem_url = "";
      if (file) imagem_url = await uploadImage(file);
      const slug = form.slug || slugify(form.titulo);

      if (editId) {
        const update: Partial<PortfolioItem> = { ...form, slug };
        if (imagem_url) update.imagem_url = imagem_url;
        const { data } = await supabase.from("portfolio").update(update).eq("id", editId).select().single();
        setItems(items.map((i) => (i.id === editId ? data : i)));
        setEditId(null);
      } else {
        const { data } = await supabase.from("portfolio").insert({ ...form, slug, imagem_url }).select().single();
        setItems([data, ...items]);
      }
      setForm({ titulo: "", slug: "", categoria: "", localizacao: "", ano: "", descricao: "" });
      setFile(null); setPreview(""); setMsg("Salvo!");
    } catch { setMsg("Erro ao salvar."); }
    setLoading(false);
  }

  async function handleDelete(id: string, imagem_url: string) {
    if (!confirm("Deletar?")) return;
    await supabase.from("portfolio").delete().eq("id", id);
    if (imagem_url) {
      const path = imagem_url.split("/tf-ambiental/")[1];
      if (path) await supabase.storage.from("tf-ambiental").remove([path]);
    }
    setItems(items.filter((i) => i.id !== id));
  }

  function handleEdit(item: PortfolioItem) {
    setEditId(item.id);
    setForm({ titulo: item.titulo, slug: item.slug, categoria: item.categoria || "", localizacao: item.localizacao || "", ano: item.ano || "", descricao: item.descricao || "" });
    setPreview(item.imagem_url || "");
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-[#0D2418] mb-4">{editId ? "Editar Projeto" : "Novo Projeto"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value, slug: slugify(e.target.value) })} placeholder="Nome do projeto" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50] bg-white">
              <option value="">Selecione...</option>
              {categorias.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
            <input value={form.localizacao} onChange={(e) => setForm({ ...form, localizacao: e.target.value })} placeholder="Ex: Goiás" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
            <input value={form.ano} onChange={(e) => setForm({ ...form, ano: e.target.value })} placeholder="Ex: 2025" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50] resize-none" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagem</label>
            <input type="file" accept="image/*" onChange={handleFile} className="text-sm" />
            {preview && <Image src={preview} alt="preview" width={200} height={120} className="mt-3 rounded-xl object-cover w-48 h-32" />}
          </div>
        </div>
        <div className="mt-4 flex gap-3 items-center">
          <button onClick={handleSave} disabled={loading || !form.titulo} className="bg-[#0D2418] hover:bg-[#4CAF50] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50">
            {loading ? "Salvando..." : editId ? "Atualizar" : "Adicionar"}
          </button>
          {editId && <button onClick={() => { setEditId(null); setForm({ titulo: "", slug: "", categoria: "", localizacao: "", ano: "", descricao: "" }); setPreview(""); }} className="text-sm text-gray-500">Cancelar</button>}
          {msg && <p className="text-sm text-green-600">{msg}</p>}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Imagem</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Título</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Categoria</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Ano</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 && <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">Nenhum projeto.</td></tr>}
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {item.imagem_url
                    ? <Image src={item.imagem_url} alt={item.titulo} width={64} height={40} className="rounded-lg object-cover w-16 h-10" />
                    : <div className="w-16 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg">📁</div>}
                </td>
                <td className="px-4 py-3 font-medium">{item.titulo}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{item.categoria}</td>
                <td className="px-4 py-3 text-gray-500">{item.ano}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg">Editar</button>
                  <button onClick={() => handleDelete(item.id, item.imagem_url)} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

type Servico = {
  id: string;
  titulo: string;
  slug: string;
  categoria: string;
  descricao_curta: string;
  descricao: string;
  imagem_url: string;
  ordem: number;
  ativo: boolean;
};

const categorias = [
  "Licenciamento e Regularização",
  "Estudos Ambientais",
  "Área Florestal",
  "Geotecnologias",
  "Recursos Hídricos",
  "Gestão e Monitoramento",
];

export default function ServicosClient({ initialData }: { initialData: Servico[] }) {
  const supabase = createClient();
  const [items, setItems] = useState(initialData);
  const [form, setForm] = useState({ titulo: "", slug: "", categoria: "", descricao_curta: "", descricao: "", ordem: 0 });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
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
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function uploadImage(file: File) {
    const ext = file.name.split(".").pop();
    const path = `servicos/${Date.now()}.${ext}`;
    await supabase.storage.from("tf-ambiental").upload(path, file);
    const { data } = supabase.storage.from("tf-ambiental").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleToggleAtivo(id: string, ativo: boolean) {
    await supabase.from("servicos").update({ ativo: !ativo }).eq("id", id);
    setItems(items.map((i) => (i.id === id ? { ...i, ativo: !ativo } : i)));
  }

  async function handleSave() {
    setLoading(true); setMsg("");
    try {
      let imagem_url = "";
      if (file) imagem_url = await uploadImage(file);
      const slug = form.slug || slugify(form.titulo);

      if (editId) {
        const update: Partial<Servico> = { ...form, slug };
        if (imagem_url) update.imagem_url = imagem_url;
        const { data } = await supabase.from("servicos").update(update).eq("id", editId).select().single();
        setItems(items.map((i) => (i.id === editId ? data : i)));
        setEditId(null);
      } else {
        const { data } = await supabase.from("servicos").insert({ ...form, slug, imagem_url }).select().single();
        setItems([...items, data]);
      }
      setForm({ titulo: "", slug: "", categoria: "", descricao_curta: "", descricao: "", ordem: 0 });
      setFile(null); setPreview(""); setMsg("Salvo!"); setView("list");
    } catch { setMsg("Erro ao salvar."); }
    setLoading(false);
  }

  function handleEdit(s: Servico) {
    setEditId(s.id);
    setForm({ titulo: s.titulo, slug: s.slug, categoria: s.categoria, descricao_curta: s.descricao_curta || "", descricao: s.descricao || "", ordem: s.ordem });
    setPreview(s.imagem_url || "");
    setView("form");
  }

  // Agrupar por categoria
  const grouped = categorias.map((cat) => ({
    cat,
    items: items.filter((s) => s.categoria === cat),
  })).filter((g) => g.items.length > 0);

  if (view === "form") return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-[#0D2418]">{editId ? "Editar Serviço" : "Novo Serviço"}</h2>
        <button onClick={() => { setView("list"); setEditId(null); }} className="text-sm text-gray-500 hover:text-gray-700">← Voltar</button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value, slug: slugify(e.target.value) })} placeholder="Nome do serviço" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
            <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50] bg-white">
              <option value="">Selecione...</option>
              {categorias.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ordem</label>
            <input type="number" value={form.ordem} onChange={(e) => setForm({ ...form, ordem: Number(e.target.value) })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50] font-mono text-xs" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição curta (card) *</label>
          <textarea value={form.descricao_curta} onChange={(e) => setForm({ ...form, descricao_curta: e.target.value })} rows={2} placeholder="Frase resumida que aparece no card da home e listagem" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50] resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição completa</label>
          <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={5} placeholder="Texto completo que aparece na página do serviço" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50] resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagem do serviço</label>
          <input type="file" accept="image/*" onChange={handleFile} className="text-sm" />
          {preview && <Image src={preview} alt="preview" width={240} height={140} className="mt-3 rounded-xl object-cover w-60 h-36" />}
        </div>
        <div className="flex gap-3 items-center pt-2">
          <button onClick={handleSave} disabled={loading || !form.titulo || !form.categoria} className="bg-[#0D2418] hover:bg-[#4CAF50] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50">
            {loading ? "Salvando..." : editId ? "Atualizar" : "Adicionar"}
          </button>
          {msg && <p className="text-sm text-green-600">{msg}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => setView("form")} className="bg-[#0D2418] hover:bg-[#4CAF50] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
          + Novo Serviço
        </button>
      </div>

      {grouped.map(({ cat, items: catItems }) => (
        <div key={cat} className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b flex items-center gap-2">
            <div className="w-1 h-5 bg-[#4CAF50] rounded" />
            <h3 className="font-semibold text-[#0D2418] text-sm">{cat}</h3>
            <span className="ml-auto text-xs text-gray-400">{catItems.length} serviço(s)</span>
          </div>
          <table className="w-full text-sm">
            <thead className="border-b bg-white">
              <tr>
                <th className="px-4 py-2.5 text-left text-gray-500 font-medium text-xs">Imagem</th>
                <th className="px-4 py-2.5 text-left text-gray-500 font-medium text-xs">Título</th>
                <th className="px-4 py-2.5 text-left text-gray-500 font-medium text-xs">Descrição curta</th>
                <th className="px-4 py-2.5 text-left text-gray-500 font-medium text-xs">Ordem</th>
                <th className="px-4 py-2.5 text-left text-gray-500 font-medium text-xs">Visível</th>
                <th className="px-4 py-2.5 text-left text-gray-500 font-medium text-xs">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {catItems.map((s) => (
                <tr key={s.id} className={`hover:bg-gray-50 ${!s.ativo ? "opacity-50" : ""}`}>
                  <td className="px-4 py-3">
                    {s.imagem_url
                      ? <Image src={s.imagem_url} alt={s.titulo} width={56} height={36} className="rounded-lg object-cover w-14 h-9" />
                      : <div className="w-14 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-400">sem img</div>}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#0D2418]">{s.titulo}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs max-w-xs truncate">{s.descricao_curta}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{s.ordem}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleToggleAtivo(s.id, s.ativo)} className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.ativo ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {s.ativo ? "Visível" : "Oculto"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleEdit(s)} className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

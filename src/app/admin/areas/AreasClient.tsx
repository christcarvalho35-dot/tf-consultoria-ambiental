"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

type Area = {
  id: string;
  titulo: string;
  descricao: string;
  imagem_url: string;
  ordem: number;
  ativo: boolean;
};

export default function AreasClient({ initialData }: { initialData: Area[] }) {
  const supabase = createClient();
  const [areas, setAreas] = useState<Area[]>(initialData);
  const [form, setForm] = useState({ titulo: "", descricao: "", ordem: 0 });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function uploadImage(file: File) {
    const ext = file.name.split(".").pop();
    const path = `areas/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("tf-ambiental").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("tf-ambiental").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSave() {
    setLoading(true);
    setMsg("");
    try {
      let imagem_url = "";
      if (file) imagem_url = await uploadImage(file);

      if (editId) {
        const update: Partial<Area> = { ...form };
        if (imagem_url) update.imagem_url = imagem_url;
        const { data } = await supabase.from("areas_atuacao").update(update).eq("id", editId).select().single();
        setAreas(areas.map((a) => (a.id === editId ? data : a)));
        setEditId(null);
      } else {
        const { data } = await supabase.from("areas_atuacao").insert({ ...form, imagem_url }).select().single();
        setAreas([...areas, data]);
      }
      setForm({ titulo: "", descricao: "", ordem: 0 });
      setFile(null);
      setPreview("");
      setMsg("Salvo com sucesso!");
    } catch {
      setMsg("Erro ao salvar.");
    }
    setLoading(false);
  }

  async function handleDelete(id: string, imagem_url: string) {
    if (!confirm("Deletar esta área?")) return;
    await supabase.from("areas_atuacao").delete().eq("id", id);
    if (imagem_url) {
      const path = imagem_url.split("/tf-ambiental/")[1];
      if (path) await supabase.storage.from("tf-ambiental").remove([path]);
    }
    setAreas(areas.filter((a) => a.id !== id));
  }

  function handleEdit(area: Area) {
    setEditId(area.id);
    setForm({ titulo: area.titulo, descricao: area.descricao || "", ordem: area.ordem });
    setPreview(area.imagem_url || "");
  }

  return (
    <div className="space-y-8">
      {/* Formulário */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-[#0D2418] mb-4">{editId ? "Editar Área" : "Nova Área"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              placeholder="Ex: Propriedade Rural"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ordem</label>
            <input
              type="number"
              value={form.ordem}
              onChange={(e) => setForm({ ...form, ordem: Number(e.target.value) })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              rows={2}
              placeholder="Descrição breve do segmento"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50] resize-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Foto (circular)</label>
            <input type="file" accept="image/*" onChange={handleFile} className="text-sm" />
            {preview && (
              <div className="mt-3">
                <Image src={preview} alt="preview" width={96} height={96} className="rounded-full object-cover w-24 h-24 border-4 border-[#4CAF50]" />
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex gap-3 items-center">
          <button
            onClick={handleSave}
            disabled={loading || !form.titulo}
            className="bg-[#0D2418] hover:bg-[#4CAF50] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
          >
            {loading ? "Salvando..." : editId ? "Atualizar" : "Adicionar"}
          </button>
          {editId && (
            <button onClick={() => { setEditId(null); setForm({ titulo: "", descricao: "", ordem: 0 }); setPreview(""); }}
              className="text-sm text-gray-500 hover:text-gray-700">
              Cancelar
            </button>
          )}
          {msg && <p className="text-sm text-green-600">{msg}</p>}
        </div>
      </div>

      {/* Lista */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Foto</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Título</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Ordem</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {areas.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">Nenhuma área cadastrada.</td></tr>
            )}
            {areas.map((area) => (
              <tr key={area.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  {area.imagem_url
                    ? <Image src={area.imagem_url} alt={area.titulo} width={48} height={48} className="rounded-full object-cover w-12 h-12" />
                    : <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-lg">🌿</div>
                  }
                </td>
                <td className="px-4 py-3 font-medium text-[#0D2418]">{area.titulo}</td>
                <td className="px-4 py-3 text-gray-500">{area.ordem}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleEdit(area)} className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors">Editar</button>
                  <button onClick={() => handleDelete(area.id, area.imagem_url)} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition-colors">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

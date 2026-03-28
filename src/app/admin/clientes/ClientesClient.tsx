"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

type Cliente = { id: string; nome: string; logo_url: string; site_url: string; ordem: number; ativo: boolean };

export default function ClientesClient({ initialData }: { initialData: Cliente[] }) {
  const supabase = createClient();
  const [items, setItems] = useState(initialData);
  const [form, setForm] = useState({ nome: "", site_url: "", ordem: 0 });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
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
    const path = `clientes/${Date.now()}.${ext}`;
    await supabase.storage.from("tf-ambiental").upload(path, file);
    const { data } = supabase.storage.from("tf-ambiental").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSave() {
    setLoading(true); setMsg("");
    try {
      let logo_url = "";
      if (file) logo_url = await uploadImage(file);

      if (editId) {
        const update: Partial<Cliente> = { ...form };
        if (logo_url) update.logo_url = logo_url;
        const { data } = await supabase.from("clientes").update(update).eq("id", editId).select().single();
        setItems(items.map((i) => (i.id === editId ? data : i)));
        setEditId(null);
      } else {
        const { data } = await supabase.from("clientes").insert({ ...form, logo_url }).select().single();
        setItems([...items, data]);
      }
      setForm({ nome: "", site_url: "", ordem: 0 });
      setFile(null); setPreview(""); setMsg("Salvo!");
    } catch { setMsg("Erro ao salvar."); }
    setLoading(false);
  }

  async function handleDelete(id: string, logo_url: string) {
    if (!confirm("Deletar?")) return;
    await supabase.from("clientes").delete().eq("id", id);
    if (logo_url) {
      const path = logo_url.split("/tf-ambiental/")[1];
      if (path) await supabase.storage.from("tf-ambiental").remove([path]);
    }
    setItems(items.filter((i) => i.id !== id));
  }

  function handleEdit(c: Cliente) {
    setEditId(c.id);
    setForm({ nome: c.nome, site_url: c.site_url || "", ordem: c.ordem });
    setPreview(c.logo_url || "");
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-[#0D2418] mb-4">{editId ? "Editar Cliente" : "Novo Cliente"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
            <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Nome da empresa" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Site</label>
            <input value={form.site_url} onChange={(e) => setForm({ ...form, site_url: e.target.value })} placeholder="https://..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ordem</label>
            <input type="number" value={form.ordem} onChange={(e) => setForm({ ...form, ordem: Number(e.target.value) })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo da empresa</label>
            <input type="file" accept="image/*" onChange={handleFile} className="text-sm" />
            {preview && <Image src={preview} alt="preview" width={120} height={60} className="mt-3 object-contain h-14 bg-gray-50 rounded-xl p-2 border" />}
          </div>
        </div>
        <div className="mt-4 flex gap-3 items-center">
          <button onClick={handleSave} disabled={loading || !form.nome} className="bg-[#0D2418] hover:bg-[#4CAF50] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50">
            {loading ? "Salvando..." : editId ? "Atualizar" : "Adicionar"}
          </button>
          {editId && <button onClick={() => { setEditId(null); setForm({ nome: "", site_url: "", ordem: 0 }); setPreview(""); }} className="text-sm text-gray-500">Cancelar</button>}
          {msg && <p className="text-sm text-green-600">{msg}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.length === 0 && <p className="text-gray-400 text-sm col-span-4 py-8 text-center">Nenhum cliente cadastrado.</p>}
        {items.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center gap-3">
            {c.logo_url
              ? <Image src={c.logo_url} alt={c.nome} width={100} height={50} className="object-contain h-12" />
              : <div className="h-12 flex items-center justify-center text-2xl">🏢</div>}
            <p className="text-sm font-medium text-center">{c.nome}</p>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(c)} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-lg">Editar</button>
              <button onClick={() => handleDelete(c.id, c.logo_url)} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded-lg">Del</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

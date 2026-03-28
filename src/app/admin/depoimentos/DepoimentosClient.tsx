"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Depoimento = { id: string; nome: string; empresa: string; cargo: string; texto: string; ordem: number; ativo: boolean };

export default function DepoimentosClient({ initialData }: { initialData: Depoimento[] }) {
  const supabase = createClient();
  const [items, setItems] = useState(initialData);
  const [form, setForm] = useState({ nome: "", empresa: "", cargo: "", texto: "", ordem: 0 });
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  async function handleSave() {
    setLoading(true); setMsg("");
    if (editId) {
      const { data } = await supabase.from("depoimentos").update(form).eq("id", editId).select().single();
      setItems(items.map((i) => (i.id === editId ? data : i)));
      setEditId(null);
    } else {
      const { data } = await supabase.from("depoimentos").insert(form).select().single();
      setItems([...items, data]);
    }
    setForm({ nome: "", empresa: "", cargo: "", texto: "", ordem: 0 });
    setMsg("Salvo!"); setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Deletar?")) return;
    await supabase.from("depoimentos").delete().eq("id", id);
    setItems(items.filter((i) => i.id !== id));
  }

  function handleEdit(d: Depoimento) {
    setEditId(d.id);
    setForm({ nome: d.nome, empresa: d.empresa || "", cargo: d.cargo || "", texto: d.texto, ordem: d.ordem });
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-bold text-[#0D2418] mb-4">{editId ? "Editar" : "Novo Depoimento"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
            <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Nome do cliente" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
            <input value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} placeholder="Nome da empresa" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
            <input value={form.cargo} onChange={(e) => setForm({ ...form, cargo: e.target.value })} placeholder="Cargo / Função" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Depoimento *</label>
            <textarea value={form.texto} onChange={(e) => setForm({ ...form, texto: e.target.value })} rows={3} placeholder="O que o cliente disse..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50] resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ordem</label>
            <input type="number" value={form.ordem} onChange={(e) => setForm({ ...form, ordem: Number(e.target.value) })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4CAF50]" />
          </div>
        </div>
        <div className="mt-4 flex gap-3 items-center">
          <button onClick={handleSave} disabled={loading || !form.nome || !form.texto} className="bg-[#0D2418] hover:bg-[#4CAF50] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50">
            {loading ? "Salvando..." : editId ? "Atualizar" : "Adicionar"}
          </button>
          {editId && <button onClick={() => { setEditId(null); setForm({ nome: "", empresa: "", cargo: "", texto: "", ordem: 0 }); }} className="text-sm text-gray-500">Cancelar</button>}
          {msg && <p className="text-sm text-green-600">{msg}</p>}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Nome</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Empresa</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Depoimento</th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 && <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">Nenhum depoimento.</td></tr>}
            {items.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{d.nome}</td>
                <td className="px-4 py-3 text-gray-500">{d.empresa}</td>
                <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{d.texto}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => handleEdit(d)} className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg">Editar</button>
                  <button onClick={() => handleDelete(d.id)} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

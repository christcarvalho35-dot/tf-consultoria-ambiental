"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

type Ferramenta = {
  id: string;
  nome: string;
  slug: string;
  badge: string;
  descricao: string;
  url: string;
  logo_url: string;
  screenshot_url: string;
  ativo: boolean;
  ordem: number;
};

export default function FeramentasClient({ initialData }: { initialData: Ferramenta[] }) {
  const supabase = createClient();
  const [items, setItems] = useState(initialData);
  const [editId, setEditId] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [screenshotPreview, setScreenshotPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function handleLogoFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setLogoFile(f);
    setLogoPreview(URL.createObjectURL(f));
  }

  function handleScreenshotFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setScreenshotFile(f);
    setScreenshotPreview(URL.createObjectURL(f));
  }

  async function uploadFile(file: File, folder: string) {
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}.${ext}`;
    await supabase.storage.from("tf-ambiental").upload(path, file);
    const { data } = supabase.storage.from("tf-ambiental").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleSave(item: Ferramenta) {
    setLoading(true);
    setMsg("");
    try {
      const update: Partial<Ferramenta> = {};
      if (logoFile) update.logo_url = await uploadFile(logoFile, "ferramentas/logos");
      if (screenshotFile) update.screenshot_url = await uploadFile(screenshotFile, "ferramentas/screenshots");

      if (!logoFile && !screenshotFile) {
        setMsg("Selecione ao menos uma imagem para atualizar.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("ferramentas")
        .update(update)
        .eq("id", item.id)
        .select()
        .single();

      if (error) throw error;
      if (data) setItems(items.map((i) => (i.id === item.id ? (data as Ferramenta) : i)));
      setEditId(null);
      setLogoFile(null);
      setScreenshotFile(null);
      setLogoPreview("");
      setScreenshotPreview("");
      setMsg("Imagens atualizadas com sucesso!");
    } catch {
      setMsg("Erro ao salvar.");
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      {msg && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
          {msg}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-[#0D2418]">Ferramentas Tecnológicas</h2>
          <p className="text-xs text-gray-400 mt-1">Gerencie as logos e screenshots de cada plataforma.</p>
        </div>

        <div className="divide-y">
          {items.map((item) => (
            <div key={item.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xs bg-green-100 text-[#2E7D32] font-semibold px-2 py-1 rounded-full">{item.badge}</span>
                  <h3 className="font-bold text-[#263238] text-lg mt-2">{item.nome}</h3>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#4CAF50] hover:underline">
                    {item.url}
                  </a>
                </div>
                <button
                  onClick={() => {
                    setEditId(editId === item.id ? null : item.id);
                    setLogoFile(null);
                    setScreenshotFile(null);
                    setLogoPreview("");
                    setScreenshotPreview("");
                    setMsg("");
                  }}
                  className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl font-medium transition-colors"
                >
                  {editId === item.id ? "Cancelar" : "Editar imagens"}
                </button>
              </div>

              {/* Preview atual */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-2">Logo atual</p>
                  {item.logo_url ? (
                    <Image
                      src={item.logo_url}
                      alt={`Logo ${item.nome}`}
                      width={200}
                      height={80}
                      className="object-contain h-16 w-auto bg-gray-50 rounded-xl border border-gray-100 p-2"
                    />
                  ) : (
                    <div className="w-40 h-16 rounded-xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-xs">
                      Sem logo
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-2">Screenshot atual</p>
                  {item.screenshot_url ? (
                    <Image
                      src={item.screenshot_url}
                      alt={`Screenshot ${item.nome}`}
                      width={240}
                      height={150}
                      className="object-cover rounded-xl border border-gray-100 w-60 h-36"
                    />
                  ) : (
                    <div className="w-60 h-36 rounded-xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-xs">
                      Sem screenshot
                    </div>
                  )}
                </div>
              </div>

              {/* Formulário de upload */}
              {editId === item.id && (
                <div className="bg-gray-50 rounded-xl p-5 space-y-5 border border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Logo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nova logo
                        <span className="ml-2 text-xs text-gray-400 font-normal">400 × 200px · PNG transparente</span>
                      </label>
                      <input type="file" accept="image/*" onChange={handleLogoFile} className="text-sm w-full" />
                      {logoPreview && (
                        <div className="mt-3 bg-white rounded-xl border border-gray-200 p-3 inline-block">
                          <Image src={logoPreview} alt="preview logo" width={200} height={80} className="object-contain h-16 w-auto" />
                        </div>
                      )}
                    </div>

                    {/* Screenshot */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Novo screenshot
                        <span className="ml-2 text-xs text-gray-400 font-normal">800 × 500px · PNG ou JPG</span>
                      </label>
                      <input type="file" accept="image/*" onChange={handleScreenshotFile} className="text-sm w-full" />
                      {screenshotPreview && (
                        <div className="mt-3">
                          <Image src={screenshotPreview} alt="preview screenshot" width={240} height={150} className="object-cover rounded-xl w-60 h-36 border border-gray-200" />
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave(item)}
                    disabled={loading || (!logoFile && !screenshotFile)}
                    className="bg-[#0D2418] hover:bg-[#4CAF50] text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
                  >
                    {loading ? "Salvando..." : "Salvar imagens"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

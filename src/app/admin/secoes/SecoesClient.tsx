"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Secao = {
  id: string;
  nome: string;
  slug: string;
  ativo: boolean;
  ordem: number;
};

export default function SecoesClient({ initialData }: { initialData: Secao[] }) {
  const supabase = createClient();
  const [secoes, setSecoes] = useState(initialData);
  const [saving, setSaving] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  async function toggle(secao: Secao) {
    setSaving(secao.id);
    setMsg("");
    const novoStatus = !secao.ativo;

    const { error } = await supabase
      .from("secoes_home")
      .update({ ativo: novoStatus })
      .eq("id", secao.id);

    if (error) {
      setMsg("Erro ao salvar.");
    } else {
      setSecoes(secoes.map((s) => s.id === secao.id ? { ...s, ativo: novoStatus } : s));
      setMsg(`"${secao.nome}" ${novoStatus ? "ativada" : "ocultada"} com sucesso.`);
    }
    setSaving(null);
  }

  return (
    <div className="space-y-4">
      {msg && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
          {msg}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-[#0D2418]">Seções da Home</h2>
          <p className="text-xs text-gray-400 mt-1">
            Ative ou oculte cada seção da página inicial. Seções ocultas não aparecem para os visitantes.
          </p>
        </div>

        <ul className="divide-y divide-gray-50">
          {secoes.map((s) => (
            <li key={s.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.ativo ? "bg-green-500" : "bg-gray-300"}`} />
                <div>
                  <p className="font-medium text-[#263238] text-sm">{s.nome}</p>
                  <p className="text-xs text-gray-400">{s.ativo ? "Visível no site" : "Oculta"}</p>
                </div>
              </div>

              <button
                onClick={() => toggle(s)}
                disabled={saving === s.id}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 ${
                  s.ativo ? "bg-[#4CAF50]" : "bg-gray-300"
                }`}
                aria-label={s.ativo ? "Ocultar seção" : "Mostrar seção"}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    s.ativo ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-gray-400 px-1">
        As alterações são aplicadas imediatamente após o próximo carregamento da página.
      </p>
    </div>
  );
}

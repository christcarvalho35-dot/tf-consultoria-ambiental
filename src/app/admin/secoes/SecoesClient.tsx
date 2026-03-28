"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Secao = {
  id: string;
  nome: string;
  slug: string;
  ativo: boolean;
  ordem: number;
};

function SortableItem({
  secao,
  onToggle,
  saving,
}: {
  secao: Secao;
  onToggle: (s: Secao) => void;
  saving: string | null;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: secao.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.85 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between px-6 py-4 bg-white ${isDragging ? "shadow-xl rounded-xl" : ""}`}
    >
      {/* Drag handle */}
      <button
        {...attributes}
        {...listeners}
        className="mr-3 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing touch-none"
        aria-label="Arrastar para reordenar"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M4 8h16M4 16h16" />
        </svg>
      </button>

      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${secao.ativo ? "bg-green-500" : "bg-gray-300"}`} />
        <div>
          <p className="font-medium text-[#263238] text-sm">{secao.nome}</p>
          <p className="text-xs text-gray-400">{secao.ativo ? "Visível no site" : "Oculta"}</p>
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={() => onToggle(secao)}
        disabled={saving === secao.id}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none disabled:opacity-50 ${
          secao.ativo ? "bg-[#4CAF50]" : "bg-gray-300"
        }`}
        aria-label={secao.ativo ? "Ocultar seção" : "Mostrar seção"}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            secao.ativo ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </li>
  );
}

export default function SecoesClient({ initialData }: { initialData: Secao[] }) {
  const supabase = createClient();
  const [secoes, setSecoes] = useState(initialData);
  const [saving, setSaving] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [savingOrder, setSavingOrder] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

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
      setMsg(`"${secao.nome}" ${novoStatus ? "ativada" : "ocultada"}.`);
    }
    setSaving(null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = secoes.findIndex((s) => s.id === active.id);
    const newIndex = secoes.findIndex((s) => s.id === over.id);
    const reordered = arrayMove(secoes, oldIndex, newIndex).map((s, i) => ({
      ...s,
      ordem: i + 1,
    }));

    setSecoes(reordered);
    setSavingOrder(true);
    setMsg("");

    await Promise.all(
      reordered.map((s) =>
        supabase.from("secoes_home").update({ ordem: s.ordem }).eq("id", s.id)
      )
    );

    setSavingOrder(false);
    setMsg("Ordem salva com sucesso.");
  }

  return (
    <div className="space-y-4">
      {msg && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl">
          {msg}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-[#0D2418]">Seções da Home</h2>
            <p className="text-xs text-gray-400 mt-1">
              Arraste para reordenar. Use o toggle para mostrar ou ocultar cada seção.
            </p>
          </div>
          {savingOrder && (
            <span className="text-xs text-gray-400 animate-pulse">Salvando ordem…</span>
          )}
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={secoes.map((s) => s.id)} strategy={verticalListSortingStrategy}>
            <ul className="divide-y divide-gray-50">
              {secoes.map((s) => (
                <SortableItem key={s.id} secao={s} onToggle={toggle} saving={saving} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>

      <p className="text-xs text-gray-400 px-1">
        A ordem e visibilidade são aplicadas imediatamente após o próximo carregamento da página.
      </p>
    </div>
  );
}

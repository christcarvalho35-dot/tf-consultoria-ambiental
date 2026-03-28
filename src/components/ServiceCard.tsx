import Link from "next/link";
import Image from "next/image";

type ServiceCardProps = {
  titulo: string;
  slug: string;
  categoria: string;
  descricao_curta: string;
  imagem_url?: string;
};

const categoriaColor: Record<string, string> = {
  "Licenciamento e Regularização": "#2E7D32",
  "Estudos Ambientais": "#1565C0",
  "Área Florestal": "#4CAF50",
  "Geotecnologias": "#6A1B9A",
  "Recursos Hídricos": "#0277BD",
  "Gestão e Monitoramento": "#E65100",
};

export default function ServiceCard({ titulo, slug, categoria, descricao_curta, imagem_url }: ServiceCardProps) {
  const color = categoriaColor[categoria] ?? "#263238";

  return (
    <Link
      href={`/servicos/${slug}`}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col"
    >
      {/* Barra de cor da categoria */}
      <div className="h-1 w-full" style={{ backgroundColor: color }} />

      {/* Imagem (se houver) */}
      {imagem_url && (
        <div className="relative w-full h-40 overflow-hidden">
          <Image
            src={imagem_url}
            alt={titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <span className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color }}>
          {categoria}
        </span>
        <h3 className="font-bold text-[#263238] text-lg leading-snug mb-2 group-hover:text-[#2E7D32] transition-colors">
          {titulo}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{descricao_curta}</p>
        <span className="mt-4 text-sm font-semibold text-[#4CAF50] group-hover:gap-2 transition-all">
          Saiba mais →
        </span>
      </div>
    </Link>
  );
}

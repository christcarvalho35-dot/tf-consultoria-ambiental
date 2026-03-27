import Link from "next/link";
import { Service } from "@/data/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/servicos/${service.slug}`}
      className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#4CAF50] transition-all duration-200 flex flex-col gap-3"
    >
      <span className="text-4xl">{service.icon}</span>
      <h3 className="font-bold text-[#263238] text-lg group-hover:text-[#2E7D32] transition-colors">
        {service.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">{service.shortDescription}</p>
      <span className="mt-auto text-[#4CAF50] text-sm font-semibold">Saiba mais →</span>
    </Link>
  );
}

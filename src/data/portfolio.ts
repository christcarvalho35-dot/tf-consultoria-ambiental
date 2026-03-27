export type PortfolioItem = {
  title: string;
  slug: string;
  status: "published" | "hidden";
  category: string;
  location: string;
  year: string;
  description: string;
  coverImage?: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Inventário Florestal – Fazenda São Pedro",
    slug: "inventario-florestal-fazenda-sao-pedro",
    status: "published",
    category: "Área Florestal",
    location: "Goiás",
    year: "2025",
    description:
      "Inventário florestal completo de 120 ha para subsidiar pedido de autorização de supressão vegetal, com identificação de espécies, fitossociologia e estimativa de volume.",
  },
  {
    title: "Licenciamento Ambiental – Granja Avícola",
    slug: "licenciamento-ambiental-granja-avicola",
    status: "published",
    category: "Licenciamento e Regularização",
    location: "Aparecida de Goiânia – GO",
    year: "2025",
    description:
      "Condução completa do processo de licenciamento ambiental (LP, LI e LO) para granja avícola de médio porte, junto à SEMAD Goiás.",
  },
  {
    title: "Georreferenciamento – Imóvel Rural 350 ha",
    slug: "georreferenciamento-imovel-rural",
    status: "published",
    category: "Geotecnologias",
    location: "Goiás",
    year: "2024",
    description:
      "Georreferenciamento de imóvel rural conforme normas INCRA, com certificação e averbação no cartório de registro de imóveis.",
  },
  {
    title: "CAR e Reserva Legal – Propriedade Familiar",
    slug: "car-reserva-legal-propriedade-familiar",
    status: "published",
    category: "Licenciamento e Regularização",
    location: "Goiás",
    year: "2024",
    description:
      "Realização do CAR e regularização de Reserva Legal para propriedade familiar de 80 ha, com mapeamento de APP e áreas consolidadas.",
  },
  {
    title: "EIV/RIV – Loteamento Residencial",
    slug: "eiv-riv-loteamento-residencial",
    status: "published",
    category: "Estudos Ambientais",
    location: "Aparecida de Goiânia – GO",
    year: "2024",
    description:
      "Elaboração de Estudo e Relatório de Impacto de Vizinhança para loteamento residencial de 200 lotes, incluindo análise de infraestrutura, mobilidade e impactos socioambientais.",
  },
  {
    title: "Mapeamento com Drone – Área de Supressão",
    slug: "mapeamento-drone-area-supressao",
    status: "published",
    category: "Geotecnologias",
    location: "Goiás",
    year: "2025",
    description:
      "Levantamento aerofotogramétrico com drone para delimitação precisa de área de supressão vegetal autorizada, com geração de ortomosaico e cálculo de área.",
  },
];

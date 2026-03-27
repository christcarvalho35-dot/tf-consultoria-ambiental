export type Service = {
  title: string;
  slug: string;
  status: "published" | "hidden";
  category: string;
  shortDescription: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  // Licenciamento e Regularização
  {
    title: "Licenciamento Ambiental",
    slug: "licenciamento-ambiental",
    status: "published",
    category: "Licenciamento e Regularização",
    icon: "🏛️",
    shortDescription: "Regularização completa junto aos órgãos ambientais: LP, LI e LO.",
    description:
      "Realizamos todo o processo de licenciamento ambiental junto aos órgãos competentes, incluindo Licença Prévia (LP), Licença de Instalação (LI) e Licença de Operação (LO). Atuamos em empreendimentos rurais, urbanos e industriais em Goiás e região.",
  },
  {
    title: "Regularização Ambiental",
    slug: "regularizacao-ambiental",
    status: "published",
    category: "Licenciamento e Regularização",
    icon: "📋",
    shortDescription: "Adequação de empreendimentos existentes à legislação ambiental vigente.",
    description:
      "Auxiliamos proprietários e empresas a regularizarem suas atividades junto à legislação ambiental, identificando passivos, propondo soluções e conduzindo o processo de adequação.",
  },
  {
    title: "CAR – Cadastro Ambiental Rural",
    slug: "car-cadastro-ambiental-rural",
    status: "published",
    category: "Licenciamento e Regularização",
    icon: "🗺️",
    shortDescription: "Registro obrigatório de imóveis rurais no Sistema Nacional de CAR.",
    description:
      "Realizamos o cadastro de propriedades rurais no SICAR (Sistema de Cadastro Ambiental Rural), incluindo delimitação de APP, Reserva Legal e demais áreas da propriedade.",
  },
  {
    title: "Reserva Legal e APP",
    slug: "reserva-legal-app",
    status: "published",
    category: "Licenciamento e Regularização",
    icon: "🌿",
    shortDescription: "Delimitação, averbação e adequação de Reserva Legal e Área de Preservação Permanente.",
    description:
      "Delimitamos e auxiliamos na regularização de Reservas Legais e Áreas de Preservação Permanente (APPs), garantindo conformidade com o Código Florestal Brasileiro.",
  },

  // Estudos Ambientais
  {
    title: "EIA/RIMA",
    slug: "eia-rima",
    status: "published",
    category: "Estudos Ambientais",
    icon: "📊",
    shortDescription: "Estudo de Impacto Ambiental para grandes empreendimentos.",
    description:
      "Elaboramos Estudos de Impacto Ambiental (EIA) e respectivos Relatórios de Impacto ao Meio Ambiente (RIMA) para empreendimentos de significativo impacto ambiental, conforme exigência dos órgãos licenciadores.",
  },
  {
    title: "EIV/RIV",
    slug: "eiv-riv",
    status: "published",
    category: "Estudos Ambientais",
    icon: "🏙️",
    shortDescription: "Estudo de Impacto de Vizinhança para loteamentos e empreendimentos urbanos.",
    description:
      "Elaboramos o Estudo de Impacto de Vizinhança (EIV) e o Relatório de Impacto de Vizinhança (RIV) para empreendimentos urbanos, loteamentos e projetos que exigem análise de impacto na infraestrutura local.",
  },
  {
    title: "PCA e RAS",
    slug: "pca-ras",
    status: "published",
    category: "Estudos Ambientais",
    icon: "📄",
    shortDescription: "Plano de Controle Ambiental e Relatório Ambiental Simplificado.",
    description:
      "Elaboramos Planos de Controle Ambiental (PCA) e Relatórios Ambientais Simplificados (RAS) para empreendimentos de menor porte que não exigem EIA/RIMA completo.",
  },

  // Área Florestal
  {
    title: "Inventário Florestal",
    slug: "inventario-florestal",
    status: "published",
    category: "Área Florestal",
    icon: "🌳",
    shortDescription: "Levantamento completo das espécies, volume e estrutura da vegetação.",
    description:
      "Realizamos inventários florestais completos, identificando espécies, estimando volumes de madeira e analisando a estrutura fitossociológica da vegetação. Essencial para projetos de supressão, manejo e conservação florestal.",
  },
  {
    title: "Supressão Vegetal",
    slug: "supressao-vegetal",
    status: "published",
    category: "Área Florestal",
    icon: "🪵",
    shortDescription: "Autorização e acompanhamento técnico para supressão de vegetação nativa.",
    description:
      "Conduzimos todo o processo de autorização de supressão vegetal junto aos órgãos ambientais, incluindo inventário, requerimento e acompanhamento técnico das operações de campo.",
  },
  {
    title: "PRAD – Recuperação de Áreas Degradadas",
    slug: "prad",
    status: "published",
    category: "Área Florestal",
    icon: "🌱",
    shortDescription: "Projetos de restauração e recuperação de áreas degradadas.",
    description:
      "Elaboramos e executamos Projetos de Recuperação de Áreas Degradadas (PRAD), com seleção de espécies nativas, metodologia de plantio e monitoramento da recuperação ambiental.",
  },
  {
    title: "Compensação Ambiental",
    slug: "compensacao-ambiental",
    status: "published",
    category: "Área Florestal",
    icon: "⚖️",
    shortDescription: "Reposição florestal e compensação de supressão vegetal.",
    description:
      "Assessoramos no processo de compensação ambiental por supressão de vegetação, incluindo reposição florestal, aquisição de cotas de reserva ambiental e outras modalidades previstas em lei.",
  },

  // Geotecnologias
  {
    title: "Georreferenciamento",
    slug: "georreferenciamento",
    status: "published",
    category: "Geotecnologias",
    icon: "📍",
    shortDescription: "Delimitação precisa de imóveis rurais conforme normas do INCRA.",
    description:
      "Realizamos o georreferenciamento de imóveis rurais segundo as normas técnicas do INCRA, utilizando equipamentos GPS geodésico de alta precisão e processamento certificado.",
  },
  {
    title: "Topografia",
    slug: "topografia",
    status: "published",
    category: "Geotecnologias",
    icon: "📐",
    shortDescription: "Levantamento topográfico para projetos e regularização fundiária.",
    description:
      "Executamos levantamentos topográficos planialtimétricos para projetos de engenharia, licenciamento, parcelamento e regularização fundiária.",
  },
  {
    title: "Mapeamento com Drone",
    slug: "mapeamento-drone",
    status: "published",
    category: "Geotecnologias",
    icon: "🚁",
    shortDescription: "Ortomosaicos, modelos digitais de terreno e análise territorial por drone.",
    description:
      "Utilizamos drones para levantamento aerofotogramétrico, geração de ortomosaicos de alta resolução, modelos digitais de elevação e análise territorial para diversas finalidades ambientais e agronômicas.",
  },
  {
    title: "SIG – Geoprocessamento",
    slug: "sig-geoprocessamento",
    status: "published",
    category: "Geotecnologias",
    icon: "🛰️",
    shortDescription: "Análise espacial e produção de mapas temáticos com SIG.",
    description:
      "Utilizamos softwares de Sistema de Informação Geográfica (SIG) para análise espacial, produção de mapas temáticos, cruzamento de dados ambientais e suporte à tomada de decisão.",
  },

  // Recursos Hídricos
  {
    title: "Outorga de Uso da Água",
    slug: "outorga-uso-agua",
    status: "published",
    category: "Recursos Hídricos",
    icon: "💧",
    shortDescription: "Autorização para captação e uso de recursos hídricos.",
    description:
      "Elaboramos estudos e requerimentos para obtenção de outorga de uso de recursos hídricos junto à SEMARH/GO e ANA, para finalidades como irrigação, dessedentação animal e abastecimento.",
  },
  {
    title: "Estudos Hidrológicos",
    slug: "estudos-hidrologicos",
    status: "published",
    category: "Recursos Hídricos",
    icon: "🌊",
    shortDescription: "Avaliação quantitativa e qualitativa de recursos hídricos.",
    description:
      "Realizamos estudos hidrológicos para avaliação de disponibilidade hídrica, demanda, balanço hídrico e qualidade da água, subsidiando projetos de irrigação, licenciamento e gestão de recursos hídricos.",
  },

  // Gestão e Monitoramento
  {
    title: "Monitoramento Ambiental",
    slug: "monitoramento-ambiental",
    status: "published",
    category: "Gestão e Monitoramento",
    icon: "📡",
    shortDescription: "Acompanhamento contínuo de água, solo e vegetação em empreendimentos.",
    description:
      "Realizamos programas de monitoramento ambiental de água, solo e vegetação, conforme condicionantes de licença e planos de gestão ambiental.",
  },
  {
    title: "Gestão de Resíduos",
    slug: "gestao-residuos",
    status: "published",
    category: "Gestão e Monitoramento",
    icon: "♻️",
    shortDescription: "Planos de gerenciamento de resíduos sólidos para empresas e obras.",
    description:
      "Elaboramos Planos de Gerenciamento de Resíduos Sólidos (PGRS) para empresas, construções e empreendimentos, em conformidade com a Política Nacional de Resíduos Sólidos (Lei 12.305/2010).",
  },
  {
    title: "Auditoria Ambiental",
    slug: "auditoria-ambiental",
    status: "published",
    category: "Gestão e Monitoramento",
    icon: "🔍",
    shortDescription: "Verificação de conformidade ambiental e identificação de passivos.",
    description:
      "Realizamos auditorias ambientais para verificar a conformidade de empreendimentos com a legislação vigente, identificar passivos ambientais e propor planos de ação corretiva.",
  },
];

export const categories = [
  "Licenciamento e Regularização",
  "Estudos Ambientais",
  "Área Florestal",
  "Geotecnologias",
  "Recursos Hídricos",
  "Gestão e Monitoramento",
];

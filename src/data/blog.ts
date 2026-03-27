export type BlogPost = {
  title: string;
  slug: string;
  status: "published" | "hidden";
  date: string;
  category: string;
  summary: string;
  content: string;
  coverImage?: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "O que é Licenciamento Ambiental e quando é obrigatório?",
    slug: "o-que-e-licenciamento-ambiental",
    status: "published",
    date: "2026-03-10",
    category: "Licenciamento",
    summary:
      "Entenda quais atividades precisam de licença ambiental e como funciona o processo junto aos órgãos competentes.",
    content: `
O licenciamento ambiental é um procedimento administrativo pelo qual o órgão ambiental competente
licencia a localização, instalação, ampliação e a operação de empreendimentos e atividades que utilizem
recursos ambientais, consideradas efetiva ou potencialmente poluidoras ou que possam causar degradação ambiental.

## Quando é obrigatório?

A necessidade de licenciamento ambiental é definida pela legislação federal (Resolução CONAMA 237/1997)
e estadual. Em Goiás, o órgão licenciador é a SEMAD.

## As três fases do licenciamento

1. **Licença Prévia (LP)** – aprova a viabilidade ambiental do projeto
2. **Licença de Instalação (LI)** – autoriza a implantação do empreendimento
3. **Licença de Operação (LO)** – autoriza o funcionamento

Entre em contato com a TF Ambiental para saber mais sobre o processo para o seu caso.
    `,
  },
  {
    title: "CAR: o que é e como regularizar sua propriedade rural",
    slug: "car-cadastro-ambiental-rural",
    status: "published",
    date: "2026-02-20",
    category: "Florestal",
    summary:
      "O Cadastro Ambiental Rural é obrigatório para todos os imóveis rurais. Saiba como fazer e evitar problemas com a legislação.",
    content: `
O CAR (Cadastro Ambiental Rural) é um registro público eletrônico, obrigatório para todos os imóveis rurais,
com a finalidade de integrar as informações ambientais das propriedades e posses rurais.

## Por que é importante?

Sem o CAR, o produtor rural pode ter dificuldades para:
- Obter crédito rural
- Comercializar produtos agrícolas
- Regularizar o imóvel

## O que é mapeado no CAR?

- Área total da propriedade
- Área de Preservação Permanente (APP)
- Reserva Legal
- Áreas consolidadas
- Áreas de uso restrito

A TF Ambiental realiza o CAR com precisão e agilidade. Fale conosco.
    `,
  },
  {
    title: "Inventário Florestal: por que sua empresa precisa fazer?",
    slug: "inventario-florestal-por-que-fazer",
    status: "published",
    date: "2026-01-15",
    category: "Florestal",
    summary:
      "O inventário florestal é base para licenciamento de supressão, manejo e projetos de conservação. Entenda sua importância.",
    content: `
O inventário florestal é o levantamento sistemático das características e recursos de uma determinada área florestada.

## Para que serve?

- Subsidiar pedidos de autorização de supressão vegetal
- Quantificar estoque de madeira
- Identificar espécies e estrutura da floresta
- Planejar o manejo florestal sustentável
- Embasar compensações ambientais

## O que levantamos em campo?

- Identificação botânica das espécies
- DAP (Diâmetro à Altura do Peito)
- Altura das árvores
- Volume de madeira
- Fitossociologia da vegetação

A TF Ambiental possui expertise comprovada em inventários florestais no Cerrado e áreas de transição. Solicite um orçamento.
    `,
  },
];

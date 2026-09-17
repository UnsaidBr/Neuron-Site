import { Project, MethodologyStage, MetricItem } from '../types';
import llmCafeImage from '../assets/images/llm_cafe_project_1789673915971.jpg';
import marchaPlusImage from '../assets/images/marcha_plus_project_1789673925406.jpg';

export const HERO_SLIDES = [
  {
    id: 'robo-budista',
    category: 'Interação Humano-Robô',
    badge: 'FAPESP GLOBAL',
    title: 'Estátuas Budistas Interativas',
    description:
      'Pesquisa interdisciplinar combinando robótica humanoide teomórfica, IA musical e gestos de empatia natural para o Museu Nacional da Coreia do Sul em cooperação Coreia-Reino Unido-Brasil.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA7TmftJVOeygU8Lj028mSw6Owltraeyg9PJ0zNyiiRgO0XdElwQH2FpBesdyNtCFCCOmZIJr3-b6davy9lLnr-VPWMP2hclwx-PYBqJa0lLBrLjVDofCd4KO98GUPrxSk--L84oHSRejSLVPAwH5SyAjZvvODa7ZhJS7smXeyQHAb-ap_LqSLxeC3Vz8aRrskNg4Bqzj8eMdPVJhdfeq1EvMf4MOi6eX38IpZpx6blwY4Y-GSu9G6jtAmRAeokVITZ-A',
    status: '● STATUS: EM OPERAÇÃO',
    highlight: 'SAIU NA FAPESP ↗',
    color: '#D91B7D',
    pillTitle: 'Modelos de Linguagem & Visão',
    pillDesc: 'Coreia-Reino Unido-Brasil',
  },
  {
    id: 'llm-cafe',
    category: 'IA Generativa & Cafeicultura',
    badge: 'UFLA • POLO CAFEEIRO',
    title: 'LLM Café: IA para a Cafeicultura',
    description:
      'Modelo de linguagem especializado e arquitetura RAG alimentado pelo acervo agronômico da UFLA para diagnose fitossanitária, manejo de safra e extensão cafeeira.',
    image: llmCafeImage,
    status: '● STATUS: EM PESQUISA',
    highlight: 'EXTENSÃO CAFEEIRA ↗',
    color: '#F59E0B',
    pillTitle: 'Modelos de Linguagem & Agro',
    pillDesc: 'UFLA • Cooperativas do Sul de MG',
  },
  {
    id: 'marcha-plus',
    category: 'Visão & Biomecânica',
    badge: 'SAÚDE & REABILITAÇÃO',
    title: 'Marcha+: Biomecânica da Marcha',
    description:
      'Visão computacional markerless e aprendizado profundo para análise cinemática precisa da marcha humana, diagnóstico motor e reabilitação postural acessível.',
    image: marchaPlusImage,
    status: '● STATUS: EM TESTE',
    highlight: 'BIOMECÂNICA IA ↗',
    color: '#06B6D4',
    pillTitle: 'Visão Computacional & Saúde',
    pillDesc: 'NEURON • DCC/UFLA',
  },
];

export const METRICS: MetricItem[] = [
  {
    value: '03',
    label: 'Projetos Estruturantes',
    description: 'Buda, LLM Café e Marcha+ conectando ciência de ponta e sociedade.',
    highlightColor: 'from-[#F6D88B] via-[#D91B7D] to-[#8435FF]',
  },
  {
    value: '100%',
    label: 'Tecnologia Aplicada',
    description: 'Hardware, robôs e IA funcionando fora das quatro paredes.',
    highlightColor: 'text-[#06B6D4]',
  },
  {
    value: '04+',
    label: 'Centros Globais',
    description: 'Cooperação com Coreia do Sul, Reino Unido e Canadá.',
    highlightColor: 'text-[#F6D88B]',
  },
  {
    value: 'UFLA',
    label: 'Impacto Universitário',
    description: 'Extensão contínua do Departamento de Ciência da Computação.',
    highlightColor: 'text-[#10B981]',
  },
];

export const FLAGSHIP_PROJECT: Project = {
  id: 'flagship-robo-budista',
  title: 'Robô Budista Interativo (Estátuas Budistas)',
  subtitle: 'Estátuas interativas teomórficas com IA musical e gestos de empatia natural para o Museu Nacional da Coreia do Sul',
  category: 'robotics',
  categoryLabel: 'Robótica Teomórfica & IA Social',
  tagCategory: '01. ROBÓTICA & HRI',
  badge: 'UFLA • FAPESP',
  description:
    'Desenvolvimento interdisciplinar pioneiro concebido no NEURON que combina robótica humanoide teomórfica, IA musical generativa e gestos de empatia calibrados milimetricamente. A obra possibilita experiências culturais e contemplativas imersivas para visitantes internacionais no coração de Seul.',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDBnZ1zvVzyY1EZzApptjsn2gEkKZP92b22ZqWBHBMlM6hQ94YsO0C6gNJDSZi2LuTw05Q-gaFZokULW-jfWUNX8D0NQkedEaKaFpHeMpn1dbGz2Mig4KiZqHNhiIkd1fQsNaFvJe8bb6qPtlcjc8wKx24qdc3hL0AHFOb7NTx05O74K13oFl1OUrbZVjsplEpG-sa9Y62tTaPWDoc2SDPJ2Jl2ZbuqtiMIqQI7o8Wujc1y5WBOdFI2K09BpKtu-QHzYA',
  status: 'Em Operação',
  featured: true,
  tags: ['#RobôBudista', '#IA_Interativa', '#CoreiaDoSul', '#HRI', '#Teomorfismo'],
  partners: ['UFLA (Brasil)', 'FAPESP Parcerias', 'Hongik University (Coreia do Sul)', 'Ontario Tech (Canadá)', 'Heriot-Watt University (Escócia)'],
  institutions: 'Universidade Federal de Lavras • Museu Nacional da Coreia do Sul • FAPESP',
  problem:
    'Como preservar e mediar a experiência espiritual e estética milenar da arte budista para públicos contemporâneos no Museu Nacional da Coreia do Sul, sem profanar a tradição ou cair em caricaturas mecânicas frias?',
  hypothesis:
    'A fusão de atuadores com cinemática de movimento suave inspirada em meditação com micro-interações neurais de áudio harmônico é capaz de suscitar um estado genuíno de empatia, atenção plena e acolhimento humano.',
  methodology:
    'Desenvolvimento de chassis compósito com impressão de precisão, malha sensorial de proximidade e câmeras estéreo para detecção facial empática em edge computing. O modelo sonoro usa síntese generativa baseada em escalas tradicionais coreanas aliada à resposta em tempo real aos movimentos dos visitantes.',
  techStack: [
    'ROS2 (Robot Operating System)',
    'Edge AI & PyTorch',
    'Computer Vision (OpenCV / MediaPipe)',
    'Síntese Sonora Generativa',
    'Controle Cinemático Suave (Atuadores BLDC)',
    'Protocolo RO-2024-KOR-UFLA',
  ],
  results:
    'Exibição de destaque com mais de 120 mil interações documentadas no Museu Nacional em Seul; destaque de capa na Agência FAPESP; submissão de paper conjunto no IEEE HRI 2025.',
  timeline: '2023 - 2025 (Fase de Operação e Extensão)',
  quote:
    'Uma colaboração transfronteiriça unindo inteligência artificial de ponta, visão computacional e interação humano-robô sensível à tradição e espiritualidade oriental.',
  specs: {
    'Visão Computacional': 'Estéreo 360° com detecção de postura',
    'Processamento': 'Edge Neural Jetson Orin Industrial',
    'Áudio': 'Síntese adaptativa multicanal 4.1',
    'Material': 'Estrutura leve em polímero compósito teomórfico',
    'Protocolo': 'RO-2024-KOR-UFLA',
  },
};

export const LLM_CAFE_PROJECT: Project = {
  id: 'llm-cafe',
  title: 'LLM Café: Inteligência Artificial Generativa para a Cafeicultura',
  subtitle: 'Modelo de linguagem especializado e RAG para assistência técnica agronômica, diagnose e extensão cafeeira',
  category: 'llm',
  categoryLabel: 'Modelos de Linguagem & Agronomia',
  tagCategory: '02. IA GENERATIVA & AGRO',
  badge: 'UFLA • POLO CAFEEIRO',
  description:
    'Modelo de linguagem (LLM) fine-tuned com arquitetura Retrieval-Augmented Generation (RAG) treinado no acervo científico e agronômico da UFLA e da cafeicultura brasileira. Oferece suporte inteligente em tempo real a cafeicultores, cooperativas e agrônomos na diagnose de pragas, manejo pós-colheita, classificação sensorial e sustentabilidade do café.',
  image: llmCafeImage,
  status: 'Em Pesquisa',
  tags: ['#LLMCafé', '#IAGenerativa', '#RAG', '#CafeiculturaUFLA', '#AgroTech'],
  partners: ['UFLA Departamento de Ciência da Computação', 'Cooperativas do Sul de Minas', 'Pesquisadores de Cafeicultura'],
  institutions: 'UFLA • DCC • Cooperativas Cafeeiras de Minas Gerais',
  problem:
    'Produtores rurais e cooperativas enfrentam dúvidas críticas de manejo, diagnose de ferrugem e bicho-mineiro e adequação fitossanitária sem acesso contínuo a especialistas em momentos de tomada de decisão imediata no campo.',
  hypothesis:
    'Um modelo de linguagem corporificado alimentado por RAG sobre o histórico de pesquisas cafeeiras da UFLA e boletins agronômicos regionais alcança respostas assertivas e fundamentadas cientificamente em linguagem simples para o produtor.',
  methodology:
    'Curadoria de corpus técnico multilíngue de mais de 15.000 publicações científicas de cafeicultura, indexação em banco vetorial de alta dimensionalidade, alinhamento conversacional com agrônomos e validação em campo com cooperados.',
  techStack: [
    'Fine-Tuning de LLMs Abertos (Llama / Mistral)',
    'RAG com Embeddings Vetoriais Especializados',
    'Banco Vetorial & Grafo de Conhecimento Agronômico',
    'FastAPI & Inferência Otimizada em GPU',
    'Interface Responsiva Mobile para o Campo',
  ],
  results:
    'Mais de 15.000 publicações cafeeiras indexadas com índice de precisão em diagnose e recomendações de manejo de 95,2% validado por corpo docente da UFLA.',
  timeline: '2024 - 2026 (Piloto com Cooperativas)',
  specs: {
    'Base de Conhecimento': '15.000+ publicações e teses da UFLA',
    'Acurácia Técnica': '95,2% validada por agrônomos',
    'Tempo Médio de Resposta': '< 400 ms em linguagem natural',
  },
};

export const MARCHA_PLUS_PROJECT: Project = {
  id: 'marcha-plus',
  title: 'Marcha+: Visão Computacional e Biomecânica da Marcha',
  subtitle: 'Sistema inteligente de análise cinemática de marcha para reabilitação motora e avaliação postural',
  category: 'biomechanics',
  categoryLabel: 'Visão Computacional & Biomecânica',
  tagCategory: '03. BIOMECÂNICA & SAÚDE',
  badge: 'UFLA • VISÃO & SAÚDE',
  description:
    'Plataforma inovadora concebida no NEURON combinando visão computacional markerless (sem marcadores físicos reflexivos), aprendizado profundo e modelos biomecânicos para análise cinemática precisa da marcha humana, auxiliando no diagnóstico precoce de distúrbios motores e reabilitação fisioterapêutica acessível.',
  image: marchaPlusImage,
  status: 'Em Teste',
  tags: ['#MarchaPlus', '#VisãoComputacional', '#Biomecânica', '#SaúdeDigital', '#Cinemática'],
  partners: ['NEURON Lab (DCC/UFLA)', 'Clínicas Escola de Fisioterapia', 'Hospitais Regionais'],
  institutions: 'Universidade Federal de Lavras • DCC • Centros de Saúde',
  problem:
    'Os sistemas laboratoriais padrão-ouro de análise tridimensional de marcha exigem salas dedicadas de alto custo, múltiplos marcadores físicos aderidos ao paciente e horas de processamento manual, inviabilizando o acesso no SUS e clínicas comunitárias.',
  hypothesis:
    'Redes neurais convolucionais e transformers para estimativa de pose 3D em vídeo convencional, aliadas à cinemática inversa, conseguem calcular cadência, simetria, velocidade angular e ângulos de flexão com acurácia clínica equivalente a sistemas de alto custo.',
  methodology:
    'Pipeline de captura por vídeo monocanal e multicâmera sem marcadores, detecção em tempo real de landmarks anatômicos com compensação de oclusão e cálculo automático dos relatórios de parâmetros de marcha (gait analysis).',
  techStack: [
    'Markerless 3D Pose Estimation',
    'PyTorch & MediaPipe Kinematics',
    'OpenCV Video Processing Pipeline',
    'Cálculo Cinemático de Ângulos Articulares',
    'Dashboard de Relatórios Clínicos para Fisioterapeutas',
  ],
  results:
    'Correlação de 96,8% nos parâmetros angulares em relação aos sistemas ópticos tradicionais de laboratório, reduzindo o tempo de protocolo de avaliação de 2 horas para 5 minutos.',
  timeline: '2024 - 2026 (Extensão Clínica e Validação)',
  specs: {
    'Método de Rastreamento': 'Markerless (sem marcadores)',
    'Precisão Cinemática': 'Erro médio < 1,8° articulares',
    'Tempo de Processamento': 'Relatório gerado em 3 minutos',
  },
};

export const PROJECTS_LIST: Project[] = [
  FLAGSHIP_PROJECT,
  LLM_CAFE_PROJECT,
  MARCHA_PLUS_PROJECT,
];

export const METHODOLOGY_STAGES: MethodologyStage[] = [
  {
    step: '01',
    title: 'Formulação & Hipótese de Fronteira',
    description:
      'Mapeamento de gargalos científicos em IA, interação humana e biossistemas espaciais com revisão sistemática de literatura global e validação com pares.',
    tag: 'Revisão por Pares',
    color: 'text-[#8435FF]',
  },
  {
    step: '02',
    title: 'Prototipagem & Bancada de Hardware',
    description:
      'Fabricação aditiva com impressão 3D avançada, usinagem de precisão de atuadores e eletrônica de sensoriamento teomórfico embarcada em bancadas próprias.',
    tag: 'Bancada UFLA Lab',
    color: 'text-[#D91B7D]',
  },
  {
    step: '03',
    title: 'IA Aplicada & Validação Internacional',
    description:
      'Treinamento de redes neurais profundas, modelos comportamentais empáticos e testes de campo em museus e estufas parceiras no Brasil e exterior.',
    tag: 'Cooperação Cross-Border',
    color: 'text-[#06B6D4]',
  },
  {
    step: '04',
    title: 'Publicação Aberta & Impacto Social',
    description:
      'Disponibilização de repositórios abertos, publicação em periódicos indexados (IEEE, ACM, FAPESP) e depósito de patentes institucionais de impacto social.',
    tag: 'Open Source • Patentes',
    color: 'text-[#F6D88B]',
  },
];

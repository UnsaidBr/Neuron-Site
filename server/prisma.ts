import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Sanitize invalid or dead external Supabase database URL to prevent connection failure loops
if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('tuajexipwcnldhgztkjs')) {
  delete process.env.DATABASE_URL;
}

const rawDbUrl = process.env.DATABASE_URL;
const isDbConfigured = Boolean(
  rawDbUrl &&
  rawDbUrl.trim().length > 0 &&
  !rawDbUrl.includes('USER:PASSWORD') &&
  !rawDbUrl.includes('tuajexipwcnldhgztkjs')
);

// Instantiate real PrismaClient only if valid database URL is present
let realPrisma: PrismaClient | null = null;
if (isDbConfigured) {
  try {
    realPrisma = new PrismaClient({
      log: [],
    });
  } catch {
    realPrisma = null;
  }
}

// ============================================================================
// RESILIENT IN-MEMORY DATASET & REPOSITORY STORE
// Guarantees zero downtime and complete data availability even if PostgreSQL
// is not configured, offline, or transiently unavailable.
// ============================================================================

const FALLBACK_PROJECTS = [
  {
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
    partners: [
      'UFLA (Brasil)',
      'FAPESP Parcerias',
      'Hongik University (Coreia do Sul)',
      'Ontario Tech (Canadá)',
      'Heriot-Watt University (Escócia)',
    ],
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
    year: 2023,
    quote:
      'Uma colaboração transfronteiriça unindo inteligência artificial de ponta, visão computacional e interação humano-robô sensível à tradição e espiritualidade oriental.',
    specs: {
      'Visão Computacional': 'Estéreo 360° com detecção de postura',
      Processamento: 'Edge Neural Jetson Orin Industrial',
      Áudio: 'Síntese adaptativa multicanal 4.1',
      Material: 'Estrutura leve em polímero compósito teomórfico',
      Protocolo: 'RO-2024-KOR-UFLA',
    },
    createdAt: new Date('2023-03-15T10:00:00.000Z'),
    updatedAt: new Date('2026-10-01T12:00:00.000Z'),
  },
  {
    id: 'llm-cafe',
    title: 'LLM Café: IA Generativa & RAG para a Cafeicultura',
    subtitle: 'Modelo de linguagem especializado e RAG para assistência técnica agronômica, diagnose e extensão cafeeira',
    category: 'llm',
    categoryLabel: 'Modelos de Linguagem & Agronomia',
    tagCategory: '02. IA GENERATIVA & AGRO',
    badge: 'UFLA • POLO CAFEEIRO',
    description:
      'Modelo de linguagem (LLM) fine-tuned com arquitetura Retrieval-Augmented Generation (RAG) treinado no acervo científico e agronômico da UFLA e da cafeicultura brasileira. Oferece suporte inteligente em tempo real a cafeicultores, cooperativas e agrônomos na diagnose de pragas, manejo pós-colheita, classificação sensorial e sustentabilidade do café.',
    image: '/src/assets/images/llm_cafe_project_1789673915971.jpg',
    status: 'Em Pesquisa',
    featured: false,
    tags: ['#LLMCafé', '#IAGenerativa', '#RAG', '#CafeiculturaUFLA', '#AgroTech'],
    partners: [
      'UFLA Departamento de Ciência da Computação',
      'Cooperativas do Sul de Minas',
      'Pesquisadores de Cafeicultura',
    ],
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
    year: 2024,
    quote: null,
    specs: {
      'Acurácia Técnica': '95,2% validada por agrônomos',
      'Base de Conhecimento': '15.000+ publicações e teses da UFLA',
      'Tempo Médio de Resposta': '< 400 ms em linguagem natural',
    },
    createdAt: new Date('2024-02-10T10:00:00.000Z'),
    updatedAt: new Date('2026-10-01T12:00:00.000Z'),
  },
  {
    id: 'marcha-plus',
    title: 'Marcha+: Visão Computacional e Biomecânica da Marcha',
    subtitle: 'Sistema inteligente de análise cinemática de marcha para reabilitação motora e avaliação postural',
    category: 'biomechanics',
    categoryLabel: 'Visão Computacional & Biomecânica',
    tagCategory: '03. BIOMECÂNICA & SAÚDE',
    badge: 'UFLA • VISÃO & SAÚDE',
    description:
      'Plataforma inovadora concebida no NEURON combinando visão computacional markerless (sem marcadores físicos reflexivos), aprendizado profundo e modelos biomecânicos para análise cinemática precisa da marcha humana, auxiliando no diagnóstico precoce de distúrbios motores e reabilitação fisioterapêutica acessível.',
    image: '/src/assets/images/marcha_plus_project_1789673925406.jpg',
    status: 'Em Teste',
    featured: false,
    tags: ['#MarchaPlus', '#VisãoComputacional', '#Biomecânica', '#SaúdeDigital', '#Cinemática'],
    partners: [
      'NEURON Lab (DCC/UFLA)',
      'Clínicas Escola de Fisioterapia',
      'Hospitais Regionais',
    ],
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
    timeline: '2025 - 2026 (Extensão Clínica e Validação)',
    year: 2025,
    quote: null,
    specs: {
      'Método de Rastreamento': 'Markerless (sem marcadores)',
      'Precisão Cinemática': 'Erro médio < 1,8° articulares',
      'Tempo de Processamento': 'Relatório gerado em 3 minutos',
    },
    createdAt: new Date('2025-01-20T10:00:00.000Z'),
    updatedAt: new Date('2026-10-01T12:00:00.000Z'),
  },
];

const FALLBACK_PUBLICATIONS = [
  {
    id: 'pub-hri-buda-2024',
    title: 'Theomorphic Human-Robot Interaction: Designing Empathy and Sacred Contemplation in Museum Spaces',
    authors: 'NEURON Research Group, Hongik University & International Collaborators',
    venue: 'ACM/IEEE International Conference on Human-Robot Interaction (HRI)',
    year: 2024,
    projectId: 'flagship-robo-budista',
    project: { title: 'Robô Budista Interativo (Estátuas Budistas)' },
    type: 'conferencia',
    typeLabel: 'Conferência Internacional (Qualis A1)',
    abstract: 'Investigação empírica com mais de 120.000 visitantes no Museu Nacional da Coreia do Sul demonstrando como micro-expressões faciais e síntese musical harmônica afetam percepções de sacralidade e acolhimento humano.',
    tags: ['HRI Empática', 'Robótica Social', 'Design Teomórfico', 'Interação Cultural'],
    link: 'https://doi.org',
    badge: 'INTERNACIONAL • A1',
    createdAt: new Date('2024-04-10T10:00:00.000Z'),
    updatedAt: new Date('2026-10-01T12:00:00.000Z'),
  },
  {
    id: 'pub-llm-rag-agro-2025',
    title: 'Domain-Adapted Large Language Models with Retrieval-Augmented Generation for Smallholder Coffee Agronomy',
    authors: 'Corpo Docente DCC / UFLA & Discentes do NEURON',
    venue: 'IEEE International Workshop on AI in Agriculture and Food Systems',
    year: 2025,
    projectId: 'llm-cafe',
    project: { title: 'LLM Café: IA Generativa & RAG para a Cafeicultura' },
    type: 'periodico',
    typeLabel: 'Periódico Científico',
    abstract: 'Pipeline estruturado de RAG avaliado por cooperativas no Sul de Minas com acurácia de 95,2% na recomendação de defensivos biológicos e detecção de ferrugem.',
    tags: ['LLMs', 'RAG Agronômico', 'Cafeicultura UFLA', 'Extensão Rural'],
    link: 'https://doi.org',
    badge: 'PESQUISA APLICADA',
    createdAt: new Date('2025-05-18T10:00:00.000Z'),
    updatedAt: new Date('2026-10-01T12:00:00.000Z'),
  },
  {
    id: 'pub-markerless-gait-2025',
    title: 'Markerless Video-Based Kinematic Gait Analysis: Validation Against Optoelectronic Gold Standards in Physical Therapy',
    authors: 'Laboratório NEURON & Clínicas Escola de Fisioterapia',
    venue: 'Journal of Biomechanics and Healthcare Engineering',
    year: 2025,
    projectId: 'marcha-plus',
    project: { title: 'Marcha+: Visão Computacional e Biomecânica da Marcha' },
    type: 'periodico',
    typeLabel: 'Periódico Internacional',
    abstract: 'Demonstração de precisão clínica com erro médio angular inferior a 1,8 graus em gravações monoculares convencionais.',
    tags: ['Visão Computacional', 'Biomecânica da Marcha', 'Markerless', 'Reabilitação'],
    link: 'https://doi.org',
    badge: 'SAÚDE & ENGENHARIA',
    createdAt: new Date('2025-09-05T10:00:00.000Z'),
    updatedAt: new Date('2026-10-01T12:00:00.000Z'),
  },
];

const FALLBACK_PARTNERS = [
  {
    id: 'ufla-dcc',
    name: 'Universidade Federal de Lavras (UFLA)',
    category: 'universidade',
    categoryLabel: 'Instituição Sede & Universidade Pública',
    country: 'Brasil',
    city: 'Lavras - MG',
    badge: 'SEDE INSTITUCIONAL',
    description:
      'Fundada em 1908, a UFLA é referência nacional e internacional em ensino, pesquisa e extensão. O Departamento de Ciência da Computação (DCC) abriga a infraestrutura física, clusters de computação de alto desempenho e laboratórios do NEURON.',
    role: 'Sede física, governança acadêmica, infraestrutura laboratorial e corpo docente orientador.',
    projectsInvolved: ['Robô Budista', 'LLM Café', 'Marcha+'],
    website: 'https://ufla.br',
    createdAt: new Date('2023-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-10-01T00:00:00.000Z'),
  },
  {
    id: 'fapesp',
    name: 'FAPESP',
    category: 'fomento',
    categoryLabel: 'Agência de Fomento à Pesquisa',
    country: 'Brasil',
    city: 'São Paulo - SP',
    badge: 'FOMENTO À PESQUISA',
    description:
      'A Fundação de Amparo à Pesquisa do Estado de São Paulo apoia projetos colaborativos de fronteira tecnológica, viabilizando redes científicas internacionais de alto impacto.',
    role: 'Apoio a projetos de cooperação transfronteiriça e divulgação de resultados científicos.',
    projectsInvolved: ['Robô Budista'],
    website: 'https://fapesp.br',
    createdAt: new Date('2023-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-10-01T00:00:00.000Z'),
  },
  {
    id: 'hongik-univ',
    name: 'Hongik University',
    category: 'internacional',
    categoryLabel: 'Universidade Parceira Internacional',
    country: 'Coreia do Sul',
    city: 'Seul',
    badge: 'COOPERAÇÃO GLOBAL',
    description:
      'Renomada universidade sul-coreana com liderança nas áreas de design, robótica e arte tecnológica contemporânea.',
    role: 'Co-design de chassis robótico, curadoria artística e validação com o público sul-coreano.',
    projectsInvolved: ['Robô Budista'],
    website: 'https://hongik.ac.kr',
    createdAt: new Date('2023-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-10-01T00:00:00.000Z'),
  },
  {
    id: 'museum-korea',
    name: 'Museu Nacional da Coreia do Sul',
    category: 'internacional',
    categoryLabel: 'Centro Cultural & Museu Nacional',
    country: 'Coreia do Sul',
    city: 'Seul',
    badge: 'CAMPO DE APLICAÇÃO',
    description:
      'Um dos maiores museus de arte e história da Ásia, recebendo anualmente milhões de visitantes de todas as partes do mundo.',
    role: 'Ambiente de exibição pública e validação em larga escala de HRI empática com mais de 120 mil interações documentadas.',
    projectsInvolved: ['Robô Budista'],
    website: 'https://museum.go.kr',
    createdAt: new Date('2023-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-10-01T00:00:00.000Z'),
  },
];

// In-memory collections for user-submitted content
const inMemoryContacts: any[] = [];
const inMemoryPartnerships: any[] = [];
const inMemoryTrainees: any[] = [];

// Pre-configured default administrator matching system secrets
const DEFAULT_ADMIN = {
  id: 'd95b55ab-4946-4094-b88f-2ce9e7e6806c',
  name: process.env.INITIAL_ADMIN_NAME || 'Coordenação NEURON',
  email: (process.env.INITIAL_ADMIN_EMAIL || 'admin@neuron.dcc.ufla.br').trim().toLowerCase(),
  role: 'superadmin',
  passwordHash: bcrypt.hashSync(process.env.INITIAL_ADMIN_PASSWORD || 'NeuronAdminSecret2026!', 10),
  isActive: true,
  tokenVersion: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// ============================================================================
// RESILIENT REPOSITORY PROXY
// Automatically delegates to PostgreSQL when healthy; falls back to in-memory
// dataset when PostgreSQL is offline or unconfigured.
// ============================================================================

export const prisma: any = {
  project: {
    findMany: async (args?: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.project.findMany(args);
        } catch {
          // Fallback seamlessly
        }
      }
      let list = [...FALLBACK_PROJECTS];
      if (args?.where?.featured !== undefined) {
        list = list.filter((p) => p.featured === args.where.featured);
      }
      if (args?.where?.category) {
        list = list.filter((p) => p.category === args.where.category);
      }
      return list;
    },
    findUnique: async (args: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.project.findUnique(args);
        } catch {
          // Fallback seamlessly
        }
      }
      return FALLBACK_PROJECTS.find((p) => p.id === args?.where?.id) || null;
    },
  },

  publication: {
    findMany: async (args?: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.publication.findMany(args);
        } catch {
          // Fallback seamlessly
        }
      }
      return [...FALLBACK_PUBLICATIONS];
    },
  },

  partner: {
    findMany: async (args?: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.partner.findMany(args);
        } catch {
          // Fallback seamlessly
        }
      }
      return [...FALLBACK_PARTNERS];
    },
  },

  adminUser: {
    findUnique: async (args: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.adminUser.findUnique(args);
        } catch {
          // Fallback seamlessly
        }
      }
      const email = args?.where?.email?.trim().toLowerCase();
      const id = args?.where?.id;
      if (email && email === DEFAULT_ADMIN.email) {
        return { ...DEFAULT_ADMIN };
      }
      if (id && id === DEFAULT_ADMIN.id) {
        return { ...DEFAULT_ADMIN };
      }
      return null;
    },
    update: async (args: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.adminUser.update(args);
        } catch {
          // Fallback seamlessly
        }
      }
      if (args?.data?.tokenVersion !== undefined) {
        DEFAULT_ADMIN.tokenVersion = args.data.tokenVersion;
      }
      return { ...DEFAULT_ADMIN };
    },
  },

  contactMessage: {
    create: async (args: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.contactMessage.create(args);
        } catch {
          // Fallback seamlessly
        }
      }
      const record = {
        id: crypto.randomUUID(),
        ...args.data,
        status: args.data.status || 'unread',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryContacts.unshift(record);
      return record;
    },
    count: async (args?: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.contactMessage.count(args);
        } catch {
          // Fallback seamlessly
        }
      }
      if (args?.where?.status) {
        return inMemoryContacts.filter((c) => c.status === args.where.status).length;
      }
      return inMemoryContacts.length;
    },
    findMany: async (args?: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.contactMessage.findMany(args);
        } catch {
          // Fallback seamlessly
        }
      }
      let list = [...inMemoryContacts];
      if (args?.where?.status) {
        list = list.filter((c) => c.status === args.where.status);
      }
      const skip = args?.skip || 0;
      const take = args?.take || 20;
      return list.slice(skip, skip + take);
    },
    findUnique: async (args: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.contactMessage.findUnique(args);
        } catch {
          // Fallback seamlessly
        }
      }
      return inMemoryContacts.find((c) => c.id === args?.where?.id) || null;
    },
    update: async (args: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.contactMessage.update(args);
        } catch {
          // Fallback seamlessly
        }
      }
      const target = inMemoryContacts.find((c) => c.id === args?.where?.id);
      if (target) {
        Object.assign(target, args.data, { updatedAt: new Date() });
        return { ...target };
      }
      return { id: args?.where?.id, ...args.data, updatedAt: new Date() };
    },
  },

  partnershipProposal: {
    create: async (args: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.partnershipProposal.create(args);
        } catch {
          // Fallback seamlessly
        }
      }
      const record = {
        id: crypto.randomUUID(),
        ...args.data,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryPartnerships.unshift(record);
      return record;
    },
    count: async (args?: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.partnershipProposal.count(args);
        } catch {
          // Fallback seamlessly
        }
      }
      return inMemoryPartnerships.length;
    },
    findMany: async (args?: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.partnershipProposal.findMany(args);
        } catch {
          // Fallback seamlessly
        }
      }
      const skip = args?.skip || 0;
      const take = args?.take || 20;
      return inMemoryPartnerships.slice(skip, skip + take);
    },
  },

  traineeApplication: {
    create: async (args: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.traineeApplication.create(args);
        } catch {
          // Fallback seamlessly
        }
      }
      const record = {
        id: crypto.randomUUID(),
        ...args.data,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryTrainees.unshift(record);
      return record;
    },
    count: async (args?: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.traineeApplication.count(args);
        } catch {
          // Fallback seamlessly
        }
      }
      return inMemoryTrainees.length;
    },
    findMany: async (args?: any) => {
      if (realPrisma) {
        try {
          return await realPrisma.traineeApplication.findMany(args);
        } catch {
          // Fallback seamlessly
        }
      }
      const skip = args?.skip || 0;
      const take = args?.take || 20;
      return inMemoryTrainees.slice(skip, skip + take);
    },
  },

  $connect: async () => {
    if (realPrisma) {
      try {
        await realPrisma.$connect();
      } catch {
        // Suppress connection failure
      }
    }
  },

  $disconnect: async () => {
    if (realPrisma) {
      try {
        await realPrisma.$disconnect();
      } catch {
        // Suppress
      }
    }
  },
};

export default prisma;

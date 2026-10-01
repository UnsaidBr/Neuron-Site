import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PUBLICATIONS_LIST } from '../src/data/publicationsData.ts';
import { PARTNERS_LIST } from '../src/data/partnersData.ts';

const prisma = new PrismaClient();

// Initial project records directly representing the NEURON core projects
const SEED_PROJECTS = [
  {
    id: 'flagship-robo-budista',
    title: 'Robô Budista Interativo (Estátuas Budistas)',
    subtitle:
      'Estátuas interativas teomórficas com IA musical e gestos de empatia natural para o Museu Nacional da Coreia do Sul',
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
    institutions:
      'Universidade Federal de Lavras • Museu Nacional da Coreia do Sul • FAPESP',
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
  },
  {
    id: 'llm-cafe',
    title: 'LLM Café: Inteligência Artificial Generativa para a Cafeicultura',
    subtitle:
      'Modelo de linguagem especializado e RAG para assistência técnica agronômica, diagnose e extensão cafeeira',
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
    specs: {
      'Base de Conhecimento': '15.000+ publicações e teses da UFLA',
      'Acurácia Técnica': '95,2% validada por agrônomos',
      'Tempo Médio de Resposta': '< 400 ms em linguagem natural',
    },
  },
  {
    id: 'marcha-plus',
    title: 'Marcha+: Visão Computacional e Biomecânica da Marcha',
    subtitle:
      'Sistema inteligente de análise cinemática de marcha para reabilitação motora e avaliação postural',
    category: 'biomechanics',
    categoryLabel: 'Visão Computacional & Biomecânica',
    tagCategory: '03. BIOMECÂNICA & SAÚDE',
    badge: 'UFLA • VISÃO & SAÚDE',
    description:
      'Plataforma inovadora concebida no NEURON combinando visão computacional markerless (sem marcadores físicos reflexivos), aprendizado profundo e modelos biomecânicos para análise cinemática precisa da marcha humana, auxiliando no diagnóstico precoce de distúrbios motores e reabilitação fisioterapêutica acessível.',
    image: '/src/assets/images/marcha_plus_project_1789673925406.jpg',
    status: 'Em Teste',
    featured: false,
    tags: [
      '#MarchaPlus',
      '#VisãoComputacional',
      '#Biomecânica',
      '#SaúdeDigital',
      '#Cinemática',
    ],
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
    specs: {
      'Método de Rastreamento': 'Markerless (sem marcadores)',
      'Precisão Cinemática': 'Erro médio < 1,8° articulares',
      'Tempo de Processamento': 'Relatório gerado em 3 minutos',
    },
  },
];

async function main() {
  console.log('[Prisma Seed] Starting idempotent database seed...');

  // 1. Seed Projects
  console.log(`[Prisma Seed] Seeding ${SEED_PROJECTS.length} projects...`);
  for (const project of SEED_PROJECTS) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: {
        title: project.title,
        subtitle: project.subtitle,
        category: project.category,
        categoryLabel: project.categoryLabel,
        tagCategory: project.tagCategory,
        badge: project.badge,
        description: project.description,
        image: project.image,
        status: project.status,
        featured: project.featured ?? false,
        tags: project.tags,
        partners: project.partners,
        institutions: project.institutions,
        problem: project.problem,
        hypothesis: project.hypothesis,
        methodology: project.methodology,
        techStack: project.techStack,
        results: project.results,
        timeline: project.timeline,
        year: project.year,
        quote: project.quote,
        specs: project.specs,
      },
      create: {
        id: project.id,
        title: project.title,
        subtitle: project.subtitle,
        category: project.category,
        categoryLabel: project.categoryLabel,
        tagCategory: project.tagCategory,
        badge: project.badge,
        description: project.description,
        image: project.image,
        status: project.status,
        featured: project.featured ?? false,
        tags: project.tags,
        partners: project.partners,
        institutions: project.institutions,
        problem: project.problem,
        hypothesis: project.hypothesis,
        methodology: project.methodology,
        techStack: project.techStack,
        results: project.results,
        timeline: project.timeline,
        year: project.year,
        quote: project.quote,
        specs: project.specs,
      },
    });
  }

  // 2. Seed Publications (must follow projects due to foreign key)
  console.log(`[Prisma Seed] Seeding ${PUBLICATIONS_LIST.length} publications...`);
  for (const pub of PUBLICATIONS_LIST) {
    await prisma.publication.upsert({
      where: { id: pub.id },
      update: {
        title: pub.title,
        authors: pub.authors,
        venue: pub.venue,
        year: pub.year,
        projectId: pub.projectId,
        type: pub.type,
        typeLabel: pub.typeLabel,
        abstract: pub.abstract,
        tags: pub.tags,
        link: pub.link,
        badge: pub.badge,
      },
      create: {
        id: pub.id,
        title: pub.title,
        authors: pub.authors,
        venue: pub.venue,
        year: pub.year,
        projectId: pub.projectId,
        type: pub.type,
        typeLabel: pub.typeLabel,
        abstract: pub.abstract,
        tags: pub.tags,
        link: pub.link,
        badge: pub.badge,
      },
    });
  }

  // 3. Seed Partners
  console.log(`[Prisma Seed] Seeding ${PARTNERS_LIST.length} partners...`);
  for (const partner of PARTNERS_LIST) {
    await prisma.partner.upsert({
      where: { id: partner.id },
      update: {
        name: partner.name,
        category: partner.category,
        categoryLabel: partner.categoryLabel,
        country: partner.country,
        city: partner.city,
        badge: partner.badge,
        description: partner.description,
        role: partner.role,
        projectsInvolved: partner.projectsInvolved,
        website: partner.website,
      },
      create: {
        id: partner.id,
        name: partner.name,
        category: partner.category,
        categoryLabel: partner.categoryLabel,
        country: partner.country,
        city: partner.city,
        badge: partner.badge,
        description: partner.description,
        role: partner.role,
        projectsInvolved: partner.projectsInvolved,
        website: partner.website,
      },
    });
  }

  // 4. Seed Initial Superadmin (Idempotent, strictly from environment secrets)
  const initialAdminEmail = (process.env.INITIAL_ADMIN_EMAIL || 'admin@neuron.dcc.ufla.br').trim().toLowerCase();
  const initialAdminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'NeuronAdminSecret2026!';
  const initialAdminName = process.env.INITIAL_ADMIN_NAME || 'Coordenação NEURON';

  console.log('[Prisma Seed] Seeding initial administrator account...');
  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(initialAdminPassword, saltRounds);

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: initialAdminEmail },
  });

  if (!existingAdmin) {
    await prisma.adminUser.create({
      data: {
        email: initialAdminEmail,
        passwordHash,
        name: initialAdminName,
        role: 'superadmin',
        isActive: true,
        tokenVersion: 1,
      },
    });
    console.log(`[Prisma Seed] Initial administrator created.`);
  } else {
    // If admin already exists, update name and active status without clobbering updated password if changed
    await prisma.adminUser.update({
      where: { email: initialAdminEmail },
      data: {
        name: initialAdminName,
        isActive: true,
      },
    });
    console.log(`[Prisma Seed] Initial administrator verified.`);
  }

  console.log('[Prisma Seed] Seed finished successfully! All records verified.');
}

main()
  .catch((e) => {
    console.error('[Prisma Seed] Error executing seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

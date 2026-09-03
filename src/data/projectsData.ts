import { Project, MethodologyStage, MetricItem } from '../types';

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
    id: 'agricultura-espacial',
    category: 'Agro-Space Tech',
    badge: 'EMBRAPA ESPAÇO',
    title: 'O Brasil Vai Produzir Comida em Marte?',
    description:
      'Tecnologias desenvolvidas para produzir alimentos em ambientes hostis: cultivo sem solo, irrigação otimizada por IA e modelos biológicos aplicados à nova economia espacial.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCRs8WBkfh2WJw6JeIXmC8V61922yvGt9sTVuF5OvEejf_WW93_BXO_LPtstZHQojYty4xVMisIjfFdyuZBWNcpmz7DhrW9mwEkAmrBgl0D8Eefw_PuLzvxeFUee9PwZoEFJrt_KIid1_icx_Perfd-afi608sMLJ148t0PAvxDNSEzXmWHCw4TxJh5oON9ofbAdRPiOVraTr8xesgtWeo4vFToPE9vtIN8WROhxAbV6kplHqeEZq5u1B8nVVsJl7EGCg',
    status: '● STATUS: EM PESQUISA',
    highlight: 'BIO-ENGENHARIA ↗',
    color: '#F59E0B',
    pillTitle: 'Cultivo Extremo & Bioengenharia',
    pillDesc: 'Embrapa • Pesquisa de Fronteira',
  },
  {
    id: 'drones-clima',
    category: 'Visão Autônoma',
    badge: 'AGROTECH IA',
    title: 'Laboratório Extremo: Drones & IA',
    description:
      'Drones de precisão integrando sensores inteligentes e visão computacional avançada para monitoramento em tempo real de lavouras e sustentabilidade na agricultura tropical.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAbDHX0JmswcLOCzLnzqltl3TBQRFVHUm9hFfq-617nHWZ_-eCplfDcAtzrM7KEHlHW-zW6ZSABSQvqu2eY3NbfVqc_3H3kxIu2BT27cA4JTwwMmpHbKHJ5joXczP50BF37fETFYKdpHgvGzB4mYfn0sm1MSLaARyBasBk-m_o_E8Idm81CNksAg2tZB48eD3ZVMNpVF0KV27IoKoqbJEGTzDOTjvWCeWedlBCxh1MLi56MAcuKrfWMzQbfze-F7r4uug',
    status: '● STATUS: EM TESTE',
    highlight: 'UFLA AUTONOMOUS ↗',
    color: '#06B6D4',
    pillTitle: 'Visão Computacional & IA',
    pillDesc: 'UFLA Autonomous Lab',
  },
];

export const METRICS: MetricItem[] = [
  {
    value: '+9',
    label: 'Projetos Ativos',
    description: 'Conectando tecnologia, ciência e impacto social.',
    highlightColor: 'from-[#F6D88B] via-[#D91B7D] to-[#8435FF]',
  },
  {
    value: '04+',
    label: 'Centros Globais',
    description: 'Colaborações entre Brasil, Coreia, Reino Unido e Canadá.',
    highlightColor: 'text-[#F6D88B]',
  },
  {
    value: '100%',
    label: 'Pesquisa Aplicada',
    description: 'Agricultura espacial, robótica social e visão computacional.',
    highlightColor: 'text-[#06B6D4]',
  },
  {
    value: 'UFLA',
    label: 'Liderança Tecnológica',
    description: 'Destaques frequentes na Agência FAPESP e mídias científicas.',
    highlightColor: 'text-[#10B981]',
  },
];

export const FLAGSHIP_PROJECT: Project = {
  id: 'flagship-robo-budista',
  title: 'Robô Budista Interativo para o Museu Nacional da Coreia do Sul',
  subtitle: 'Estátuas interativas teomórficas com IA musical e gestos de empatia natural',
  category: 'robotics',
  categoryLabel: 'Robótica Teomórfica & IA Social',
  tagCategory: '05. EVENTO / PARTICIPAÇÃO',
  badge: 'UFLA • FAPESP',
  description:
    'Desenvolvimento interdisciplinar pioneiro concebido no NEURON que combina robótica humanoide teomórfica, IA musical generativa e gestos de empatia calibrados milimetricamente. A obra possibilita experiências culturais e contemplativas imersivas para visitantes internacionais no coração de Seul.',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDBnZ1zvVzyY1EZzApptjsn2gEkKZP92b22ZqWBHBMlM6hQ94YsO0C6gNJDSZi2LuTw05Q-gaFZokULW-jfWUNX8D0NQkedEaKaFpHeMpn1dbGz2Mig4KiZqHNhiIkd1fQsNaFvJe8bb6qPtlcjc8wKx24qdc3hL0AHFOb7NTx05O74K13oFl1OUrbZVjsplEpG-sa9Y62tTaPWDoc2SDPJ2Jl2ZbuqtiMIqQI7o8Wujc1y5WBOdFI2K09BpKtu-QHzYA',
  status: 'Em Operação',
  featured: true,
  tags: ['#RobóticaSocial', '#IA_Interativa', '#CoreiaDoSul', '#HRI', '#Teomorfismo'],
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

export const PROJECTS_LIST: Project[] = [
  FLAGSHIP_PROJECT,
  {
    id: 'agricultura-espacial-marte',
    title: 'O Brasil Vai Produzir Comida em Marte? (Estufas Espaciais)',
    subtitle: 'Cultivo sem solo, fotossíntese artificial e irrigação otimizada por IA',
    category: 'agrospace',
    categoryLabel: 'Agricultura Espacial & Bio-Engenharia',
    tagCategory: '03. PERGUNTA / GATILHO',
    badge: 'AGRO-SPACE • EMBRAPA',
    description:
      'Adaptação do conhecimento agronômico tropical da UFLA para ambientes espaciais controlados. Modelos de IA preditivos para mitigar estresse hídrico e controlar iluminação artificial de espectro fino em estufas herméticas.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkzWS5ymhmMJctUtpJioUDBVW_YTpwMooLLbmtGYgW3ONOSTg1KA746P9PYQHoBu8_nPNGQeLwnzHyGhcU0QY2bGR_8rCAtnC7aTkWznTLNb9UCqj-hv0ePAp6pwOJOgmU1W5CODn_W1C1zLrmsdB7r9U0TDdtFHEWARlgkfOabnzOerb1Q5WmWP4EDtAlY4DW9T3JxfNYfgZiFTTTIgBPafrcHeK-Xm_3rLQ697a5QBadPuo08cknlKU5pNjOQ_LqKQ',
    status: 'Em Pesquisa',
    tags: ['#AgriculturaEspacial', '#Embrapa', '#IrrigaçãoIA', '#BioEngenharia'],
    partners: ['UFLA Laboratório Extremo', 'Embrapa Espaço', 'Centros de Bio-Engenharia'],
    institutions: 'UFLA • Embrapa • Agência Espacial Brasileira',
    problem:
      'Viabilizar a produção autossustentável de biomassa comestível em ambientes extremos e pressurizados fora da Terra, com recursos hídricos e energéticos severamente restritos.',
    hypothesis:
      'Modelos neurais que aprendem a dinâmica de transpiração celular vegetal conseguem calibrar a mistura de nutrientes e espectro luminoso hora a hora, reduzindo em 40% a demanda energética.',
    methodology:
      'Câmaras hiperbáricas e hidropônicas equipadas com espectrômetros UV-VIS e sensores de umidade capacitivos integrados a controladores em malha fechada.',
    techStack: [
      'Modelos Preditivos de Biomassa (Python / Scikit-learn)',
      'Controle IoT ESP32 Industrial',
      'Sensores Hiperespectrais',
      'Algoritmos de Otimização de Fotoperíodo',
    ],
    results:
      'Redução comprovada de 38% no consumo de água em ciclos de 45 dias com variedades selecionadas de microvegetais e folhosas.',
    timeline: '2024 - 2026',
    specs: {
      'Ambiente': 'Câmara pressurizada controlada',
      'Eficiência Hídrica': '+38% vs estufa tradicional',
      'Monitoramento': 'Rede IoT em malha fechada',
    },
  },
  {
    id: 'drones-clima-extremo',
    title: 'Laboratório Extremo: Drones e Sensores contra Clima Severo',
    subtitle: 'Algoritmos neurais embarcados em drones autônomos para predição agroclimática',
    category: 'vision',
    categoryLabel: 'Visão Computacional & Drones',
    tagCategory: '06. CURIOSIDADE / TECNOLOGIA',
    badge: 'VISÃO COMPUTACIONAL • AUTONOMIA',
    description:
      'Algoritmos neurais embarcados em drones autônomos para prever secas repentinas, geadas e otimizar a aplicação de bio-insumos em tempo real, transpondo tecnologia orbital para o agronegócio de precisão.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1XkoOnZnWIGVVlp_Thxc3QhXu1muvpKF0YUrazAMW4iaZpe4qWQoSp08dPWI7wT2VSY_K4i8hRAwNeF2NczDZ_vPA64hQprZc872o9shAJvNUX5ogqhKlx50bdDib3Hp7xR9M-qnMt4AJmbDinzb3AUh9gYkRNC9zRSvHuCu2yTjwfL4jhBjoHn7acdk6nzZ3CKQbwVvXGi3eEpMbse2I34d5gnGpaU3TdAXWvH-BCGMrDiZXhshzzSuh2cHj5BdKcg',
    status: 'Em Teste',
    tags: ['#DronesIA', '#SensoresPreditivos', '#UFLALab', '#VisãoAutônoma'],
    partners: ['UFLA Autonomous Lab', 'Cooperativas Agrícolas do Sul de MG'],
    institutions: 'UFLA Departamento de Ciência da Computação',
    problem:
      'A variabilidade climática extrema causa perdas milionárias em safras sem que produtores consigam prever estresses hídricos antes da necrose visível das plantas.',
    hypothesis:
      'Câmeras multiespectrais operadas por drones com rotas autônomas e segmentação semântica em tempo real identificam anomalias fisiológicas com 5 dias de antecedência.',
    methodology:
      'Voo em malha automatizada com georreferenciamento RTK, inferência convolucional rápida embarcada para geração imediata de mapas de vigor (NDVI e NDRE).',
    techStack: [
      'YOLOv10 & SegNet embarcadas',
      'Pixhawk / PX4 Autopilot',
      'Geolocalização RTK centimétrica',
      'Pipeline de Processamento Cloud Edge',
    ],
    results:
      'Mais de 2.000 hectares voados com índice de detecção precoce de pragas e estresse de 93,4%.',
    timeline: '2024 - 2025',
    specs: {
      'Autonomia de Voo': '38 minutos por bateria',
      'Resolução Espacial': '1,2 cm/pixel',
      'Tempo de Inferência': '18 ms por frame',
    },
  },
  {
    id: 'robotica-social-arte',
    title: 'Robótica + Inteligência Artificial + Arte Budista',
    subtitle: 'Modelagem cinemática de microgestos e expressões humanizadas acolhedoras',
    category: 'robotics',
    categoryLabel: 'Robótica Social & Teomórfica',
    tagCategory: '06. CURIOSIDADE / TECNOLOGIA',
    badge: 'ROBÓTICA SOCIAL • ARTE & IA',
    description:
      'Você sabia? Robôs teomórficos e assistivos são modelados para simular microgestos e expressões humanas que quebram barreiras comunicativas, viabilizando interações empáticas e acolhedoras em saúde, museus e educação inclusiva.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbuiVnuEE_PF8O2ZISlbEM4MYK9pXVpwSPB9e548sfe04LVj9q1V7d-Zjk4JADpCiGSbIBf1KFW0xFX0YHJ3popwr3vB5PGK-r4n3glFi2dC_iqZW8FN1kgKtLUGduevOkq8jjOMG71HlhC4a_WejGTPFuzT8riKhPV4wzyuKEqRJip5HHoworlFAC6VgxRbKUzCr2kIzyQX6QynI1brErS8R4CxOYxNyWhQy94SqYbgaUjYcI7gxVRXAJjwrPIB0T3g',
    status: 'Em Operação',
    tags: ['#RobóticaSocial', '#HRI', '#Teomorfismo', '#Cognição'],
    partners: ['UFLA Lab', 'Museus Parceiros', 'Instituto de Cognição Humana'],
    institutions: 'UFLA • Consórcios Culturais Internacionais',
    problem:
      'Robôs convencionais geram o efeito "vale da estranheza" (uncanny valley), provocando desconforto e rejeição inicial por parte de humanos.',
    hypothesis:
      'Inspirar movimentos em padrões teomórficos e contemplativos reduz o estresse do observador e estimula o engajamento emocional respeitoso.',
    methodology:
      'Análise biomecânica de gestos rituais tradicionais combinada com atuadores silenciosos e algoritmos de gaze-tracking que evitam contato visual agressivo.',
    techStack: ['Python ROS', 'Dynamixel Servos', 'Facial Landmark Detection', 'Inverse Kinematics'],
    results:
      'Taxa de aceitação positiva de 97% em testes com públicos multigeracionais.',
    timeline: '2023 - 2025',
    specs: {
      'Graus de Liberdade': '18 DOF na cabeça e tronco',
      'Ruído Operacional': '< 28 dB',
    },
  },
  {
    id: 'ciencia-computacao-sem-fronteiras',
    title: 'Ciência da Computação Sem Fronteiras (Hongik Univ & Ontario Tech)',
    subtitle: 'Intercâmbio e cooperação transfronteiriça com instituições do Canadá e Ásia',
    category: 'llm',
    categoryLabel: 'Modelos de Linguagem & HRI',
    tagCategory: '04. PROJETO APRESENTAÇÃO',
    badge: 'INTERCÂMBIO • REDE GLOBAL',
    description:
      'Pesquisadores em nível de graduação e pós-graduação investigando arquiteturas de Large Language Models aplicadas a agentes conversacionais corporificados e interfaces cérebro-computador não invasivas.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdjXrjSirXGAIOTJhWac2lCW8Ke0iA_4SPaTxPUi67JZK34jHlZNVU1c58lTuOXmtFBsDK0JAmzn14GQTVLuHs3Hx3H15KCvfvVJRhHY_XPPWh-TAfCVtVtdCClfw2-vKvm77d4RF9AZHa1ZeVbxlV1kktHOLo4hC1N-LP_C5nPh8VDBIpiG5DFEkclGCp6QC0LBl7icfIs807Yh2o_4HFFVEipwwwB2mO2ZmHphyi_rDrw9k2R-DCCtU3LeFWdtibsA',
    status: 'Publicado',
    tags: ['#Hongik', '#OntarioTech', '#LLMs', '#RedeGlobal'],
    partners: ['UFLA (Brasil)', 'Hongik University (Coreia)', 'Ontario Tech (Canadá)'],
    institutions: 'UFLA • Hongik University • Ontario Tech University',
    problem:
      'Modelos conversacionais comumente carecem de contextualização cultural e espacial quando instalados em agentes físicos interativos.',
    hypothesis:
      'Arquiteturas RAG ancoradas em grafos de conhecimento locais aumentam a precisão e coerência cultural do agente em 75%.',
    methodology:
      'Implementação de pipelines multilíngues com ancoragem em fontes historiográficas e curadoria bilíngue (Português, Coreano e Inglês).',
    techStack: ['LangChain', 'Llama / Mistral Fine-tuned', 'Graph Database (Neo4j)', 'Vector Embeddings'],
    results:
      'Convênio acadêmico plurianual firmado e 3 artigos apresentados em conferências A1 da CAPES.',
    timeline: '2024 - 2027',
    specs: {
      'Idiomas Suportados': 'Português, Coreano, Inglês',
      'Latência de Resposta': '< 450 ms',
    },
  },
  {
    id: 'economia-orbital-deeptech',
    title: 'Salto de US$ 5 bi para US$ 13 bi até 2032 na Economia Orbital',
    subtitle: 'Estudo econométrico de mercado e posições estratégicas da deep tech brasileira',
    category: 'deeptech',
    categoryLabel: 'Macroeconomia • Deep Tech',
    tagCategory: '02. CONTEÚDO INFO',
    badge: 'MACROECONOMIA • DEEP TECH',
    description:
      'Estudo econométrico embasado em dados da McKinsey e Space Foundation demonstrando como os biomas e a infraestrutura científica brasileira podem liderar a cadeia global de exploração agroespacial.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFTqBsmJzLGD4BgkNNk3YvwIKdzTiiAkQoPkNQkcwAcvq7Jkp6VKOmqXYF6FcOv1UCcodx-FxqDquGy1qsL6mglv2hDVaYtcFRgfUNN1oweezfVv9_OEOVQe0JNfbyjSqKpSIjjbWZFZjhH4BBWWjq8bvUVuOFUJtg8uIXmVphwjcNj9rDbwjqPM_ikmCAycN3YNbcDiNQ7kur23lJLr55FH6lcOvUj1jf_VE0jWJ8Jpo3YGWc8qxyQiZ0-CQVOHXJ2Q',
    status: 'Publicado',
    tags: ['#EconomiaEspacial', '#McKinseyData', '#OrbitalAgro', '#DeepTech'],
    partners: ['Space Foundation Data', 'Observatório UFLA de Inovação'],
    institutions: 'UFLA • Núcleo de Economia da Inovação',
    problem:
      'O ecossistema latino-americano de inovação corre o risco de ficar alheio à expansão exponencial da economia orbital sem um plano estratégico de capacitação técnica.',
    hypothesis:
      'A especialização em agricultura extrema e biotecnologia tropical concede ao Brasil vantagem comparativa insubstituível em estações lunares e marcianas.',
    methodology:
      'Modelagem preditiva econométrica combinando dados de investimentos venture capital, orçamentos espaciais governamentais e patentes globais de 2018 a 2024.',
    techStack: ['R / Python Pandas', 'Modelagem Econométrica ARIMA', 'Tableau / D3.js Data Viz'],
    results:
      'Whitepaper oficial publicado e distribuído para órgãos de fomento à pesquisa e ministérios setoriais.',
    timeline: 'Publicado em 2024',
    specs: {
      'Crescimento Projetado': '160% até 2032',
      'Mercado Alvo': 'US$ 13 Bilhões',
    },
  },
  {
    id: 'trainee-impacto-carreira',
    title: 'Formação Científica de Trainees: “Muito além do técnico”',
    subtitle: 'Formação humanizada, liderança de projetos e residências em centros globais',
    category: 'deeptech',
    categoryLabel: 'Formação de Talentos • Impacto',
    tagCategory: '07. DEPOIMENTO / TRAINEE',
    badge: 'FORMAÇÃO DE TALENTOS • IMPACTO',
    description:
      'Métricas e trajetórias dos acadêmicos do NEURON que conquistaram intercâmbios e residências de pesquisa na OCAD University, McGill University e Toronto Rehabilitation Institute.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHGKX9qeKdhTpiWgLwK6sFo4bgLsB2jeldW5bNByUGjIaHTyOxeIrGGxs-9fxee6yHFzF8A8-MV1_K9s-Fcnb5kKzLKXLpJ0LbnnvwVXejT1KaEdrhFWmhyN5n0vY8itC58M0CAZd5zcgvSXiBkdYWDmFipjDkelIrE-SR7CscFgRJ_mO5-ZtsOmb7mnDhEg38zRLM7t8nS46-8yp41LLsFEyh_eg09yFfMYioR3ovNzbCyCTN7UTiUokIsaFwtC9Qmg',
    status: 'Em Operação',
    tags: ['#TraineeNEURON', '#AlumniGlobal', '#UFLA', '#CarreiraCientífica'],
    partners: ['UFLA Alunos', 'OCAD University', 'McGill', 'Toronto Rehab'],
    institutions: 'UFLA • Programa de Formação NEURON',
    problem:
      'Estudantes de graduação frequentemente enfrentam barreiras para participar de pesquisas com impacto internacional sem anos de pós-graduação prévia.',
    hypothesis:
      'Um programa de aceleração hands-on baseado em mentoria sênior-júnior permite a alunos do 2º período liderarem módulos reais de hardware e IA.',
    methodology:
      'Ciclo anual de formação com sprints quinzenais, imersão em laboratório, escrita de relatórios técnicos e defesa de hipóteses perante banca docente.',
    techStack: ['Metodologia Ágil Científica', 'Mentoria 1-on-1', 'Bancadas Abertas 24/7'],
    results:
      '100% dos trainees formados foram inseridos em programas internacionais ou projetos com fomento de agências de pesquisa.',
    timeline: 'Ciclos Anuais Contínuos',
    specs: {
      'Carga Horária': '12h semanais flexíveis',
      'Taxa de Inserção': '100% acadêmica/mercado',
    },
  },
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

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'robotics' | 'agrospace' | 'vision' | 'llm' | 'deeptech' | 'biomechanics';
  categoryLabel: string;
  tagCategory: string; // e.g. "05. EVENTO / PARTICIPAÇÃO"
  badge: string; // e.g. "UFLA • FAPESP"
  description: string;
  image: string;
  status: 'Em Operação' | 'Em Pesquisa' | 'Em Teste' | 'Publicado';
  featured?: boolean;
  tags: string[];
  partners: string[];
  institutions: string;
  problem: string;
  hypothesis: string;
  methodology: string;
  techStack: string[];
  results: string;
  timeline: string;
  year: number;
  quote?: string;
  specs?: { [key: string]: string };
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  projectId: string;
  projectTitle: string;
  type: 'artigo' | 'conferencia' | 'relatorio' | 'patente';
  typeLabel: string;
  abstract: string;
  tags: string[];
  link?: string;
  badge: string;
}

export interface Partner {
  id: string;
  name: string;
  category: 'universidade' | 'fomento' | 'internacional' | 'setor-produtivo' | 'saude';
  categoryLabel: string;
  country: string;
  city?: string;
  description: string;
  role: string;
  projectsInvolved: string[];
  website?: string;
  badge: string;
}

export interface BrandCard {
  number: string;
  category: string;
  title: string;
  description: string;
  colorHex: string;
  tag: string;
}

export interface MethodologyStage {
  step: string;
  title: string;
  description: string;
  tag: string;
  color: string;
}

export interface MetricItem {
  value: string;
  label: string;
  description: string;
  highlightColor?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  institution?: string;
  phone?: string;
  subject: string;
  topic: 'parceria' | 'extensao' | 'palestra' | 'duvida' | 'outro';
  message: string;
}

export interface TraineeApplication {
  name: string;
  email: string;
  phone: string;
  course: string;
  period: string;
  areaOfInterest: string;
  motivation: string;
  type: 'trainee' | 'partnership';
}

export type PageTab =
  | 'equipe-sobre'
  | 'publicacoes-projetos'
  | 'parcerias'
  | 'contatos'
  | 'home'
  | 'projetos';

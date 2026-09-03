export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'robotics' | 'agrospace' | 'vision' | 'llm' | 'deeptech';
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
  quote?: string;
  specs?: { [key: string]: string };
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

export type PageTab = 'home' | 'projetos' | 'pesquisa' | 'equipe' | 'brand';

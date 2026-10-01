import React from 'react';
import {
  Users,
  Globe2,
  Sparkles,
  MapPin,
  Cpu,
  GraduationCap,
  Award,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Network,
  Heart,
  ExternalLink,
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { NeuronBee } from './NeuronBee';
import { NeuronLogo } from './NeuronLogo';
import { OptimizedImage } from './OptimizedImage';
import { PageTab } from '../types';

interface AboutAndTeamViewProps {
  onNavigateTab: (tab: PageTab) => void;
  onOpenTraineeModal: () => void;
}

export const AboutAndTeamView: React.FC<AboutAndTeamViewProps> = ({
  onNavigateTab,
  onOpenTraineeModal,
}) => {
  const leadership = [
    {
      role: 'Coordenação Docente & Orientação',
      name: 'Corpo Docente DCC / UFLA',
      desc: 'Professores doutores do Departamento de Ciência da Computação da Universidade Federal de Lavras responsáveis pela orientação científica, fomento institucional e cooperação internacional.',
      badge: 'DOCÊNCIA & PESQUISA',
      tags: ['Inteligência Artificial', 'Robótica Social', 'Visão Computacional'],
    },
    {
      role: 'Liderança Técnica & Pesquisa Aplicada',
      name: 'Pesquisadores de Pós-Graduação & Mestrado',
      desc: 'Mestrandos e pesquisadores dedicados à modelagem teórica, desenvolvimento dos modelos de IA, publicação de artigos científicos e condução dos experimentos de bancada.',
      badge: 'MESTRADO & PÓS',
      tags: ['LLMs & RAG', 'Cinemática Markerless', 'HRI Empática'],
    },
    {
      role: 'Desenvolvimento & Extensão Discente',
      name: 'Equipe de Graduação & Trainees',
      desc: 'Estudantes dos cursos de Ciência da Computação, Engenharia de Controle e Automação, Sistemas de Informação e áreas afins que constroem protótipos, software e hardware aplicados.',
      badge: 'GRADUAÇÃO & EXTENSÃO',
      tags: ['ROS2 & C++', 'PyTorch', 'Prototipagem 3D'],
    },
  ];

  const pillars = [
    {
      icon: <Award className="w-5 h-5 text-[#F59E0B]" />,
      title: 'Ciência Aplicada com Rigor',
      description:
        'Cada linha de código e projeto concebido no NEURON passa por metodologia científica rigorosa, revisão por pares e validação empírica em cenários reais.',
      color: 'border-[#F59E0B]/30 bg-[#F59E0B]/5 text-[#F59E0B]',
    },
    {
      icon: <Heart className="w-5 h-5 text-[#DB2777]" />,
      title: 'Impacto Social & Extensão',
      description:
        'Não fazemos tecnologia apenas para publicação em gaveta. Do auxílio ao cafeicultor de Minas Gerais à reabilitação motora no SUS, nosso compromisso é com a sociedade.',
      color: 'border-[#DB2777]/30 bg-[#DB2777]/5 text-[#DB2777]',
    },
    {
      icon: <Globe2 className="w-5 h-5 text-[#7C3AED]" />,
      title: 'Cooperação Global',
      description:
        'Conexões ativas com o Museu Nacional da Coreia do Sul, Hongik University, Heriot-Watt University (Escócia) e Ontario Tech University (Canadá).',
      color: 'border-[#7C3AED]/30 bg-[#7C3AED]/5 text-[#7C3AED]',
    },
    {
      icon: <Users className="w-5 h-5 text-[#10B981]" />,
      title: 'Cultura da Colmeia',
      description:
        'Horizontalidade, acolhimento de novos membros e mentoria de veteranos para calouros. No NEURON, ninguém pesquisa sozinho.',
      color: 'border-[#10B981]/30 bg-[#10B981]/5 text-[#10B981]',
    },
  ];

  const infrastructure = [
    {
      title: 'Bancada de Prototipagem & Fabricação',
      desc: 'Impressoras 3D de precisão, bancadas de solda, montagem de circuitos de microeletrônica e ferramentas para usinagem rápida de atuadores.',
    },
    {
      title: 'Cluster de Inferência & GPUs',
      desc: 'Servidores dedicados no DCC/UFLA equipados com GPUs para treinamento de LLMs, modelos de difusão, visão computacional e estimativa de pose 3D.',
    },
    {
      title: 'Estação de Robótica Social & HRI',
      desc: 'Ambiente controlado de gravação e sensores estéreo de alta velocidade para calibração de micro-gestos e respostas empáticas em tempo real.',
    },
    {
      title: 'Espaço de Co-Working & Reuniões',
      desc: 'Sala de estudos, troca de ideias e integração contínua entre os membros da Colmeia, com acesso livre para a equipe.',
    },
  ];

  return (
    <div className="space-y-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero / Header Section */}
      <ScrollReveal direction="up" duration={0.65} className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-bold">
          <NeuronBee variant="micro" />
          <span>SOBRE O LABORATÓRIO // DCC • UFLA</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Equipe &amp; Manifesto da <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#DB2777] to-[#7C3AED]">
                Colmeia NEURON
              </span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg font-light leading-relaxed max-w-3xl">
              O <strong className="text-white font-medium">NEURON</strong> é o Núcleo de Estudos e Pesquisa em Robótica e Inteligência Artificial sediado no{' '}
              <span className="text-white font-medium">Departamento de Ciência da Computação (DCC)</span> da Universidade Federal de Lavras (UFLA). Um ambiente colaborativo onde mentes curiosas transformam teoria em impacto palpável.
            </p>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 space-y-4 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <NeuronLogo variant="icon" />
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#F59E0B] font-bold block">
                  Identidade
                </span>
                <span className="text-sm font-bold text-white">NEURON • DCC / UFLA</span>
              </div>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-light">
              Nossa marca é a abelha: símbolo de trabalho coletivo, precisão geométrica e fertilização de novas ideias pelo mundo.
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-white/40 border-t border-white/5">
              <span>Fundação na UFLA</span>
              <span className="text-white/70">Lavras • MG</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Official Team Photo Showcase Banner */}
      <ScrollReveal direction="up" delay={0.1} duration={0.7} className="w-full">
        <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-1.5 relative overflow-hidden group shadow-2xl">
          <div className="relative rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/5 flex items-center justify-center min-h-[340px] sm:min-h-[480px] lg:min-h-[560px]">
            <OptimizedImage
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkFAkl4VEIIrQrHGzFoJF5O-4tYCxAg5mAnj941-VCjjGpvp0ANbjy_aIPuzqBHC4udZGVGmRgFrQoo4P5BN9MiNC8Iia5Ht8A8Cf3yHSB-L5WgDa7yvNR3C8njizZVBfN7xOveAJLoRE9jLHvkHFWeXYIXgGaVxhBLnQCQruXqCn8-lnpoJQI5eli0pG5aeXLZ2r2qRjvlBibHdgmR07P10lBeFJW5pCwXMnmyxmUY2w4-9rm5zYhiuslBaQcOdwg5w"
              alt="Equipe e Pesquisadores NEURON UFLA"
              width={1200}
              height={675}
              sizes="(max-width: 1200px) 100vw, 1150px"
              className="w-full h-auto object-contain max-h-[600px] drop-shadow-md group-hover:scale-105 transition-transform duration-700 filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 via-transparent to-transparent pointer-events-none" />

            {/* Badges on Image */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
              <span className="px-4 py-2 text-xs sm:text-sm font-mono font-medium rounded-lg bg-black/85 backdrop-blur-md text-[#F59E0B] border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#DB2777] animate-pulse" />
                Fotografia Oficial • Equipe &amp; Pesquisadores NEURON (DCC/UFLA)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-black/80 text-white/80 border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" />
                Câmpus Universitário • Lavras - MG
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Core Pillars / Culture Grid */}
      <div className="space-y-8">
        <ScrollReveal direction="up" duration={0.6} className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-bold">
            OS 4 PILARES DA COLMEIA
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Como Pensamos &amp; Como Criamos
          </h2>
          <p className="text-white/50 text-sm font-light leading-relaxed">
            Nossa estrutura equilibra a profundidade científica com a velocidade de execução de protótipos reais.
          </p>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="h-full p-6 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 flex flex-col justify-between hover:border-white/25 transition-all">
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${pillar.color}`}>
                    {pillar.icon}
                  </div>
                  <h3 className="text-base font-bold text-white">{pillar.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Team Composition / Roles Breakdown */}
      <div className="space-y-8">
        <ScrollReveal direction="up" duration={0.6} className="space-y-3">
          <span className="text-[10px] font-mono text-[#DB2777] uppercase tracking-widest font-bold">
            CORPO DE PESQUISA &amp; FORMAÇÃO
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Níveis de Atuação no Laboratório
          </h2>
          <p className="text-white/50 text-sm font-light max-w-2xl leading-relaxed">
            Do primeiro ano de graduação ao pós-doutorado, a cooperação mútua é a chave para o sucesso de nossos projetos.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {leadership.map((item, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.1} duration={0.65} className="h-full">
              <div className="h-full p-7 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70 font-semibold uppercase">
                      {item.badge}
                    </span>
                    <GraduationCap className="w-4 h-4 text-[#7C3AED]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    <p className="text-xs font-mono text-[#A78BFA] mt-0.5">{item.role}</p>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-white/40 uppercase">Especialidades:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-white/70 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Infrastructure & Laboratory in DCC/UFLA */}
      <div className="space-y-8">
        <ScrollReveal direction="up" duration={0.6} className="space-y-3">
          <span className="text-[10px] font-mono text-[#7C3AED] uppercase tracking-widest font-bold">
            INFRAESTRUTURA FÍSICA // DCC • UFLA
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Onde a Inovação Acontece
          </h2>
          <p className="text-white/50 text-sm font-light max-w-2xl leading-relaxed">
            Sediados no prédio do Departamento de Ciência da Computação, contamos com equipamentos dedicados para transformar ideias em protótipos funcionais.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infrastructure.map((infra, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.08} duration={0.6} className="h-full">
              <div className="h-full p-6 rounded-2xl bg-[#0D0D0D]/90 border border-white/10 flex flex-col justify-between hover:border-[#7C3AED]/40 transition-all">
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center text-[#A78BFA] font-mono text-xs font-bold">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-white">{infra.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    {infra.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Call to Action: Be a Trainee / Join the Hive */}
      <ScrollReveal direction="up" duration={0.65} className="w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#7C3AED]/20 via-[#DB2777]/15 to-[#F59E0B]/10 border border-[#7C3AED]/30 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-mono text-white uppercase tracking-widest font-bold">
              <Sparkles className="w-3 h-3 text-[#F59E0B]" />
              <span>PROCESSO DE SELEÇÃO CONTÍNUA // TRAINEE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Faça Parte da Colmeia NEURON
            </h2>

            <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
              Você é estudante da UFLA apaixonado por robótica, inteligência artificial, visão computacional ou desenvolvimento de hardware? Buscamos pessoas motivadas a aprender e dispostas a deixar sua marca.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onOpenTraineeModal}
                className="px-6 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:scale-105"
              >
                <span>Inscreva-se como Trainee</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('publicacoes-projetos')}
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs uppercase tracking-widest font-bold border border-white/10 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Conhecer Publicações &amp; Projetos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

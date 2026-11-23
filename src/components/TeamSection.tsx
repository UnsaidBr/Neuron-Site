import React from 'react';
import { Users, Globe2, Sparkles, MapPin, Cpu } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { OptimizedImage } from './OptimizedImage';
import neuronTeamPhoto from '../assets/images/neuron_team_enhanced_1795396077158.jpg';

export const TeamSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-transparent border-t border-white/5" id="equipe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.6} className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[10px] font-mono text-[#A78BFA] uppercase tracking-widest font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
            <span>08. BASTIDORES / TIME • UFLA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Mentes Curiosas, <br />
            <span className="text-[#A78BFA]">Ideias que Transformam.</span>
          </h2>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
            O NEURON reúne estudantes, pesquisadores e docentes dos mais diversos cursos da UFLA — Ciência da Computação, Engenharia, Sistemas de Informação e áreas correlatas — unidos pelo entusiasmo de construir tecnologias aplicadas.
          </p>
        </ScrollReveal>

        {/* Prominent Team Showcase Image Banner - Immersive UI double-layer frame */}
        <ScrollReveal direction="up" delay={0.15} duration={0.7} className="w-full max-w-6xl mx-auto">
          <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-1 relative overflow-hidden group">
            <div className="relative rounded-xl overflow-hidden bg-[#0A0A0A]/90 border border-white/5 aspect-[3/2] w-full">
              <OptimizedImage
                src={neuronTeamPhoto}
                alt="Equipe e Pesquisadores NEURON UFLA"
                width={1500}
                height={1000}
                aspectRatio="3/2"
                containerClassName="w-full h-full"
                sizes="(max-width: 1200px) 100vw, 1150px"
                className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none z-[2]" />

              {/* Caption Bar on Image */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none z-[3]">
                <span className="px-4 py-2 text-xs sm:text-sm font-mono font-medium rounded-lg bg-black/80 backdrop-blur-md text-[#F59E0B] border border-white/15">
                  Equipe &amp; Pesquisadores NEURON · UFLA
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-black/75 backdrop-blur-md text-white/85 border border-white/15">
                  <MapPin className="w-3.5 h-3.5 text-[#A78BFA]" />
                  LAVRAS / MG
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Pillars / Culture Grid with Immersive UI double-layer cards and Stagger animation */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <StaggerItem className="h-full">
            <div className="h-full bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-1 relative overflow-hidden group hover:border-white/20 transition-all">
              <div className="relative bg-[#0A0A0A]/90 rounded-xl p-6 border border-white/5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center space-x-2 text-[#F59E0B] font-mono text-xs font-bold mb-3">
                    <Users className="w-4 h-4 text-[#F59E0B]" />
                    <span>CULTURA ABERTA &amp; MENTORIA</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                    Mentoria contínua entre veteranos, professores e novos membros trainees com foco em desenvolvimento humanizado e excelência técnica prática.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-white/40 mt-4 pt-3 border-t border-white/5">
                  Formação Integrada • Graduação &amp; Mestrado
                </span>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem className="h-full">
            <div className="h-full bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-1 relative overflow-hidden group hover:border-white/20 transition-all">
              <div className="relative bg-[#0A0A0A]/90 rounded-xl p-6 border border-white/5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center space-x-2 text-[#DB2777] font-mono text-xs font-bold mb-3">
                    <Globe2 className="w-4 h-4 text-[#DB2777]" />
                    <span>PROJETOS GLOBAIS</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                    Oportunidade real de publicação em periódicos e intercâmbio com instituições internacionais parceiras na Coreia do Sul, Reino Unido e Canadá.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-white/40 mt-4 pt-3 border-t border-white/5">
                  Alumni em Toronto, Seul e Edimburgo
                </span>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem className="h-full">
            <div className="h-full bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-1 relative overflow-hidden group hover:border-white/20 transition-all">
              <div className="relative bg-[#0A0A0A]/90 rounded-xl p-6 border border-white/5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center space-x-2 text-[#7C3AED] font-mono text-xs font-bold mb-3">
                    <Cpu className="w-4 h-4 text-[#7C3AED]" />
                    <span>INFRAESTRUTURA DE PONTA</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                    Laboratório sediado no DCC/UFLA com bancadas de prototipagem rápida, cluster de inferência neural, estações de robótica social e estufas de teste biológico.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-white/40 mt-4 pt-3 border-t border-white/5">
                  Acesso 24/7 para membros ativos
                </span>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};


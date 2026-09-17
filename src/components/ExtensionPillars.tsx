import React from 'react';
import { Cpu, Users, Zap, ArrowUpRight, Sparkles, HeartHandshake, BookOpen } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { NeuronBee } from './NeuronBee';

interface ExtensionPillarsProps {
  onExploreProjects?: () => void;
}

export const ExtensionPillars: React.FC<ExtensionPillarsProps> = ({ onExploreProjects }) => {
  const pillars = [
    {
      icon: Cpu,
      tag: '01 // PROTOTIPAGEM REAL',
      title: 'Ciência Além dos Muros',
      subtitle: 'Da teoria ao hardware funcionando',
      description:
        'Não nos limitamos a ler papers e resolver equações em sala de aula. Projetamos hardware, treinamos modelos e colocamos robôs operando em museus nacionais, lavouras e exposições públicas.',
      accent: 'from-[#7C3AED] to-[#A78BFA]',
      borderHover: 'hover:border-[#7C3AED]/40',
      tagColor: 'text-[#A78BFA]',
    },
    {
      icon: HeartHandshake,
      tag: '02 // IMPACTO SOCIAL',
      title: 'Democratização Tecnológica',
      subtitle: 'Inteligência artificial a serviço da sociedade',
      description:
        'A extensão universitária é a ponte entre a universidade pública e as pessoas. Levamos tecnologia aberta, oficinas formativas e IA empática para a comunidade civil e setores produtivos.',
      accent: 'from-[#F59E0B] to-[#FBBF24]',
      borderHover: 'hover:border-[#F59E0B]/40',
      tagColor: 'text-[#F59E0B]',
    },
    {
      icon: Users,
      tag: '03 // A COLMEIA',
      title: 'Formação Prática (Hands-On)',
      subtitle: 'Cultura de enxame e autonomia',
      description:
        'Cada membro aprende construindo. Integramos estudantes de graduação e pós da UFLA em equipes ágeis e multidisciplinares, formando talentos e pesquisadores prontos para liderar na academia e na indústria.',
      accent: 'from-[#DB2777] to-[#F43F5E]',
      borderHover: 'hover:border-[#DB2777]/40',
      tagColor: 'text-[#DB2777]',
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-transparent border-t border-white/5">
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#7C3AED]/5 via-[#F59E0B]/5 to-[#DB2777]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" duration={0.6} className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#F59E0B] uppercase tracking-widest font-bold mb-4">
            <Sparkles className="w-3 h-3 text-[#F59E0B]" />
            <span>O SIGNIFICADO DA EXTENSÃO UNIVERSITÁRIA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Por que extensão?{' '}
            <span className="text-white/40 block sm:inline font-normal">
              A ciência só tem sentido quando transforma o mundo.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/50 leading-relaxed font-light mt-4">
            Na tradição da UFLA, a extensão é o pilar que impede a tecnologia de se isolar. É onde o código se torna acolhimento, a robótica vira ferramenta social e o estudante se transforma em pesquisador de impacto.
          </p>
        </ScrollReveal>

        {/* 3 Pillars Grid */}
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem key={idx} className="h-full">
                <div
                  className={`h-full p-8 rounded-2xl bg-[#0D0D0D]/90 backdrop-blur-sm border border-white/5 ${pillar.borderHover} transition-all duration-300 flex flex-col justify-between group hover:bg-[#121212] relative overflow-hidden`}
                >
                  {/* Subtle corner light */}
                  <div
                    className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${pillar.accent} rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none`}
                  />

                  <div className="space-y-5 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6 text-white/90" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold tracking-widest ${pillar.tagColor}`}>
                        {pillar.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight mb-1 group-hover:text-white transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#A78BFA] font-mono mb-3">
                        {pillar.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                        {pillar.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom indicator */}
                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                      UFLA • DCC
                    </span>
                    <span className="text-[11px] text-white/50 flex items-center gap-1 group-hover:text-white transition-colors">
                      Impacto Tangível
                    </span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Minimalist Extension Quote Banner */}
        <ScrollReveal direction="up" delay={0.2} duration={0.6} className="mt-12">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#7C3AED]/10 via-[#F59E0B]/5 to-transparent border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <NeuronBee variant="badge" />
              <div>
                <p className="text-sm sm:text-base font-semibold text-white">
                  "Mais do que pesquisar para a gaveta, produzimos tecnologia para a vida das pessoas."
                </p>
                <span className="text-xs text-white/40 font-mono">
                  Manifesto da Colmeia NEURON • DCC / UFLA
                </span>
              </div>
            </div>

            {onExploreProjects && (
              <button
                onClick={onExploreProjects}
                className="whitespace-nowrap px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 flex items-center gap-2 transition-all cursor-pointer hover:border-white/20"
              >
                <span>Ver Extensões Ativas</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F59E0B]" />
              </button>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
